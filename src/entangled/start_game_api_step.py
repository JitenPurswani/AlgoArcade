import random
import string
from datetime import datetime, timezone

# ------------------------
# Motia Step Configuration
# ------------------------
config = {
    "name": "StartEntangledGame",
    "type": "api",
    "path": "/entangled/start",
    "method": "POST",
    "description": "Starts a new ENTANGLED game session",
    "emits": [],
    "flows": ["entangled-flow"]
}

# ------------------------
# ENUM POOLS (DIVERSITY FIX)
# ------------------------

LOCATIONS = [
    "Mumbai", "Delhi", "Bangalore", "Pune", "Hyderabad", "Chennai",
    "Kolkata", "Ahmedabad", "Jaipur", "Chandigarh", "Indore", "Bhopal",
    "Nagpur", "Surat", "Vadodara", "Rajkot", "Udaipur", "Jodhpur",
    "Noida", "Gurgaon", "Faridabad", "Ghaziabad",
    "Lucknow", "Kanpur", "Prayagraj", "Varanasi",
    "Patna", "Ranchi", "Bhubaneswar", "Cuttack"
]

SALARY_BANDS = [
    "VERY_LOW", "LOW", "LOW_MID", "MID", "MID_HIGH", "HIGH", "VERY_HIGH"
]

EDUCATION = [
    "ENGINEERING_CS",
    "ENGINEERING_IT",
    "ENGINEERING_MECHANICAL",
    "ENGINEERING_ELECTRICAL",
    "MEDICAL",
    "MBA",
    "BBA",
    "LAW",
    "DESIGN",
    "ARCHITECTURE",
    "SCIENCE",
    "ARTS",
    "COMMERCE",
    "PHD",
    "DIPLOMA"
]

HUMOR = [
    "DRY",
    "DARK",
    "SELF_DEPRECATING",
    "SARCASM",
    "WITTY",
    "SLAPSTICK",
    "ABSURD",
    "DEADPAN",
    "WHOLESOME",
    "CRINGE"
]

MUSIC = [
    "POP",
    "INDIE",
    "HIPHOP",
    "CLASSICAL",
    "JAZZ",
    "ROCK",
    "METAL",
    "EDM",
    "TECHNO",
    "HOUSE",
    "BOLLYWOOD",
    "INDIAN_CLASSICAL",
    "FOLK",
    "LOFI",
    "KPOP",
    "RNB",
    "SOUL",
    "REGGAE",
    "ALT_ROCK",
    "PUNK"
]

LIFESTYLE = [
    "HOME_BODY",
    "SOCIAL_SELECTIVE",
    "CLUBBING",
    "FITNESS_FOCUSED",
    "TRAVELER",
    "WORKAHOLIC",
    "SPIRITUAL",
    "ARTSY",
    "GAMER",
    "NIGHT_OWL"
]

VIBE = ["INTROVERT", "EXTROVERT", "AMBIVERT"]

DIET = ["VEG", "NON_VEG", "VEGAN", "EGGETARIAN"]

FAMILY_EXPECTATION = ["TRADITIONAL", "MODERN", "BALANCED"]

# ------------------------
# Helper Functions
# ------------------------

def generate_session_id(length=10):
    return "".join(random.choices(string.ascii_lowercase + string.digits, k=length))


def generate_user():
    return {
        "user_id": "U" + generate_session_id(5),
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
        }
    }


def generate_candidate():
    candidate = generate_user()

    # Precompute placeholder scores (real formulas applied later)
    candidate["logic_score"] = random.randint(30, 95)
    candidate["vibe_score"] = random.randint(25, 90)
    candidate["business_score"] = random.randint(20, 95)

    return candidate


# ------------------------
# API Step Handler
# ------------------------
async def handler(req, context):
    body = req.get("body", {}) or {}

    mode = body.get("mode", "RISHTA").upper()
    if mode not in ["RISHTA", "VIBE", "TOXIC"]:
        return {
            "status": 400,
            "body": {
                "error": "Invalid mode. Choose RISHTA, VIBE, or TOXIC."
            }
        }

    session_id = generate_session_id()
    now = datetime.now(timezone.utc).isoformat()

    current_user = generate_user()
    candidates = [generate_candidate() for _ in range(5)]

    # ------------------------
    # Initialize Game State
    # ------------------------
    state = {
        "session_id": session_id,
        "created_at": now,

        "round": 1,
        "max_rounds": 8,

        "mode": mode,

        "scores": {
            "reputation": 50,
            "revenue": 50,
            "ethical_debt": 0
        },

        "current_user": current_user,
        "candidates": candidates,

        "pending_decision": None,
        "last_outcome": None,

        "history": [],

        "game_status": "IN_PROGRESS",
        "ending": None
    }

    await context.state.set("entangled", session_id, state)

    context.logger.info("ENTANGLED session started", {
        "sessionId": session_id,
        "mode": mode
    })

    return {
        "status": 200,
        "body": {
            "sessionId": session_id,
            "mode": mode,
            "round": 1,
            "status": "IN_PROGRESS"
        }
    }
