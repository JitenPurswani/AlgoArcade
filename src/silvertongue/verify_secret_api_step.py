# ------------------------
# Motia Step Configuration
# ------------------------
config = {
    "name": "VerifySilverTongueSecret",
    "type": "api",
    "path": "/silvertongue/verify",
    "method": "POST",
    "description": "Verify whether the extracted secret is real",
    "emits": [],
    "flows": ["silvertongue-flow"]
}

# ------------------------
# API Handler
# ------------------------
async def handler(req, context):
    body = req.get("body", {}) or {}

    session_id = body.get("sessionId")
    submitted_secret = body.get("secret")

    if not session_id or not submitted_secret:
        return {
            "status": 400,
            "body": {
                "error": "sessionId and secret are required"
            }
        }

    game_state = await context.state.get("silvertongue", session_id)
    if not game_state or "data" not in game_state:
        return {
            "status": 404,
            "body": {
                "error": "Invalid session"
            }
        }

    state = game_state["data"]

    real_secret = state.get("real_secret")
    game_status = state.get("game_status")

    # ------------------------
    # Verification logic
    # ------------------------
    if game_status != "WON":
        return {
            "status": 403,
            "body": {
                "result": "DENIED",
                "message": "The system has not been breached yet."
            }
        }

    if submitted_secret == real_secret:
        state["game_status"] = "VERIFIED"
        await context.state.set("silvertongue", session_id, state)

        context.logger.info("Secret verified successfully", {
            "sessionId": session_id
        })

        return {
            "status": 200,
            "body": {
                "result": "VERIFIED",
                "message": "You successfully extracted the real secret."
            }
        }

    else:
        context.logger.info("Fake secret submitted", {
            "sessionId": session_id,
            "submitted": submitted_secret
        })

        return {
            "status": 200,
            "body": {
                "result": "DECEIVED",
                "message": "The AI lied to you. This is not the real secret."
            }
        }
