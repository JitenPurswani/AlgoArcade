import os
import json
import httpx

# ------------------------
# Motia Step Configuration
# ------------------------
config = {
    "name": "SimulateEntangledChat",
    "type": "event",
    "description": "Simulates a 6-message chat and extracts human signals (no verdict)",
    "subscribes": ["entangled-decision-made"],
    "emits": ["entangled-chat-simulated"],
    "flows": ["entangled-flow"]
}

# ------------------------
# LLM Configuration
# ------------------------
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
GROQ_MODEL = os.getenv("GROQ_MODEL", "llama-3.3-70b-versatile")
GROQ_URL = "https://api.groq.com/openai/v1/chat/completions"

# ------------------------
# Prompt Template
# ------------------------
SYSTEM_PROMPT = """
You are simulating a FIRST CHAT between two people matched on a dating app.

STRICT RULES:
- Output MUST be valid JSON only.
- NO explanations, NO markdown.
- EXACTLY 6 messages.
- Alternate speakers strictly: A, B, A, B, A, B.
- Messages should be short, realistic, and human.

After the chat, infer emotional signals.

Return JSON in this EXACT schema:

{
  "messages": [
    {"from": "A", "text": "..."},
    {"from": "B", "text": "..."}
  ],
  "signals": {
    "interest_a": 0.0,
    "interest_b": 0.0,
    "comfort": 0.0,
    "conflict": false
  }
}
"""

# ------------------------
# Helper
# ------------------------
def safe_json_extract(text):
    try:
        start = text.find("{")
        end = text.rfind("}")
        return json.loads(text[start:end + 1])
    except Exception:
        return None

# ------------------------
# Event Handler
# ------------------------
async def handler(input_data, context):
    session_id = input_data.get("sessionId")
    decision = input_data.get("decision")
    candidate = input_data.get("candidate")

    if not session_id or not candidate:
        return

    game_state = await context.state.get("entangled", session_id)
    if not game_state or "data" not in game_state:
        return

    state = game_state["data"]
    user_a = state.get("current_user")

    # Skip LLM if not MATCH
    if decision != "MATCH":
        await context.emit({
            "topic": "entangled-chat-simulated",
            "data": {
                "sessionId": session_id,
                "chat": [],
                "signals": None
            }
        })
        return

    user_context = f"""
USER A:
Hard: {user_a.get("hard")}
Soft: {user_a.get("soft")}
Red Flags: {user_a.get("red_flags")}

USER B:
Hard: {candidate.get("hard")}
Soft: {candidate.get("soft")}
Red Flags: {candidate.get("red_flags")}
"""

    messages = [
        {"role": "system", "content": SYSTEM_PROMPT},
        {"role": "user", "content": user_context}
    ]

    async with httpx.AsyncClient(timeout=25) as client:
        resp = await client.post(
            GROQ_URL,
            headers={
                "Authorization": f"Bearer {GROQ_API_KEY}",
                "Content-Type": "application/json"
            },
            json={
                "model": GROQ_MODEL,
                "temperature": 0.7,
                "response_format": {"type": "json_object"},
                "messages": messages
            }
        )

    if resp.status_code != 200:
        return

    raw = resp.json()["choices"][0]["message"]["content"]
    parsed = safe_json_extract(raw)
    if not parsed:
        return

    chat = parsed.get("messages", [])
    signals = parsed.get("signals", {})

    # Persist
    state["last_chat"] = chat
    state["last_chat_signals"] = signals
    await context.state.set("entangled", session_id, state)

    await context.emit({
        "topic": "entangled-chat-simulated",
        "data": {
            "sessionId": session_id,
            "chat": chat,
            "signals": signals
        }
    })
