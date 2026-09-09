import { useState } from 'react';
import { AGENTS } from '../mockData';
import ERDiagram from './ERDiagram';
import DFDDiagram from './DFDDiagram';

const FEATURES = [
  { icon: '🚨', title: 'Real-Time Anomaly Detection', desc: 'Sentinel AI monitors all services 24/7, detecting anomalies within milliseconds using statistical baselines and ML models. No manual threshold tuning required.' },
  { icon: '🧠', title: 'Autonomous Root Cause Analysis', desc: 'Sherlock AI correlates deployment history, logs, query plans, and 847+ signals to pinpoint the exact root cause with up to 97.8% confidence in under 4 minutes.' },
  { icon: '⚡', title: 'AI-Generated Code and SQL Fixes', desc: 'Forge AI generates production-ready code patches and SQL optimizations automatically. Every fix is tested against 142+ unit and integration tests before deployment.' },
  { icon: '🛡️', title: 'Risk Assessment and Validation', desc: 'Guardian AI provisions staging, runs load tests at 10,000 req/min, scores deployment risk 0-100, and arms auto-rollback triggers before any production change.' },
  { icon: '🚀', title: 'Safe Canary Deployment', desc: 'Pilot AI executes progressive canary rollouts: 5% to 25% to 75% to 100% traffic, with automatic rollback if error rate exceeds 1% at any stage.' },
  { icon: '🔮', title: 'Predictive Failure Prevention', desc: 'Oracle AI learns from every resolved incident and scans all services for similar failure signatures before they occur, predicting failures hours in advance.' },
  { icon: '📊', title: 'Live Performance Dashboard', desc: 'Real-time metrics for P99 latency, error rates, CPU, memory, throughput, and DB connections across all 8 services with animated sparkline charts.' },
  { icon: '📚', title: 'Self-Learning Knowledge Base', desc: 'Every resolved incident enriches the KB with new resolution patterns. Currently holding 6 high-confidence patterns with 91-99% accuracy.' },
  { icon: '🤖', title: 'AI Agent Command Center', desc: 'A unified view of all 6 autonomous agents, their roles, real-time status, accuracy scores, and task counts.' },
  { icon: '📄', title: 'Automated Incident Reports', desc: 'Full post-incident reports generated automatically covering root cause, fix details, before/after metrics, risk assessment, and deployment log.' },
  { icon: '💬', title: 'AI Assistant Chatbot', desc: 'An intelligent chatbot with full dashboard knowledge. Ask anything about incidents, root causes, fix reasoning, agent roles, or predictions in natural language.' },
  { icon: '🔄', title: 'Full Demo Simulation', desc: 'One-click Simulate Incident triggers the complete 8-phase autonomous resolution flow with live terminal logs and animated step transitions.' },
];

const TECH_STACK = [
  { cat: 'Frontend Framework', items: ['React 18 (Hooks, useCallback, useState)', 'Vite 6 (build tool and dev server)', 'JSX component architecture'] },
  { cat: 'Styling and UI', items: ['Tailwind CSS v4 (@tailwindcss/vite)', 'Custom CSS animations (pulse-glow, slide-in, fade-in)', 'Glass morphism design system', 'Dark theme with neon accents'] },
  { cat: 'Icons and Graphics', items: ['Lucide React (icon library)', 'Custom SVG sparkline charts', 'Custom SVG risk gauge', 'Emoji-based agent avatars'] },
  { cat: 'Data and Logic', items: ['Mock data layer (mockData.js)', 'Rule-based NLP chatbot engine (chatbot.js)', 'Client-side report export (Blob API)', 'Simulated async demo flow (setTimeout)'] },
  { cat: 'Architecture', items: ['Component-based panel system', 'Shared reusable UI primitives (components.jsx)', 'Tab-based navigation', 'Responsive grid layout (CSS Grid + Flexbox)'] },
];

const REFERENCES = [
  { cat: 'AI and AIOps Research', refs: [
    { title: 'Google SRE Book - Site Reliability Engineering', url: 'https://sre.google/sre-book/table-of-contents/' },
    { title: 'Microsoft AIOps: Artificial Intelligence for IT Operations', url: 'https://www.microsoft.com/en-us/research/project/aiops/' },
    { title: 'Gartner - AIOps Platforms Market Guide 2024', url: 'https://www.gartner.com/en/information-technology/insights/aiops' },
    { title: 'Meta - Automated Incident Management at Scale', url: 'https://engineering.fb.com/2023/03/13/production-engineering/incident-management/' },
    { title: 'Netflix - Chaos Engineering Principles', url: 'https://netflixtechblog.com/tagged/chaos-engineering' },
  ]},
  { cat: 'Root Cause Analysis Techniques', refs: [
    { title: 'The N+1 Query Problem - Martin Fowler', url: 'https://martinfowler.com/articles/n-plus-one-problem.html' },
    { title: 'Database Connection Pool Exhaustion Patterns - Vlad Mihalcea', url: 'https://vladmihalcea.com/the-best-way-to-use-the-hibernate-connection-provider/' },
    { title: 'Distributed Systems Observability - OReilly', url: 'https://www.oreilly.com/library/view/distributed-systems-observability/9781492033431/' },
    { title: 'OpenTelemetry - Observability Framework', url: 'https://opentelemetry.io/docs/' },
  ]},
  { cat: 'Deployment and SRE Practices', refs: [
    { title: 'Canary Deployments - Martin Fowler', url: 'https://martinfowler.com/bliki/CanaryRelease.html' },
    { title: 'Progressive Delivery - LaunchDarkly', url: 'https://launchdarkly.com/blog/what-is-progressive-delivery/' },
    { title: 'DORA Metrics - DevOps Research and Assessment', url: 'https://dora.dev/guides/dora-metrics-four-keys/' },
    { title: 'AWS Well-Architected Framework - Reliability Pillar', url: 'https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/welcome.html' },
  ]},
  { cat: 'Frontend Technologies', refs: [
    { title: 'React Documentation - react.dev', url: 'https://react.dev' },
    { title: 'Vite Documentation - vitejs.dev', url: 'https://vitejs.dev' },
    { title: 'Tailwind CSS Documentation - tailwindcss.com', url: 'https://tailwindcss.com/docs' },
    { title: 'Lucide Icons - lucide.dev', url: 'https://lucide.dev' },
  ]},
  { cat: 'Design Inspiration', refs: [
    { title: 'Vercel Dashboard Design System', url: 'https://vercel.com/design' },
    { title: 'Linear - Issue Tracking UI Patterns', url: 'https://linear.app' },
    { title: 'Datadog - Monitoring Dashboard UX', url: 'https://www.datadoghq.com' },
    { title: 'PagerDuty - Incident Management UI', url: 'https://www.pagerduty.com' },
    { title: 'Grafana - Observability Dashboard Patterns', url: 'https://grafana.com' },
  ]},
];

const PROBLEM_POINTS = [
  { icon: '⏰', title: 'Slow Detection', desc: 'Production incidents go undetected for 15-45 minutes on average, causing massive user impact before anyone is paged.' },
  { icon: '🔍', title: 'Manual Investigation', desc: 'Engineers spend 1-3 hours manually correlating logs, metrics, and deployment history to find root causes under extreme pressure.' },
  { icon: '😰', title: 'Human Error Under Pressure', desc: 'Incident response under stress leads to wrong fixes and repeat incidents. 40% of incidents recur within 30 days.' },
  { icon: '💸', title: 'Massive Business Cost', desc: 'Average cost of a production outage: $5,600/minute. A 2-hour incident costs over $670,000 in lost revenue and engineering time.' },
  { icon: '📉', title: 'Reactive Not Proactive', desc: 'Traditional monitoring only alerts after failures occur. There is no mechanism to predict and prevent failures before users are impacted.' },
  { icon: '🧩', title: 'Knowledge Silos', desc: 'Resolution knowledge lives in individual engineers heads. When they leave, the organization loses institutional memory of how to fix recurring issues.' },
];

const SOLUTION_POINTS = [
  { icon: '⚡', title: 'Sub-Second Detection', desc: 'Sentinel AI detects anomalies within 620ms of occurrence, 1,000x faster than human-paged alerting systems.' },
  { icon: '🧠', title: 'Autonomous Investigation', desc: 'Sherlock AI performs full root cause analysis in under 4 minutes with 97.8% accuracy, no human involvement needed.' },
  { icon: '🤖', title: 'AI-Generated Fixes', desc: 'Forge AI generates, tests, and validates production-ready fixes automatically. 142 tests run before any code touches production.' },
  { icon: '💰', title: '92% Faster Resolution', desc: 'MTTR reduced from 2-4 hours to 11 minutes. At $5,600/min, that saves over $650,000 per major incident.' },
  { icon: '🔮', title: 'Predict Before It Breaks', desc: 'Oracle AI predicts failures hours in advance and queues pre-emptive actions, turning reactive firefighting into proactive prevention.' },
  { icon: '📚', title: 'Institutional Memory', desc: 'Every resolution is captured in the Knowledge Base. The system gets smarter with every incident and knowledge never leaves the organization.' },
];

const agentDescs = {
  Sentinel: 'Monitors all 8 services 24/7 using ML anomaly detection. Detects spikes, drops, and pattern deviations within milliseconds. Auto-creates incident tickets and escalates severity.',
  Sherlock: 'Performs automated root cause analysis by correlating deployments, logs, query plans, and 847+ signals. Matches patterns against the Knowledge Base with confidence scoring.',
  Forge: 'Generates production-ready code fixes, SQL optimizations, and config patches. Runs full test suites before packaging the fix for validation.',
  Guardian: 'Provisions staging environments, runs load tests, scores deployment risk 0-100, and arms auto-rollback triggers. Blocks deployment if risk exceeds threshold.',
  Pilot: 'Executes safe canary deployments with progressive traffic shifting. Monitors metrics at each stage and triggers instant rollback if anomalies are detected.',
  Oracle: 'Learns from every resolved incident to predict future failures. Scans all services for known failure signatures and queues pre-emptive actions hours before impact.',
};

const agentColors = {
  blue: 'border-blue-500/30 bg-blue-500/5 text-blue-400',
  purple: 'border-purple-500/30 bg-purple-500/5 text-purple-400',
  yellow: 'border-yellow-500/30 bg-yellow-500/5 text-yellow-400',
  green: 'border-green-500/30 bg-green-500/5 text-green-400',
  cyan: 'border-cyan-500/30 bg-cyan-500/5 text-cyan-400',
  pink: 'border-pink-500/30 bg-pink-500/5 text-pink-400',
};

function Card({ children, className }) {
  return <div className={'glass rounded-2xl border border-slate-700/50 p-5 ' + (className || '')}>{children}</div>;
}

function SectionTitle({ label, sub }) {
  return (
    <div className="mb-6">
      <h2 className="text-white font-bold text-lg tracking-tight">{label}</h2>
      {sub && <p className="text-slate-500 text-xs mt-1">{sub}</p>}
      <div className="mt-2 h-px bg-gradient-to-r from-blue-500/50 via-purple-500/30 to-transparent" />
    </div>
  );
}

export default function AboutPanel() {
  const [openRef, setOpenRef] = useState(null);

  return (
    <div className="space-y-8 animate-fade-in">

      {/* Hero */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-700/50">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-purple-900/30 to-slate-900/80 bg-grid-pattern" />
        <div className="relative px-8 py-12 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full text-blue-300 text-xs font-medium mb-4">
            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
            Phase 1 Hackathon Prototype — 2026
          </div>
          <div className="text-5xl mb-4">⚡</div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">
            REPAIRX <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">AI</span>
          </h1>
          <p className="text-slate-300 text-lg font-medium mb-2">Autonomous Production Engineer</p>
          <p className="text-slate-400 text-sm max-w-2xl mx-auto leading-relaxed">
            An AI-powered platform that autonomously detects, investigates, diagnoses, fixes, validates, deploys, and prevents software production failures with zero human intervention.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            {[['11 min','Avg MTTR'],['97.8%','RCA Accuracy'],['6','AI Agents'],['99.7%','Deploy Safety'],['92%','Faster than Human'],['0','Human Interventions']].map(([val, lbl]) => (
              <div key={lbl} className="glass px-4 py-2 rounded-xl border border-slate-600/40 text-center">
                <div className="text-blue-400 font-bold text-lg">{val}</div>
                <div className="text-slate-500 text-xs">{lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* What is REPAIRX */}
      <Card>
        <SectionTitle label="What is REPAIRX AI?" sub="The core concept and vision" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3 text-slate-300 text-sm leading-relaxed">
            <p>REPAIRX AI is a next-generation <span className="text-blue-400 font-medium">Autonomous Production Engineering</span> platform that replaces the traditional human on-call incident response loop with a fully automated, multi-agent AI system.</p>
            <p>When a production failure occurs, REPAIRX does not just alert an engineer. It <span className="text-green-400 font-medium">detects, investigates, diagnoses, fixes, validates, deploys, and prevents</span> the failure entirely on its own in under 11 minutes.</p>
            <p>The platform is built around <span className="text-purple-400 font-medium">6 specialized AI agents</span>, each owning one phase of the incident lifecycle. They work in a coordinated pipeline, passing context between each other like a highly efficient engineering team that never sleeps.</p>
            <p>Beyond reactive repair, REPAIRX Oracle agent <span className="text-yellow-400 font-medium">predicts failures before they happen</span> by learning from every resolved incident and scanning all services for similar failure signatures.</p>
          </div>
          <div className="space-y-2">
            {[
              ['🎯','Target Users','Platform engineering teams, SRE teams, DevOps engineers at mid-to-large tech companies running microservice architectures'],
              ['🏗️','Architecture','Multi-agent AI pipeline with specialized agents for detection, analysis, fix generation, validation, deployment, and prediction'],
              ['📡','Data Sources','Service metrics, application logs, deployment history, query execution plans, error traces, and knowledge base patterns'],
              ['🔒','Safety Model','Every fix is staged, load-tested, risk-scored, and deployed via canary with auto-rollback. Humans can override at any stage'],
            ].map(([icon, title, desc]) => (
              <div key={title} className="flex gap-3 p-3 bg-slate-800/40 rounded-xl border border-slate-700/30">
                <span className="text-xl shrink-0">{icon}</span>
                <div>
                  <div className="text-white text-xs font-semibold">{title}</div>
                  <div className="text-slate-400 text-xs mt-0.5 leading-relaxed">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Problem vs Solution */}
      <div>
        <SectionTitle label="The Problem and Our Solution" sub="Why REPAIRX exists" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="rounded-2xl border p-5 bg-red-950/20 border-red-500/20">
            <div className="text-red-400 text-sm font-bold mb-4 flex items-center gap-2">
              <span>❌</span> The Problem — Status Quo
            </div>
            <div className="space-y-3">
              {PROBLEM_POINTS.map(p => (
                <div key={p.title} className="flex gap-3">
                  <span className="text-lg shrink-0">{p.icon}</span>
                  <div>
                    <div className="text-white text-xs font-semibold">{p.title}</div>
                    <div className="text-slate-400 text-xs mt-0.5 leading-relaxed">{p.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border p-5 bg-green-950/20 border-green-500/20">
            <div className="text-green-400 text-sm font-bold mb-4 flex items-center gap-2">
              <span>✅</span> The Solution — REPAIRX AI
            </div>
            <div className="space-y-3">
              {SOLUTION_POINTS.map(p => (
                <div key={p.title} className="flex gap-3">
                  <span className="text-lg shrink-0">{p.icon}</span>
                  <div>
                    <div className="text-white text-xs font-semibold">{p.title}</div>
                    <div className="text-slate-400 text-xs mt-0.5 leading-relaxed">{p.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* How it works */}
      <Card>
        <SectionTitle label="How REPAIRX Works" sub="The 8-phase autonomous resolution pipeline" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { icon:'🚨', phase:'1. Detect', agent:'Sentinel', desc:'Anomaly detected in under 1 second. Incident auto-created with full context.' },
            { icon:'🔍', phase:'2. Investigate', agent:'Sherlock', desc:'847 signals correlated. Deployment diff analyzed. KB matched.' },
            { icon:'🧠', phase:'3. Diagnose', agent:'Sherlock', desc:'Root cause confirmed at 97.8% confidence. Blast radius mapped.' },
            { icon:'⚡', phase:'4. Fix', agent:'Forge', desc:'Code patch generated. 142 tests executed. Fix packaged.' },
            { icon:'✅', phase:'5. Validate', agent:'Guardian', desc:'Staging load test. Risk score 8/100 LOW. Approved.' },
            { icon:'🚀', phase:'6. Deploy', agent:'Pilot', desc:'Canary 5 to 25 to 75 to 100 percent. Auto-rollback armed.' },
            { icon:'💚', phase:'7. Recover', agent:'Sentinel', desc:'All metrics nominal. 12,400 users restored. MTTR 11 min.' },
            { icon:'🔮', phase:'8. Predict', agent:'Oracle', desc:'Future failures predicted. Pre-emptive actions queued.' },
          ].map((s, i) => (
            <div key={i} className="p-3 bg-slate-800/40 rounded-xl border border-slate-700/30 hover:border-blue-500/30 transition-colors">
              <div className="text-2xl mb-2">{s.icon}</div>
              <div className="text-white text-xs font-bold">{s.phase}</div>
              <div className="text-blue-400 text-xs mb-1">Agent: {s.agent}</div>
              <div className="text-slate-500 text-xs leading-relaxed">{s.desc}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* ER Diagram */}
      <div className="glass rounded-2xl border border-blue-500/20 p-5">
        <SectionTitle label="Entity Relationship Diagram" sub="Conceptual data model — how REPAIRX would structure its database in production" />
        <div className="bg-slate-900/60 rounded-xl p-4 border border-slate-700/40 overflow-x-auto">
          <ERDiagram />
        </div>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { color: 'text-red-400', label: 'INCIDENT', desc: 'Core entity — every detected failure with severity, status, MTTR' },
            { color: 'text-blue-400', label: 'SERVICE', desc: 'Monitored microservices with health and region metadata' },
            { color: 'text-cyan-400', label: 'METRIC', desc: 'Time-series telemetry per service — latency, errors, CPU, memory' },
            { color: 'text-purple-400', label: 'AI_AGENT', desc: 'The 6 autonomous agents with accuracy and task tracking' },
            { color: 'text-yellow-400', label: 'ROOT_CAUSE', desc: 'RCA output — description, confidence score, deploy reference' },
            { color: 'text-green-400', label: 'FIX', desc: 'AI-generated code fix with risk score and test results' },
            { color: 'text-cyan-400', label: 'DEPLOYMENT', desc: 'Canary deployment record with strategy and rollout status' },
            { color: 'text-violet-400', label: 'KNOWLEDGE_BASE', desc: 'Learned resolution patterns with confidence and use count' },
            { color: 'text-pink-400', label: 'PREDICTION', desc: 'Oracle future failure predictions with risk % and ETA' },
          ].map(e => (
            <div key={e.label} className="p-2 bg-slate-800/40 rounded-lg border border-slate-700/30">
              <div className={`text-xs font-bold font-mono ${e.color}`}>{e.label}</div>
              <div className="text-slate-500 text-xs mt-0.5 leading-relaxed">{e.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* DFD Diagram */}
      <div className="glass rounded-2xl border border-purple-500/20 p-5">
        <SectionTitle label="Data Flow Diagram" sub="How data moves through the REPAIRX AI autonomous pipeline" />
        <div className="bg-slate-900/60 rounded-xl p-4 border border-slate-700/40 overflow-x-auto">
          <DFDDiagram />
        </div>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { icon: '🔵', label: 'P1 — Sentinel', desc: 'Ingests service telemetry, detects anomalies, creates incidents' },
            { icon: '🟣', label: 'P2 — Sherlock', desc: 'Receives anomaly context, queries KB, outputs root cause' },
            { icon: '🟡', label: 'P3 — Forge', desc: 'Takes root cause, generates fix package, stores to D3' },
            { icon: '🟢', label: 'P4 — Guardian', desc: 'Validates fix in staging, scores risk, sends report to engineers' },
            { icon: '🩵', label: 'P5 — Pilot', desc: 'Deploys approved fix via canary, streams status to dashboard' },
            { icon: '🩷', label: 'P6 — Oracle', desc: 'Reads resolved incidents and KB patterns, sends predictive alerts' },
          ].map(p => (
            <div key={p.label} className="p-2 bg-slate-800/40 rounded-lg border border-slate-700/30">
              <div className="text-xs font-bold text-white flex items-center gap-1.5"><span>{p.icon}</span>{p.label}</div>
              <div className="text-slate-500 text-xs mt-0.5 leading-relaxed">{p.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div>
        <SectionTitle label="Features" sub="Everything REPAIRX AI can do" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map(f => (
            <div key={f.title} className="glass p-4 rounded-2xl border border-slate-700/40 hover:border-blue-500/30 transition-all duration-200 hover:-translate-y-0.5">
              <div className="text-2xl mb-2">{f.icon}</div>
              <div className="text-white text-xs font-semibold mb-1">{f.title}</div>
              <div className="text-slate-400 text-xs leading-relaxed">{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Agents */}
      <Card>
        <SectionTitle label="The 6 AI Agents" sub="Specialized autonomous agents powering REPAIRX" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {AGENTS.map(a => (
            <div key={a.id} className={'p-4 rounded-xl border ' + agentColors[a.color]}>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{a.icon}</span>
                <div>
                  <div className="text-white font-bold text-sm">{a.name}</div>
                  <div className="text-slate-400 text-xs">{a.role}</div>
                </div>
                <div className="ml-auto text-right">
                  <div className="text-white text-xs font-bold">{a.accuracy}%</div>
                  <div className="text-slate-500 text-xs">accuracy</div>
                </div>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">{agentDescs[a.name]}</p>
              <div className="mt-2 text-slate-600 text-xs">{a.tasks.toLocaleString()} tasks resolved</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Tech Stack */}
      <Card>
        <SectionTitle label="Technology Stack" sub="Built with modern open-source tools" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {TECH_STACK.map(t => (
            <div key={t.cat} className="p-4 bg-slate-800/40 rounded-xl border border-slate-700/30">
              <div className="text-blue-400 text-xs font-bold mb-2 uppercase tracking-wider">{t.cat}</div>
              <ul className="space-y-1">
                {t.items.map(item => (
                  <li key={item} className="text-slate-300 text-xs flex gap-2">
                    <span className="text-slate-600 shrink-0">›</span>{item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Card>

      {/* References */}
      <div>
        <SectionTitle label="References and Inspirations" sub="Research, tools, and design patterns that informed REPAIRX" />
        <div className="space-y-3">
          {REFERENCES.map(group => (
            <div key={group.cat} className="glass rounded-2xl border border-slate-700/40 overflow-hidden">
              <button
                onClick={() => setOpenRef(openRef === group.cat ? null : group.cat)}
                className="w-full flex items-center justify-between px-5 py-3 hover:bg-slate-800/40 transition-colors">
                <span className="text-white text-sm font-semibold">{group.cat}</span>
                <span className={'text-slate-400 text-lg transition-transform duration-200 inline-block ' + (openRef === group.cat ? 'rotate-180' : '')}>⌄</span>
              </button>
              {openRef === group.cat && (
                <div className="px-5 pb-4 space-y-2 border-t border-slate-700/30 pt-3 animate-fade-in">
                  {group.refs.map(ref => (
                    <a key={ref.title} href={ref.url} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 text-xs text-blue-400 hover:text-blue-300 transition-colors group">
                      <span className="text-slate-600 group-hover:text-blue-400">↗</span>
                      <span className="underline underline-offset-2 decoration-blue-500/30 group-hover:decoration-blue-400">{ref.title}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="glass rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-5">
        <div className="flex gap-3">
          <span className="text-2xl shrink-0">⚠️</span>
          <div>
            <div className="text-yellow-400 font-semibold text-sm mb-1">Prototype Disclaimer</div>
            <p className="text-slate-400 text-xs leading-relaxed">
              REPAIRX AI is a <strong className="text-white">Phase 1 hackathon prototype</strong> built for demonstration purposes.
              All incidents, metrics, services, agents, and resolutions shown are <strong className="text-white">fully simulated with mock data</strong>.
              No real infrastructure is monitored, no real code is deployed, and no real systems are modified.
              The AI chatbot uses a rule-based response engine, not a live LLM.
              This prototype demonstrates the concept, UX, and technical feasibility of autonomous production engineering.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
