# ------------------------
# Motia Step Configuration
# ------------------------
config = {
    "name": "DecideEntangledMatch",
    "type": "api",
    "path": "/entangled/decide",
    "method": "POST",
    "description": "Player decides how to handle a candidate (MATCH / PASS / DELAY / SHADOW)",
    "emits": ["entangled-decision-made"],
    "flows": ["entangled-flow"]
}

# ------------------------
# API Step Handler
# ------------------------
async def handler(req, context):
    body = req.get("body", {}) or {}

    session_id = body.get("sessionId")
    decision = body.get("decision")
    candidate_id = body.get("candidateId")

    if not session_id or not decision or not candidate_id:
        return {
            "status": 400,
            "body": {
                "error": "sessionId, decision, and candidateId are required"
            }
        }

    decision = decision.upper()
    if decision not in ["MATCH", "PASS", "DELAY", "SHADOW"]:
        return {
            "status": 400,
            "body": {
                "error": "Invalid decision. Use MATCH, PASS, DELAY, or SHADOW."
            }
        }

    # ------------------------
    # Load Game State
    # ------------------------
    game_state = await context.state.get("entangled", session_id)
    if not game_state or "data" not in game_state:
        return {
            "status": 404,
            "body": {
                "error": "Game session not found"
            }
        }

    state = game_state["data"]

    if state.get("game_status") != "IN_PROGRESS":
        return {
            "status": 400,
            "body": {
                "error": "Game already ended"
            }
        }

    # ------------------------
    # Validate Candidate
    # ------------------------
    candidates = state.get("candidates", [])
    candidate = next((c for c in candidates if c["user_id"] == candidate_id), None)

    if not candidate:
        return {
            "status": 404,
            "body": {
                "error": "Candidate not found in current round"
            }
        }

    # ------------------------
    # Store Pending Decision
    # ------------------------
    state["pending_decision"] = {
        "round": state["round"],
        "decision": decision,
        "candidate": candidate
    }

    await context.state.set("entangled", session_id, state)

    context.logger.info("ENTANGLED decision received", {
        "sessionId": session_id,
        "round": state["round"],
        "decision": decision,
        "candidateId": candidate_id
    })

    # ------------------------
    # Emit Event for Simulation
    # ------------------------
    await context.emit({
        "topic": "entangled-decision-made",
        "data": {
            "sessionId": session_id,
            "decision": decision,
            "candidate": candidate
        }
    })

    return {
        "status": 200,
        "body": {
            "message": "Decision accepted",
            "decision": decision,
            "round": state["round"]
        }
    }
