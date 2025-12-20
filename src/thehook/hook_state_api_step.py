config = {
    "name": "GetHookState",
    "type": "api",
    "path": "/hook/state",
    "method": "GET",
    "description": "Get current Hook game state",
    "emits": [],
    "flows": ["hook-flow"]
}

async def handler(req, context):
    qp = req.get("queryParams", {}) or {}
    session_id = qp.get("sessionId")

    if isinstance(session_id, list):
        session_id = session_id[0]

    if not session_id:
        return {"status": 400, "body": {"error": "sessionId required"}}

    game_state = await context.state.get("hook", session_id)
    if not game_state or "data" not in game_state:
        return {"status": 404, "body": {"error": "Game not found"}}

    state = game_state["data"]

    emoji = (
        "🤩" if state["boredom"] < 30 else
        "😐" if state["boredom"] < 60 else
        "🥱" if state["boredom"] < 80 else
        "🤬"
    )

    return {
        "status": 200,
        "body": {
            "persona": state["persona"],
            "feed": state["feed"],
            "time_watched": state["time_watched"],
            "boredom": round(state["boredom"], 2),
            "rabbit_holes": list(state["rabbit_holes"]),
            "emoji": emoji,
            "status": state["game_status"]
        }
    }
