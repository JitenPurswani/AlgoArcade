import random
import string
from datetime import datetime, timezone

from .hook_personas import PERSONAS
from .hook_video_generator import generate_feed

config = {
    "name": "StartHookGame",
    "type": "api",
    "path": "/hook/start",
    "method": "POST",
    "description": "Start a new The Hook game session",
    "emits": [],
    "flows": ["hook-flow"]
}

async def handler(req, context):
    body = req.get("body", {}) or {}
    persona = body.get("persona", "SHARMA_JI")

    if persona not in PERSONAS:
        return {
            "status": 400,
            "body": {"error": "Invalid persona"}
        }

    session_id = "".join(
        random.choices(string.ascii_lowercase + string.digits, k=10)
    )

    persona_cfg = PERSONAS[persona]
    interest_profile = dict(persona_cfg["interests"])

    feed = generate_feed(interest_profile)

    state = {
        "persona": persona,
        "time_watched": 0,
        "boredom": 10,
        "interest_profile": interest_profile,
        "last_topics": [],
        "rabbit_holes": [],
        "feed": feed,
        "game_status": "IN_PROGRESS",
        "created_at": datetime.now(timezone.utc).isoformat()
    }

    await context.state.set("hook", session_id, state)

    return {
        "status": 200,
        "body": {
            "sessionId": session_id,
            "persona": persona,
            "feed": feed,
            "boredom": state["boredom"],
            "time_watched": state["time_watched"],
            "emoji": "🤩",
            "status": "IN_PROGRESS"
        }
    }
