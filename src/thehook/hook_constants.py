import random

# --- Core limits ---
MAX_BOREDOM = 100
WIN_TIME = 600  # seconds (10 minutes)
FEED_SIZE = 10

VIDEO_DURATION_RANGE = (10, 90)

# --- Topics (25+) ---
TOPICS = [
    "coding", "ai", "startups",
    "memes", "dark_memes", "anime", "gaming", "esports",
    "cricket", "football", "f1",
    "news", "politics", "geopolitics",
    "finance", "crypto", "stock_market",
    "fitness", "mental_health",
    "travel", "cafes", "food", "cooking",
    "cats", "dogs", "wildlife",
    "astrology", "spirituality",
    "music_pop", "music_rock", "music_lofi",
    "fashion", "aesthetics", "brainrot"
]

def random_duration():
    return random.randint(*VIDEO_DURATION_RANGE)
