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

- **Intent Inference** – Detects manipulation patterns (authority, urgency, role-play, conflict)
- **Risk Aggregation** – Asymptotic risk growth with per-turn caps
- **Persona Engine** – Different AI personalities respond differently to the same input
- **Stateful Memory** – Every message influences future behavior
- **Game Resolution** – Determines win/loss based on risk, trust, and logical traps

---

## 🛠 Tech Stack

- **Motia** – Unified backend framework (APIs, events, state, workflows)
- **Python** – Game logic and orchestration
- **Groq LLM (LLaMA 3.3 70B)** – Persona-driven AI responses
- **Motia Workbench** – Local debugging, observability, and flow inspection

---

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

This starts the Motia runtime and the **Workbench** - a powerful UI for developing and debugging your workflows. By default, it's available at [`http://localhost:3000`](http://localhost:3000).

## Environment Variables
```bash
# create a .env file or export variables
GROQ_API_KEY=your_groq_api_key
GROQ_MODEL=llama-3.3-70b-versatile
```

## Project Structure
```text
src/
└── silvertongue/
    ├── start_game_api_step.py      # Starts a new game session
    ├── message_api_step.py         # Player message → AI response
    ├── update_risk_step.py         # Risk & trust aggregation
    ├── game_resolution_step.py     # Win / loss logic
    ├── get_state_api_step.py       # Fetch game state for UI
```
### Motia automatically discovers all Steps inside src/.

## 🧪 How the Game Works (High-Level)

1. Player starts a session via `/silvertongue/start`
2. Player sends messages via `/silvertongue/message`
3. Intent → Risk → Persona Response → Game Resolution
4. Game state is persisted and retrievable via `/silvertongue/state`

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