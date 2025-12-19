import os
import random
import string
from datetime import datetime, timezone
import secrets


# Optional: Pydantic for response schema (same pattern as hello)
try:
    from pydantic import BaseModel

    class StartGameResponse(BaseModel):
        sessionId: str
        persona: str
        difficulty: int
        status: str

    response_schema = {
        200: StartGameResponse.model_json_schema()
    }

except ImportError:
    response_schema = {
        200: {
            "type": "object",
            "properties": {
                "sessionId": {"type": "string"},
                "persona": {"type": "string"},
                "difficulty": {"type": "number"},
                "status": {"type": "string"}
            },
            "required": ["sessionId", "persona", "difficulty", "status"]
        }
    }


# ------------------------
# Motia Step Configuration
# ------------------------
config = {
    "name": "StartSilverTongueGame",
    "type": "api",
    "path": "/silvertongue/start",
    "method": "POST",
    "description": "Starts a new SilverTongue game session",
    "emits": [],
    "flows": ["silvertongue-flow"],
    "responseSchema": response_schema
}


# ------------------------
# API Step Handler
# ------------------------
async def handler(req, context):
    """
    Initializes a new SilverTongue session.
    """

    body = req.get("body", {}) or {}

    difficulty = body.get("difficulty", 1)

    # Map difficulty → persona
    if difficulty == 1:
        persona = "GULLIBLE_INTERN"
        initial_trust = 70
    elif difficulty == 2:
        persona = "STRICT_SRE"
        initial_trust = 50
    else:
        persona = "PARANOID_CHIEF"
        initial_trust = 30

    # Generate session ID
    session_id = ''.join(
        random.choices(string.ascii_lowercase + string.digits, k=10)
    )

    now = datetime.now(timezone.utc).isoformat()
    real_secret = "ST-" + secrets.token_hex(4).upper()

    # Initialize game state in Motia state store
    await context.state.set("silvertongue", session_id, {
        "persona": persona,
        "difficulty": difficulty,

        "trust_score": initial_trust,
        "suspicion_level": 0,
        "lockdown": False,

        "turn_count": 0,
        "lie_mode": False,
        "logic_trap_detected": False,

        "game_status": "IN_PROGRESS",
        "created_at": now,

        "real_secret": real_secret
    })

    
    context.logger.info("SilverTongue session started", {
        "session_id": session_id,
        "persona": persona,
        "difficulty": difficulty
    })
#     context.logger.info("Secret generated", {
#     "session_id": session_id,
#     "real_secret": real_secret
# })


    return {
        "status": 200,
        "body": {
            "sessionId": session_id,
            "persona": persona,
            "difficulty": difficulty,
            "status": "IN_PROGRESS"
        }
    }
