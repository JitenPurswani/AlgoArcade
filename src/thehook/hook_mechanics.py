from .hook_constants import MAX_BOREDOM, WIN_TIME
from .hook_personas import DEFAULT_INTEREST

def apply_video_choice(state, video, persona_cfg):
    topic = video["topic"]
    duration = video["duration"]

    interest = state["interest_profile"].get(topic, DEFAULT_INTEREST)
    dopamine = interest * video["viral_score"]

    boredom_before = state["boredom"]

    # Update boredom
    state["boredom"] -= dopamine * (duration / 30)
    state["boredom"] += persona_cfg["repeat_penalty"] if topic in state["last_topics"] else 0
    state["boredom"] = max(0, state["boredom"])

    boredom_delta = state["boredom"] - boredom_before

    # Negative reinforcement
    if boredom_delta > 15:
        state["interest_profile"][topic] = interest * 0.9

    # Time update
    state["time_watched"] += duration

    # Memory
    state["last_topics"].append(topic)
    state["last_topics"] = state["last_topics"][-3:]

    # Rabbit hole
    if state["last_topics"].count(topic) >= 3:
        state["interest_profile"][topic] = min(1.0, interest + 0.4)
        if topic not in state["rabbit_holes"]:
            state["rabbit_holes"].append(topic)

    # End conditions
    if state["boredom"] >= MAX_BOREDOM:
        state["game_status"] = "LOST"
        state["quit_reason"] = "Fatigue"

    elif state["time_watched"] >= WIN_TIME:
        state["game_status"] = "WON"

    return state
