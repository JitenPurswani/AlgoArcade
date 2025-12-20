from .hook_personas import PERSONAS
from .hook_video_generator import generate_feed
from .hook_mechanics import apply_video_choice
import random

config = {
    "name": "HookNextVideo",
    "type": "api",
    "path": "/hook/next",
    "method": "POST",
    "description": "Select next video in The Hook",
    "emits": [],
    "flows": ["hook-flow"]
}

async def handler(req, context):
    body = req.get("body", {}) or {}
    session_id = body.get("sessionId")
    video_id = body.get("videoId")

    if not session_id or not video_id:
        return {"status": 400, "body": {"error": "sessionId and videoId required"}}

    game_state = await context.state.get("hook", session_id)
    if not game_state or "data" not in game_state:
        return {"status": 404, "body": {"error": "Game not found"}}

    state = game_state["data"]
    if state["game_status"] != "IN_PROGRESS":
        return {"status": 400, "body": {"error": "Game already ended"}}

    # Find selected video
    selected = next((v for v in state["feed"] if v["id"] == video_id), None)
    if not selected:
        return {"status": 400, "body": {"error": "Invalid videoId"}}

    persona_cfg = PERSONAS[state["persona"]]

    # Apply mechanics
    state = apply_video_choice(state, selected, persona_cfg)

    # Remove selected + 3 random others
    remaining = [v for v in state["feed"] if v["id"] != video_id]
    if len(remaining) > 3:
        remaining = random.sample(remaining, len(remaining) - 3)


    # Add new videos to maintain feed size
    state["feed"] = remaining + generate_feed(state["interest_profile"])[:(10 - len(remaining))]

    await context.state.set("hook", session_id, state)

    emoji = (
        "🤩" if state["boredom"] < 30 else
        "😐" if state["boredom"] < 60 else
        "🥱" if state["boredom"] < 80 else
        "🤬"
    )

    return {
        "status": 200,
        "body": {
            "feed": state["feed"],
            "time_watched": state["time_watched"],
            "boredom": round(state["boredom"], 2),
            "rabbit_holes": list(state["rabbit_holes"]),
            "emoji": emoji,
            "status": state["game_status"]
        }
    }
