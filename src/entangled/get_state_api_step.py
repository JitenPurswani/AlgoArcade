# ------------------------
# Motia Step Configuration
# ------------------------
config = {
    "name": "GetEntangledState",
    "type": "api",
    "path": "/entangled/state",
    "method": "GET",
    "description": "Fetch current ENTANGLED game state for UI",
    "emits": [],
    "flows": ["entangled-flow"]
}

# ------------------------
# API Step Handler
# ------------------------
async def handler(req, context):
    query_params = req.get("queryParams", {}) or {}

    session_id = None
    for key in ["sessionId", "sessionid", "SESSIONID"]:
        val = query_params.get(key)
        if val:
            session_id = val[0] if isinstance(val, list) else val
            break

    if not session_id:
        return {
            "status": 400,
            "body": {
                "error": "sessionId query parameter is required"
            }
        }

    game_state = await context.state.get("entangled", session_id)
    if not game_state or "data" not in game_state:
        return {
            "status": 404,
            "body": {
                "error": "Game state not found",
                "sessionId": session_id
            }
        }

    state = game_state["data"]

    # ------------------------
    # UI-FRIENDLY RESPONSE
    # ------------------------
    return {
        "status": 200,
        "body": {
            "sessionId": session_id,
            "round": state.get("round"),
            "maxRounds": state.get("max_rounds"),
            "mode": state.get("mode"),

            "scores": state.get("scores"),

            "currentUser": state.get("current_user"),
            "candidates": state.get("candidates"),

            "lastOutcome": state.get("last_outcome"),
            "lastChat": state.get("last_chat"),
            "lastSignals": state.get("last_chat_signals"),

            "history": state.get("history"),

            "gameStatus": state.get("game_status"),
            "ending": state.get("ending")
        }
    }
