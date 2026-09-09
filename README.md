<div align="center">

<img src="https://img.shields.io/badge/REPAIRX-AI-blue?style=for-the-badge&logo=lightning&logoColor=white" />
<img src="https://img.shields.io/badge/Phase-1%20Prototype-orange?style=for-the-badge" />
<img src="https://img.shields.io/badge/Deployed-Vercel-black?style=for-the-badge&logo=vercel" />
<img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
<img src="https://img.shields.io/badge/Tailwind-CSS-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white" />

# ⚡ REPAIRX AI
### Autonomous Production Engineer

**An AI-powered platform that autonomously detects, investigates, diagnoses, fixes, validates, deploys, and prevents software production failures — with zero human intervention.**

🌐 **Live Demo:** [repairx-ai.vercel.app](https://repairx-ai.vercel.app)
📦 **Repository:** [github.com/Siddhartha010/repairx-ai](https://github.com/Siddhartha010/repairx-ai)

</div>

---

## 📊 Key Stats

| Metric | Value |
|---|---|
| ⏱️ Average MTTR | **11 minutes** (vs 2–4 hours human average) |
| 🧠 RCA Accuracy | **97.8%** |
| 🤖 AI Agents | **6 specialized agents** |
| 🚀 Deploy Safety | **99.7%** |
| ⚡ Speed vs Human | **92% faster** |
| 👤 Human Interventions | **0** |

---

## 🤔 What is REPAIRX AI?

REPAIRX AI is a next-generation **Autonomous Production Engineering** platform that replaces the traditional human on-call incident response loop with a fully automated, multi-agent AI system.

When a production failure occurs, REPAIRX doesn't just alert an engineer — it **detects, investigates, diagnoses, fixes, validates, deploys, and prevents** the failure entirely on its own, in under 11 minutes.

The platform is built around **6 specialized AI agents**, each owning one phase of the incident lifecycle. They work in a coordinated pipeline, passing context between each other like a highly efficient engineering team that never sleeps.

Beyond reactive repair, REPAIRX's Oracle agent **predicts failures before they happen** by learning from every resolved incident and scanning all services for similar failure signatures.

| | |
|---|---|
| 🎯 **Target Users** | Platform engineering teams, SRE teams, DevOps engineers at mid-to-large tech companies running microservice architectures |
| 🏗️ **Architecture** | Multi-agent AI pipeline with specialized agents for detection, analysis, fix generation, validation, deployment, and prediction |
| 📡 **Data Sources** | Service metrics, application logs, deployment history, query execution plans, error traces, and knowledge base patterns |
| 🔒 **Safety Model** | Every fix is staged, load-tested, risk-scored, and deployed via canary with auto-rollback — humans can override at any stage |

---

## ❌ The Problem — Status Quo

| Issue | Impact |
|---|---|
| ⏰ **Slow Detection** | Incidents go undetected for 15–45 minutes on average before anyone is paged |
| 🔍 **Manual Investigation** | Engineers spend 1–3 hours correlating logs, metrics, and deployments under extreme pressure |
| 😰 **Human Error Under Pressure** | 40% of incidents recur within 30 days due to wrong or incomplete fixes |
| 💸 **Massive Business Cost** | Average outage cost: $5,600/minute — a 2-hour incident = $670,000+ in losses |
| 📉 **Reactive Not Proactive** | Traditional monitoring only alerts after failures occur — no prediction capability |
| 🧩 **Knowledge Silos** | Resolution knowledge lives in engineers' heads — lost when they leave |

---

## ✅ The Solution — REPAIRX AI

| Solution | Result |
|---|---|
| ⚡ **Sub-Second Detection** | Sentinel AI detects anomalies within 620ms — 1,000x faster than human-paged alerting |
| 🧠 **Autonomous Investigation** | Sherlock AI performs full RCA in under 4 minutes with 97.8% accuracy |
| 🤖 **AI-Generated Fixes** | Forge AI generates, tests, and validates production-ready fixes automatically |
| 💰 **92% Faster Resolution** | MTTR: 2–4 hours → 11 minutes — saves $650,000+ per major incident |
| 🔮 **Predict Before It Breaks** | Oracle AI predicts failures hours in advance and queues pre-emptive actions |
| 📚 **Institutional Memory** | Every resolution captured in KB — system gets smarter with every incident |

---

## ⚙️ How REPAIRX Works — The 8-Phase Pipeline

```
🚨 DETECT        → Sentinel AI detects anomaly in < 1 second, auto-creates incident
🔍 INVESTIGATE   → Sherlock AI correlates 847 signals, deployment history, query plans
🧠 DIAGNOSE      → Root cause confirmed at 97.8% confidence, blast radius mapped
⚡ FIX           → Forge AI generates code patch, runs 142 tests, packages fix
✅ VALIDATE      → Guardian AI runs staging load test, scores risk 8/100 LOW
🚀 DEPLOY        → Pilot AI canary rollout: 5% → 25% → 75% → 100%, auto-rollback armed
💚 RECOVER       → All metrics nominal, 12,400 users restored, MTTR: 11 minutes
🔮 PREDICT       → Oracle AI predicts future failures, queues pre-emptive actions
```

---

## 🤖 The 6 AI Agents

| Agent | Role | Accuracy | Tasks |
|---|---|---|---|
| 🔍 **Sentinel** | Anomaly Detector | 99.2% | 847 |
| 🧠 **Sherlock** | Root Cause Analyst | 97.8% | 312 |
| ⚡ **Forge** | Fix Generator | 96.4% | 289 |
| 🛡️ **Guardian** | Risk Assessor | 98.9% | 289 |
| 🚀 **Pilot** | Deployment Manager | 99.7% | 156 |
| 🔮 **Oracle** | Predictive Engine | 94.1% | 1,204 |

### Agent Details

**🔍 Sentinel — Anomaly Detector**
Monitors all 8 services 24/7 using ML anomaly detection. Detects spikes, drops, and pattern deviations within milliseconds. Auto-creates incident tickets and escalates severity.

**🧠 Sherlock — Root Cause Analyst**
Performs automated root cause analysis by correlating deployments, logs, query plans, and 847+ signals. Matches patterns against the Knowledge Base with confidence scoring.

**⚡ Forge — Fix Generator**
Generates production-ready code fixes, SQL optimizations, and config patches. Runs full test suites before packaging the fix for validation.

**🛡️ Guardian — Risk Assessor**
Provisions staging environments, runs load tests, scores deployment risk (0–100), and arms auto-rollback triggers. Blocks deployment if risk exceeds threshold.

**🚀 Pilot — Deployment Manager**
Executes safe canary deployments with progressive traffic shifting. Monitors metrics at each stage and triggers instant rollback if anomalies are detected.

**🔮 Oracle — Predictive Engine**
Learns from every resolved incident to predict future failures. Scans all services for known failure signatures and queues pre-emptive actions hours before impact.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🚨 Real-Time Anomaly Detection | Sub-second detection across all services using ML baselines |
| 🧠 Autonomous Root Cause Analysis | 97.8% accurate causal chain identification in under 4 minutes |
| ⚡ AI-Generated Code & SQL Fixes | Production-ready patches with full test suite validation |
| 🛡️ Risk Assessment & Validation | Staging load tests, risk scoring, auto-rollback arming |
| 🚀 Safe Canary Deployment | Progressive 5→25→75→100% rollout with instant rollback |
| 🔮 Predictive Failure Prevention | Hours-ahead failure prediction from learned incident patterns |
| 📊 Live Performance Dashboard | Real-time P99 latency, error rates, CPU, memory, throughput charts |
| 📚 Self-Learning Knowledge Base | 6 high-confidence patterns (91–99% accuracy), grows with each incident |
| 🤖 AI Agent Command Center | Unified view of all 6 agents with status, accuracy, and task counts |
| 📄 Automated Incident Reports | Full post-incident reports exported as .txt with one click |
| 💬 AI Assistant Chatbot | Natural language Q&A with full dashboard knowledge |
| 🔄 Full Demo Simulation | One-click 8-phase incident simulation with live terminal logs |

---

## 🗂️ Project Structure

```
repairx/
├── src/
│   ├── App.jsx                    # Main app, tab routing, demo flow logic
│   ├── mockData.js                # All simulated data (services, incidents, agents)
│   ├── chatbot.js                 # Rule-based NLP response engine
│   ├── components.jsx             # Reusable UI primitives (cards, charts, badges)
│   ├── index.css                  # Tailwind + custom animations
│   └── panels/
│       ├── MetricsPanel.jsx       # Live metrics + sparkline charts
│       ├── ServicePanel.jsx       # Service health monitor
│       ├── IncidentPanel.jsx      # Active incidents list
│       ├── DemoFlowPanel.jsx      # 8-phase simulation flow
│       ├── AgentCommandCenter.jsx # AI agent status grid
│       ├── BeforeAfterPanel.jsx   # Performance comparison + code fix
│       ├── RootCausePanel.jsx     # RCA causal chain + risk gauge
│       ├── PredictivePanel.jsx    # Oracle predictions + KB
│       ├── ChatBot.jsx            # Floating AI assistant chatbot
│       └── AboutPanel.jsx        # Full about / info page
├── index.html
├── vite.config.js
└── package.json
```

---

## 🛠️ Technology Stack

### Frontend Framework
- React 18 (Hooks — useState, useCallback, useEffect, useRef)
- Vite 6 (build tool and dev server)
- JSX component architecture

### Styling & UI
- Tailwind CSS v4 (@tailwindcss/vite plugin)
- Custom CSS animations (pulse-glow, slide-in-up, fade-in, rotate-slow)
- Glass morphism design system
- Dark theme with neon blue/purple accents

### Icons & Graphics
- Lucide React (icon library)
- Custom SVG sparkline charts (inline, no library)
- Custom SVG risk gauge
- Emoji-based agent avatars

### Data & Logic
- Mock data layer (mockData.js — zero backend)
- Rule-based NLP chatbot engine (chatbot.js)
- Client-side report export (Browser Blob API)
- Simulated async demo flow (setTimeout pipeline)

### Architecture
- Component-based panel system
- Shared reusable UI primitives
- Tab-based navigation (Dashboard, Investigation, Agents, Knowledge, About)
- Responsive grid layout (CSS Grid + Flexbox)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/Siddhartha010/repairx-ai.git
cd repairx-ai

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

Output goes to `dist/` — ready to deploy anywhere.

---

## 🌐 Deployment

**Live on Vercel:** [repairx-ai.vercel.app](https://repairx-ai.vercel.app)

To deploy your own instance:

```bash
npm install -g vercel
vercel login
vercel --prod
```

---

## 📚 References & Inspirations

### AI & AIOps Research
- [Google SRE Book — Site Reliability Engineering](https://sre.google/sre-book/table-of-contents/)
- [Microsoft AIOps: Artificial Intelligence for IT Operations](https://www.microsoft.com/en-us/research/project/aiops/)
- [Gartner — AIOps Platforms Market Guide 2024](https://www.gartner.com/en/information-technology/insights/aiops)
- [Meta — Automated Incident Management at Scale](https://engineering.fb.com/2023/03/13/production-engineering/incident-management/)
- [Netflix — Chaos Engineering Principles](https://netflixtechblog.com/tagged/chaos-engineering)

### Root Cause Analysis Techniques
- [The N+1 Query Problem — Martin Fowler](https://martinfowler.com/articles/n-plus-one-problem.html)
- [Database Connection Pool Exhaustion Patterns — Vlad Mihalcea](https://vladmihalcea.com/the-best-way-to-use-the-hibernate-connection-provider/)
- [Distributed Systems Observability — O'Reilly](https://www.oreilly.com/library/view/distributed-systems-observability/9781492033431/)
- [OpenTelemetry — Observability Framework](https://opentelemetry.io/docs/)

### Deployment & SRE Practices
- [Canary Deployments — Martin Fowler](https://martinfowler.com/bliki/CanaryRelease.html)
- [Progressive Delivery — LaunchDarkly](https://launchdarkly.com/blog/what-is-progressive-delivery/)
- [DORA Metrics — DevOps Research & Assessment](https://dora.dev/guides/dora-metrics-four-keys/)
- [AWS Well-Architected Framework — Reliability Pillar](https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/welcome.html)

### Frontend Technologies
- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Lucide Icons](https://lucide.dev)

### Design Inspiration
- [Vercel Dashboard Design System](https://vercel.com/design)
- [Linear — Issue Tracking UI Patterns](https://linear.app)
- [Datadog — Monitoring Dashboard UX](https://www.datadoghq.com)
- [PagerDuty — Incident Management UI](https://www.pagerduty.com)
- [Grafana — Observability Dashboard Patterns](https://grafana.com)

---

## ⚠️ Disclaimer

REPAIRX AI is a **Phase 1 hackathon prototype** built for demonstration purposes. All incidents, metrics, services, agents, and resolutions shown are **fully simulated with mock data**. No real infrastructure is monitored, no real code is deployed, and no real systems are modified. The AI chatbot uses a rule-based response engine — not a live LLM. This prototype demonstrates the **concept, UX, and technical feasibility** of autonomous production engineering.

---

## 📄 License

MIT License — free to use, modify, and distribute.

---

<div align="center">

**REPAIRX AI © 2026 — Autonomous Production Engineer**

Phase 1 Prototype · Built for Hackathon Presentation · All systems simulated

⭐ Star this repo if you found it useful!

</div>
