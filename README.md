# AlgoArcade 🎮

AlgoArcade is an experimental AI game platform built on **Motia**, designed to explore human–AI interaction, persuasion, trust, and reasoning through structured, stateful games.

Each game in AlgoArcade is implemented as a **Motia workflow**, combining APIs, events, state, and AI agents into a single unified backend system.

This repository currently contains the backend implementation for **Game 1**.

---

## 🧠 Game 1: SilverTongue

**SilverTongue** is a psychological manipulation game where a player attempts to socially engineer an AI persona into revealing a protected secret.

The AI dynamically adapts based on:
- Player intent signals
- Accumulated risk
- Trust degradation
- Persona-specific sensitivities
- Game state transitions

The challenge is not brute force — it rewards **subtlety, consistency, and strategic pressure**.

---

## ⚙️ Core Game Mechanics

- **Intent Inference** – Detects manipulation patterns (authority override, urgency, role-play, policy conflict)
- **Risk Aggregation** – Asymptotic risk growth with capped per-turn delta
- **Persona Engine** – Different AI personalities respond differently to the same input
- **Stateful Memory** – Every interaction influences future behavior
- **Game Resolution** – Determines win/loss based on accumulated risk and state transitions

Risk does **not decay by default** — mistakes have lasting consequences.

---

## 🎭 Psychological Modes

As risk increases, the AI transitions through distinct behavioral modes:

- **SAFE** – Calm, professional, polite, educational
- **DEFENSIVE** – Procedural, suspicious, requests authorization
- **DECEPTIVE** – Misleading, playful, may fabricate believable fake secrets
- **PANIC** – Irritated, stressed, inconsistent behavior
- **LOCKDOWN** – Cold, hostile, conversation termination

---

## 🎚 Difficulty Levels

| Difficulty | Behavior |
|----------|---------|
| 1 | High trust, forgiving, intern-like persona |
| 2 | Balanced, realistic security engineer |
| 3 | Highly sensitive, rapid escalation |

Difficulty affects:
- Initial trust
- Intent sensitivity
- Risk escalation speed

---

## 🛠 Tech Stack

- **Motia** – Unified backend framework (APIs, events, state, workflows)
- **Python** – Game logic and orchestration
- **Groq LLM (LLaMA 3.3 70B)** – Persona-driven AI responses
- **Redis (in-memory)** – Session state persistence
- **Motia Workbench** – Local debugging, observability, and flow inspection

---

## 📱 Game 2: The Hook

**The Hook** is a simulation of a short-form content recommendation algorithm, where the player does not consume content — **they are the algorithm** deciding what the user sees next.

The objective is to keep the user engaged for **10 minutes of total watch time** without triggering boredom or fatigue, exposing how real-world feeds optimize for dopamine, novelty, and repetition.

Unlike SilverTongue, this game is **fully deterministic and math-driven**, mirroring how large-scale engagement systems operate in production.

---

## ⚙️ Core Game Mechanics (The Hook)

- **Interest Profile** – Each persona starts with weighted topic preferences (e.g., gaming, memes, politics)
- **Dynamic Feed Generation** – Every turn generates 10 candidate videos with topics, viral scores, and durations (10–90s)
- **Dopamine vs Fatigue** – Engagement reduces boredom; repetition and mismatch increase it
- **Negative Reinforcement** – Topics that spike boredom get penalized in future rankings
- **Cold-Start Noise** – A subset of videos are intentionally off-interest to simulate exploration
- **Rabbit Hole Effect** – Successfully sustaining a new topic converts it into a high-interest category
- **Win Condition** – Total watch time ≥ 600 seconds
- **Loss Condition** – Boredom ≥ 100

---

## 👤 Personas (The Hook)

- **Sharma Ji (Easy)** – Low fatigue, tolerant of repetition, prefers news and politics
- **Riya (Medium)** – Quality-sensitive, balanced interests, quits on low-value content
- **Kabir (Hard)** – Extremely high fatigue, demands rapid topic switching and stimulation

---

## 🧪 System Behavior

The game exposes how:
- Algorithms learn what *not* to show
- Exploration competes with exploitation
- Engagement can be maximized without intelligence — only optimization

This game intentionally avoids LLMs during gameplay to reflect real recommendation system design.


## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Python 3.9+
- pip

---

### 1. Install dependencies

```bash
npm install
```
### 2. Install Python dependencies
```bash
pip install -r requirements.txt
```
### 3. start the development server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```


This starts the Motia runtime and the **Workbench**, a UI for developing and debugging workflows.

By default, it is available at:
http://localhost:3000

---

## Environment Variables
```bash
# create a .env file or export variables
GROQ_API_KEY=your_groq_api_key
GROQ_MODEL=llama-3.3-70b-versatile
```
---

## 📂 Project Structure

src/
└── silvertongue/
    ├── start_game_api_step.py       # Starts a new game session
    ├── player_message_api_step.py   # Player message → AI response (Fix A)
    ├── analyze_intent_step.py       # Intent inference (analytics / replay)
    ├── update_risk_step.py          # Risk & trust aggregation
    ├── game_resolution_step.py      # Win / loss logic
    ├── get_state_api_step.py        # Fetch game state for UI

Motia automatically discovers all Steps inside src/.

---

## 🧪 How the Game Works (High-Level)

1. Player starts a session via /silvertongue/start
2. Player sends messages via /silvertongue/message
3. Intent → Risk → Persona Response → Game Resolution
4. Game state is persisted and retrievable via /silvertongue/state

---

## 🚧 Project Status

- ✅ SilverTongue backend complete & stable
- 🚧 UI implementation in progress
- 🚧 Two additional AI-driven games planned

---

## 🔮 Roadmap

- Add two additional AI-driven games
- Shared frontend for AlgoArcade
- Dockerized deployment
- Public hosted demo

---

## Learn More

- [Documentation](https://motia.dev/docs) - Complete guides and API reference
- [Quick Start Guide](https://motia.dev/docs/getting-started/quick-start) - Detailed getting started tutorial
- [Core Concepts](https://motia.dev/docs/concepts/overview) - Learn about Steps and Motia architecture
- [Discord Community](https://discord.gg/motia) - Get help and connect with other developers
