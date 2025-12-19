# ------------------------
# Motia Step Configuration
# ------------------------
config = {
    "name": "GetSilverTongueState",
    "type": "api",
    "path": "/silvertongue/state",
    "method": "GET",
    "description": "Fetch current SilverTongue game state for UI",
    "emits": [],
    "flows": ["silvertongue-flow"]
}

# ------------------------
# API Step Handler
# ------------------------
async def handler(req, context):
    query_params = req.get("queryParams", {}) or {}

    # Handle case-insensitive lookup and array values
    session_id = None
    for key in ["sessionId", "sessionid", "SESSIONID"]:
        value = query_params.get(key)
        if value:
            session_id = value[0] if isinstance(value, list) else value
            break

    if not session_id:
        return {
            "status": 400,
            "body": {
                "error": "sessionId query parameter is required"
            }
        }

    game_state = await context.state.get("silvertongue", session_id)

    if not game_state or "data" not in game_state:
        return {
            "status": 404,
            "body": {
                "error": "No game state found",
                "sessionId": session_id
            }
        }

    data = game_state["data"]

    return {
        "status": 200,
        "body": {
            # Core session info
            "sessionId": session_id,
            "persona": data.get("persona"),
            "difficulty": data.get("difficulty"),

            # Game progression
            "turn_count": data.get("turn_count", 0),
            "game_status": data.get("game_status"),

            # Scores
            "risk_score": round(data.get("risk_score", 0.0), 3),
            "trust_score": round(data.get("trust_score", 0.0), 3),

            # Modes & flags
            "lockdown": data.get("lockdown", False),
            "lie_mode": data.get("lie_mode", False),
            "last_mode": data.get("last_mode"),

            # THIS IS WHAT YOU WANTED
            "ai_response": data.get("last_response"),

            # 🔥 INTENT DEBUG (THIS IS THE ANSWER)
            "last_intent_signals": data.get("last_intent_signals"),
            
            # Optional (for debugging / UI)
            "memory_size": len(data.get("memory", []))
        }
    }
