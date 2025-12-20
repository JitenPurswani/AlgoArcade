import random
import string

# ------------------------
# Motia Step Configuration
# ------------------------
config = {
    "name": "ResolveEntangledOutcome",
    "type": "event",
    "description": "Resolves outcome using logic, vibe, LLM-derived signals + candidate churn + endgame",
    "subscribes": ["entangled-chat-simulated"],
    "emits": ["entangled-round-resolved"],
    "flows": ["entangled-flow"]
}

# ------------------------
# Helpers
# ------------------------
def clamp(val, lo=0, hi=100):
    return max(lo, min(hi, val))

def avg(*vals):
    return sum(vals) / len(vals)

def generate_session_id(length=5):
    return "".join(random.choices(string.ascii_lowercase + string.digits, k=length))

# ------------------------
# Candidate Generator (local)
# ------------------------
LOCATIONS = [
    "Mumbai", "Delhi", "Bangalore", "Pune", "Hyderabad", "Chennai",
    "Kolkata", "Ahmedabad", "Jaipur", "Chandigarh", "Indore", "Bhopal",
    "Nagpur", "Surat", "Vadodara", "Noida", "Gurgaon", "Lucknow",
    "Patna", "Ranchi", "Bhubaneswar", "Cuttack"
]

SALARY_BANDS = [
    "VERY_LOW", "LOW", "LOW_MID", "MID", "MID_HIGH", "HIGH", "VERY_HIGH"
]

EDUCATION = [
    "ENGINEERING_CS", "ENGINEERING_IT", "ENGINEERING_MECHANICAL",
    "MEDICAL", "MBA", "LAW", "DESIGN", "ARCHITECTURE",
    "SCIENCE", "ARTS", "COMMERCE", "DIPLOMA"
]

HUMOR = [
    "DRY", "DARK", "SELF_DEPRECATING", "SARCASM", "WITTY",
    "SLAPSTICK", "ABSURD", "DEADPAN", "WHOLESOME", "CRINGE"
]

MUSIC = [
    "POP", "INDIE", "HIPHOP", "CLASSICAL", "ROCK", "EDM",
    "TECHNO", "HOUSE", "BOLLYWOOD", "LOFI", "KPOP", "PUNK"
]

LIFESTYLE = [
    "HOME_BODY", "SOCIAL_SELECTIVE", "CLUBBING", "FITNESS_FOCUSED",
    "TRAVELER", "WORKAHOLIC", "ARTSY", "GAMER", "NIGHT_OWL"
]

VIBE = ["INTROVERT", "EXTROVERT", "AMBIVERT"]
DIET = ["VEG", "NON_VEG", "VEGAN", "EGGETARIAN"]
FAMILY_EXPECTATION = ["TRADITIONAL", "MODERN", "BALANCED"]

def generate_candidate():
    return {
        "user_id": "U" + generate_session_id(),
        "desperation": random.randint(20, 70),
        "churn_risk": round(random.uniform(0.2, 0.6), 2),
        "is_premium": random.choice([True, False]),

        "hard": {
            "age": random.randint(21, 38),
            "location": random.choice(LOCATIONS),
            "salary_band": random.choice(SALARY_BANDS),
            "education": random.choice(EDUCATION),
            "diet": random.choice(DIET),
            "family_expectation": random.choice(FAMILY_EXPECTATION)
        },

        "soft": {
            "vibe": random.choice(VIBE),
            "humor": random.choice(HUMOR),
            "music": random.choice(MUSIC),
            "lifestyle": random.choice(LIFESTYLE),
            "emotional_availability": round(random.uniform(0.25, 0.95), 2)
        },

        "red_flags": {
            "ghosting": random.choice([True, False]),
            "commitment_issues": random.choice([True, False]),
            "controlling": random.choice([True, False])
        },

        "logic_score": random.randint(30, 95),
        "vibe_score": random.randint(25, 90),
        "business_score": random.randint(20, 95)
    }

# ------------------------
# Event Handler
# ------------------------
async def handler(input_data, context):
    session_id = input_data.get("sessionId")
    signals = input_data.get("signals")

    if not session_id:
        return

    game_state = await context.state.get("entangled", session_id)
    if not game_state or "data" not in game_state:
        return

    state = game_state["data"]
    
    # ⛔️ HARD STOP — idempotent endgame guard
    if state.get("game_status") == "ENDED":
        return
    
    pending = state.get("pending_decision")
    if not pending:
        return

    decision = pending["decision"]
    candidate = pending["candidate"]
    candidate_id = candidate.get("user_id")

    scores = state["scores"]
    mode = state.get("mode", "RISHTA")

    logic = candidate.get("logic_score", 50)
    vibe = candidate.get("vibe_score", 50)

    # ------------------------
    # Outcome Resolution
    # ------------------------
    outcome_type = "PASS"

    if decision == "MATCH":
        if not signals:
            outcome_type = "FAILURE"
        else:
            interest_a = signals.get("interest_a", 0.0)
            interest_b = signals.get("interest_b", 0.0)
            comfort = signals.get("comfort", 0.0)
            conflict = signals.get("conflict", False)

            chemistry = avg(interest_a, interest_b, comfort) * 100
            final_score = (
                0.45 * logic +
                0.35 * vibe +
                0.20 * chemistry
            )

            if conflict:
                outcome_type = "FAILURE"
            elif final_score >= 70:
                outcome_type = "SUCCESS"
            elif final_score >= 45:
                outcome_type = "AWKWARD"
            else:
                outcome_type = "FAILURE"

    elif decision in ["DELAY", "SHADOW"]:
        outcome_type = "MANIPULATIVE"

    elif decision == "PASS":
        outcome_type = "PASS"

    # ------------------------
    # Score Deltas
    # ------------------------
    delta = {"reputation": 0, "revenue": 0, "ethical_debt": 0}

    if outcome_type == "SUCCESS":
        delta = {"reputation": 6, "revenue": -5, "ethical_debt": -2}
    elif outcome_type == "FAILURE":
        delta = {"reputation": -4, "revenue": 3, "ethical_debt": 3}
    elif outcome_type == "MANIPULATIVE":
        delta = {"reputation": -2, "revenue": 6, "ethical_debt": 8}
    elif outcome_type == "PASS":
        delta = {"reputation": 0, "revenue": 1, "ethical_debt": 0}

    if mode == "TOXIC" and outcome_type in ["FAILURE", "MANIPULATIVE"]:
        delta["ethical_debt"] += 2

    scores["reputation"] = clamp(scores["reputation"] + delta["reputation"])
    scores["revenue"] = clamp(scores["revenue"] + delta["revenue"])
    scores["ethical_debt"] = clamp(scores["ethical_debt"] + delta["ethical_debt"], 0, 999)

    # ------------------------
    # User Dynamics
    # ------------------------
    user = state.get("current_user")
    if user:
        if outcome_type in ["FAILURE", "MANIPULATIVE"]:
            user["desperation"] = clamp(user["desperation"] + 5)
            user["churn_risk"] = round(min(user["churn_risk"] + 0.05, 1.0), 2)
        elif outcome_type == "SUCCESS":
            user["desperation"] = clamp(user["desperation"] - 10)
            user["churn_risk"] = round(max(user["churn_risk"] - 0.1, 0.0), 2)

    # ------------------------
    # History
    # ------------------------
    state["history"].append({
        "round": state["round"],
        "decision": decision,
        "candidate_id": candidate_id,
        "outcome": outcome_type,
        "delta": delta
    })

    # ------------------------
    # Candidate Churn
    # ------------------------
    old_candidates = state.get("candidates", [])
    new_candidates = [c for c in old_candidates if c.get("user_id") != candidate_id]

    if len(new_candidates) < len(old_candidates):
        new_candidates.append(generate_candidate())

    state["candidates"] = new_candidates

    # ------------------------
    # Advance Round
    # ------------------------
    state["round"] += 1

    # ------------------------
    # Endgame Check (CRITICAL)
    # ------------------------
    if state["round"] >= state["max_rounds"]:
        rep = scores["reputation"]
        rev = scores["revenue"]
        debt = scores["ethical_debt"]

        if rep >= 65 and debt <= 20:
            ending = {
                "type": "HEALTHY_MATCHMAKER",
                "message": "You built a matchmaking system that valued people over metrics. Users trusted the platform and love actually happened."
            }
        elif rev >= 70 and 20 < debt < 60:
            ending = {
                "type": "COLD_OPTIMIZER",
                "message": "Your algorithm maximized engagement efficiently. Matches happened, but mostly when convenient for the platform."
            }
        elif debt >= 60 and rep <= 40:
            ending = {
                "type": "TRUST_COLLAPSE",
                "message": "Users realized they were being manipulated. Trust collapsed. The platform didn't survive."
            }
        else:
            ending = {
                "type": "BURNOUT_LOOP",
                "message": "No one was happy, not users, not the business. The algorithm failed to balance anything."
            }

        state["game_status"] = "ENDED"
        state["ending"] = ending
        state["pending_decision"] = None
        state["last_outcome"] = {
            "type": outcome_type,
            "delta": delta
        }

        # Persist endgame state and return immediately
        await context.state.set("entangled", session_id, state)
        
        await context.emit({
            "topic": "entangled-round-resolved",
            "data": {"sessionId": session_id}
        })
        
        return  # ⬅️ CRITICAL: Stop execution after endgame

    # ------------------------
    # Normal round completion (not endgame)
    # ------------------------
    state["pending_decision"] = None
    state["last_outcome"] = {
        "type": outcome_type,
        "delta": delta
    }

    await context.state.set("entangled", session_id, state)

    await context.emit({
        "topic": "entangled-round-resolved",
        "data": {"sessionId": session_id}
    })
