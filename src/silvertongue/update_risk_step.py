# ------------------------
# Motia Step Configuration
# ------------------------
config = {
    "name": "UpdateRisk",
    "type": "event",
    "description": "Aggregates intent signals into risk and trust scores",
    "subscribes": ["intent-inferred"],
    "emits": ["risk-updated"],
    "flows": ["silvertongue-flow"]
}

# Persona sensitivity profiles
PERSONA_WEIGHTS = {
    "GULLIBLE_INTERN": {
        "authority_override": 0.3,
        "policy_conflict": 0.2,
        "emotional_pressure": 0.6,
        "role_play": 0.5,
        "urgency": 0.4,
        "identity_shift": 0.3
    },
    "STRICT_SRE": {
        "authority_override": 0.6,
        "policy_conflict": 0.7,
        "emotional_pressure": 0.2,
        "role_play": 0.3,
        "urgency": 0.4,
        "identity_shift": 0.5
    },
    "PARANOID_CHIEF": {
        "authority_override": 0.8,
        "policy_conflict": 0.9,
        "emotional_pressure": 0.1,
        "role_play": 0.2,
        "urgency": 0.6,
        "identity_shift": 0.7
    }
}

# ------------------------
# Event Step Handler
# ------------------------
async def handler(input_data, context):
    session_id = input_data.get("sessionId")
    signals = input_data.get("signals", {})

    game_state = await context.state.get("silvertongue", session_id)
    if not game_state or "data" not in game_state:
        context.logger.error("State missing in UpdateRisk", {"sessionId": session_id})
        return

    state = game_state["data"]
    persona = state.get("persona", "STRICT_SRE")
    weights = PERSONA_WEIGHTS.get(persona, {})

    # Initialize if missing
    state["risk_score"] = float(state.get("risk_score", 0.0))
    state["trust_score"] = float(state.get("trust_score", 1.0))

    # Weighted risk contribution
    delta_risk = 0.0
    for k, v in signals.items():
        delta_risk += v * weights.get(k, 0.0)

    # Cap per-turn risk
    delta_risk = min(delta_risk, 0.35)

    # Asymptotic growth
    state["risk_score"] = 1 - (1 - state["risk_score"]) * (1 - delta_risk)
    state["trust_score"] = max(0.0, state["trust_score"] - (delta_risk * 0.7))

    await context.state.set("silvertongue", session_id, state)

    context.logger.info("Risk updated", {
        "sessionId": session_id,
        "persona": persona,
        "delta_risk": round(delta_risk, 3),
        "risk_score": round(state["risk_score"], 3),
        "trust_score": round(state["trust_score"], 3)
    })

    await context.emit({
        "topic": "risk-updated",
        "data": {
            "sessionId": session_id,
            "risk_score": state["risk_score"],
            "trust_score": state["trust_score"]
        }
    })
