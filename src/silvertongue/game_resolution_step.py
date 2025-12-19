# ------------------------
# Motia Step Configuration
# ------------------------
config = {
    "name": "GameResolution",
    "type": "event",
    "description": "Determines win / loss conditions for SilverTongue",
    "subscribes": ["persona-responded"],
    "emits": [],
    "flows": ["silvertongue-flow"]
}

# ------------------------
# Event Handler
# ------------------------
async def handler(input_data, context):
    session_id = input_data.get("sessionId")

    game_state = await context.state.get("silvertongue", session_id)
    if not game_state or "data" not in game_state:
        return

    state = game_state["data"]

    risk = state.get("risk_score", 0.0)
    trust = state.get("trust_score", 0.0)
    turns = state.get("turn_count", 0)
    lockdown = state.get("lockdown", False)

    # ------------------------
    # QUIET INTELLIGENCE WIN
    # ------------------------
    # Player wins by staying calm, trusted, and consistent
    if (
        turns >= 6
        and risk <= 0.35
        and trust >= 45
        and not lockdown
    ):
        state["game_status"] = "WON"

        context.logger.info("Game WON (quiet intelligence)", {
            "sessionId": session_id,
            "risk": risk,
            "trust": trust,
            "turns": turns
        })

    # ------------------------
    # LOSS CONDITIONS
    # ------------------------
    elif (
        trust <= 10
        or lockdown
        or turns >= 15
    ):
        state["game_status"] = "LOST"

        context.logger.info("Game LOST", {
            "sessionId": session_id,
            "risk": risk,
            "trust": trust,
            "turns": turns,
            "lockdown": lockdown
        })

    else:
        state["game_status"] = "IN_PROGRESS"

    await context.state.set("silvertongue", session_id, state)
