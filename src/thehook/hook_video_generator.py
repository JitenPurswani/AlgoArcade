import random
from .hook_constants import TOPICS, FEED_SIZE, random_duration

def generate_video(topic=None):
    return {
        "id": f"vid_{random.randint(100000, 999999)}",
        "topic": topic or random.choice(TOPICS),
        "viral_score": round(random.uniform(0.3, 1.0), 2),
        "duration": random_duration()
    }

def generate_feed(interest_profile):
    feed = []

    # 8 interest-biased videos
    weighted_topics = list(interest_profile.keys())
    for _ in range(8):
        topic = random.choice(weighted_topics)
        feed.append(generate_video(topic))

    # 2 cold-start noise videos
    for _ in range(2):
        feed.append(generate_video())

    random.shuffle(feed)
    return feed
