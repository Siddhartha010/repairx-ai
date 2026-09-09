import { useState, useCallback } from 'react';
import './index.css';
import { DEMO_FLOW_STEPS, SERVICES, INCIDENTS, AGENTS, PREDICTIONS, KNOWLEDGE_BASE, BEFORE_AFTER, GENERATED_FIX } from './mockData';
import MetricsPanel from './panels/MetricsPanel';
import ServicePanel from './panels/ServicePanel';
import IncidentPanel from './panels/IncidentPanel';
import AgentCommandCenter from './panels/AgentCommandCenter';
import DemoFlowPanel from './panels/DemoFlowPanel';
import BeforeAfterPanel from './panels/BeforeAfterPanel';
import { PredictivePanel, KnowledgeBasePanel } from './panels/PredictivePanel';
import { RootCausePanel, RiskPanel } from './panels/RootCausePanel';
import ChatBot from './panels/ChatBot';
import AboutPanel from './panels/AboutPanel';

function Header({ incidentActive, recovered, systemHealth }) {
  return (
    <header className="glass border-b border-slate-700/50 px-6 py-3 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-lg animate-pulse-glow">
            ⚡
          </div>
        </div>
        <div>
          <div className="text-white font-bold text-sm tracking-wide">REPAIRX AI</div>
          <div className="text-slate-500 text-xs">Autonomous Production Engineer</div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        {incidentActive && !recovered && (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-red-500/20 border border-red-500/40 rounded-lg animate-pulse">
            <div className="w-2 h-2 bg-red-400 rounded-full animate-ping" />
            <span className="text-red-300 text-xs font-bold">CRITICAL INCIDENT ACTIVE</span>
          </div>
        )}
        {recovered && (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/20 border border-green-500/40 rounded-lg">
            <div className="w-2 h-2 bg-green-400 rounded-full" />
            <span className="text-green-300 text-xs font-bold">SYSTEM RECOVERED — MTTR: 11 min</span>
          </div>
        )}
        <div className="hidden sm:flex items-center gap-4 text-xs text-slate-400">
          <span>Health: <strong className={systemHealth > 90 ? 'text-green-400' : 'text-red-400'}>{systemHealth}%</strong></span>
          <span>MTTR: <strong className="text-blue-400">11 min</strong></span>
          <span>Incidents: <strong className="text-white">3</strong></span>
        </div>
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" title="Connected" />
      </div>
    </header>
  );
}

function SystemHealthBar({ incidentActive, recovered }) {
  const health = incidentActive && !recovered ? 71 : 99;
  const color = health > 90 ? 'from-green-500 to-emerald-400' : health > 70 ? 'from-yellow-500 to-orange-400' : 'from-red-500 to-red-400';
  return (
    <div className="glass border-b border-slate-700/30 px-6 py-2 flex items-center gap-4">
      <span className="text-slate-500 text-xs shrink-0">System Health</span>
      <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
        <div className={`h-full bg-gradient-to-r ${color} rounded-full transition-all duration-1000`}
          style={{ width: `${health}%` }} />
      </div>
      <span className={`text-xs font-bold shrink-0 ${health > 90 ? 'text-green-400' : 'text-red-400'}`}>{health}%</span>
      <div className="hidden md:flex items-center gap-6 text-xs text-slate-500 shrink-0">
        <span>🟢 6 Healthy</span>
        <span>🟡 2 Degraded</span>
        <span>🔴 {incidentActive && !recovered ? '1 Critical' : '0 Critical'}</span>
      </div>
    </div>
  );
}

export default function App() {
  const [currentStep, setCurrentStep] = useState(-1);
  const [demoRunning, setDemoRunning] = useState(false);
  const [visibleLogs, setVisibleLogs] = useState([]);
  const [activeAgent, setActiveAgent] = useState(null);
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');

  const incidentActive = currentStep >= 0;
  const recovered = currentStep >= 6;
  const showRCA = currentStep >= 2;
  const showFix = currentStep >= 3;
  const showRisk = currentStep >= 4;
  const showPredictions = currentStep >= 7;
  const systemHealth = incidentActive && !recovered ? 71 : 99;

  const runDemo = useCallback(() => {
    if (demoRunning) {
      setCurrentStep(-1);
      setDemoRunning(false);
      setVisibleLogs([]);
      setActiveAgent(null);
      return;
    }
    setDemoRunning(true);
    setCurrentStep(-1);
    setVisibleLogs([]);

    let stepIdx = 0;
    const runStep = () => {
      if (stepIdx >= DEMO_FLOW_STEPS.length) {
        setDemoRunning(false);
        return;
      }
      const step = DEMO_FLOW_STEPS[stepIdx];
      setCurrentStep(step.id);
      setActiveAgent(step.agent);
      setVisibleLogs([]);

      let logIdx = 0;
      const addLog = () => {
        if (logIdx < step.log.length) {
          setVisibleLogs(prev => [...prev, step.log[logIdx]]);
          logIdx++;
          setTimeout(addLog, 280);
        } else {
          stepIdx++;
          setTimeout(runStep, 600);
        }
      };
      addLog();
    };
    runStep();
  }, [demoRunning]);

  const exportReport = useCallback(({ currentStep, recovered, incidentActive }) => {
    const ts = new Date().toISOString();
    const lines = [
      '╔══════════════════════════════════════════════════════════════╗',
      '║          REPAIRX AI — INCIDENT RESOLUTION REPORT            ║',
      '╚══════════════════════════════════════════════════════════════╝',
      `Generated : ${ts}`,
      `Demo Phase: ${currentStep >= 0 ? DEMO_FLOW_STEPS[Math.min(currentStep,7)].phase : 'Not started'}`,
      `Status    : ${recovered ? 'RESOLVED' : incidentActive ? 'ACTIVE INCIDENT' : 'NOMINAL'}`,
      '',
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
      '  INCIDENT SUMMARY',
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
      ...INCIDENTS.map(i =>
        `  [${i.severity.toUpperCase()}] ${i.id} — ${i.title}\n  Status: ${i.status} | Impact: ${i.impact} | Users: ${i.affectedUsers.toLocaleString()}`
      ),
      '',
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
      '  SERVICE HEALTH',
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
      ...SERVICES.map(s =>
        `  ${s.status === 'critical' ? '🔴' : s.status === 'degraded' ? '🟡' : '🟢'} ${s.name.padEnd(24)} ${s.status.toUpperCase().padEnd(10)} latency:${String(s.latency).padStart(6)}ms  errors:${s.errors}%  uptime:${s.uptime}%`
      ),
      '',
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
      '  ROOT CAUSE ANALYSIS',
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
      '  Incident  : INC-4821 — Inventory DB Connection Pool Exhaustion',
      '  Root Cause: Deploy #d-8821 introduced N+1 ORM query pattern',
      '  Confidence: 97.8% (matched KB-006)',
      '  Blast Radius: 12,400 users across 3 services',
      '',
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
      '  BEFORE vs AFTER — PERFORMANCE METRICS',
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
      `  P99 Latency   : ${BEFORE_AFTER.before.latency}ms  →  ${BEFORE_AFTER.after.latency}ms   (↓ 99.5%)`,
      `  Error Rate    : ${BEFORE_AFTER.before.errorRate}%  →  ${BEFORE_AFTER.after.errorRate}%   (↓ 99.9%)`,
      `  Throughput    : ${BEFORE_AFTER.before.throughput} rps  →  ${BEFORE_AFTER.after.throughput} rps  (↑ 1253%)`,
      `  CPU Usage     : ${BEFORE_AFTER.before.cpuUsage}%  →  ${BEFORE_AFTER.after.cpuUsage}%   (↓ 75.5%)`,
      `  DB Connections: ${BEFORE_AFTER.before.dbConnections}%  →  ${BEFORE_AFTER.after.dbConnections}%   (↓ 89%)`,
      `  Users Impacted: ${BEFORE_AFTER.before.userImpact.toLocaleString()}  →  ${BEFORE_AFTER.after.userImpact}   (fully resolved)`,
      '',
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
      '  AI-GENERATED CODE FIX',
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
      `  File: ${GENERATED_FIX.filename}`,
      '  --- BEFORE ---',
      ...GENERATED_FIX.before.split('\n').map(l => '  ' + l),
      '  --- AFTER ---',
      ...GENERATED_FIX.after.split('\n').map(l => '  ' + l),
      '',
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
      '  RISK ASSESSMENT',
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
      '  Risk Score   : 8 / 100 (LOW)',
      '  Blast Radius : Low — single service',
      '  Rollback Plan: Auto-rollback armed',
      '  Test Coverage: 142/142 tests passed',
      '  Deployment   : Canary → 5% → 25% → 75% → 100%',
      '',
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
      '  PREDICTIVE ALERTS',
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
      ...PREDICTIONS.map(p =>
        `  [${p.risk}% risk] ${p.service} — ${p.issue}\n  ETA: ${p.eta} | Action: ${p.action}`
      ),
      '',
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
      '  AI AGENTS SUMMARY',
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
      ...AGENTS.map(a =>
        `  ${a.icon} ${a.name.padEnd(10)} ${a.role.padEnd(24)} accuracy:${a.accuracy}%  tasks:${a.tasks.toLocaleString()}`
      ),
      '',
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
      '  KNOWLEDGE BASE ENTRIES USED',
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
      ...KNOWLEDGE_BASE.map(kb =>
        `  ${kb.id}  ${kb.title.padEnd(42)} [${kb.category}]  confidence:${kb.confidence}%  uses:${kb.uses}`
      ),
      '',
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
      '  RESOLUTION TIMELINE',
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
      ...DEMO_FLOW_STEPS.map(s => `  ${s.icon} ${s.phase.padEnd(28)} Agent: ${s.agent}`),
      '  Total MTTR: 11 minutes (fully autonomous)',
      '',
      '╔══════════════════════════════════════════════════════════════╗',
      '║  REPAIRX AI © 2026 — Autonomous Production Engineer         ║',
      '║  Phase 1 Prototype — All data simulated for demonstration   ║',
      '╚══════════════════════════════════════════════════════════════╝',
    ];
    const blob = new Blob([lines.join('\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `repairx-report-${ts.slice(0,19).replace(/[:.]/g,'-')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }, []);

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'investigation', label: 'Investigation', icon: '🔍' },
    { id: 'agents', label: 'Agents', icon: '🤖' },
    { id: 'knowledge', label: 'Knowledge', icon: '📚' },
    { id: 'about', label: 'About', icon: 'ℹ️' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 grid-bg text-white">
      <Header incidentActive={incidentActive} recovered={recovered} systemHealth={systemHealth} />
      <SystemHealthBar incidentActive={incidentActive} recovered={recovered} />

      {/* Tab Nav */}
      <div className="px-6 pt-4 flex items-center gap-1 border-b border-slate-800/50">
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-xs font-medium rounded-t-lg transition-all duration-200 flex items-center gap-1.5
              ${activeTab === tab.id
                ? 'bg-slate-800 text-white border border-b-0 border-slate-700/50'
                : 'text-slate-500 hover:text-slate-300'}`}>
            <span>{tab.icon}</span>{tab.label}
          </button>
        ))}
        <div className="ml-auto mb-2">
          <button onClick={runDemo}
            className={`px-5 py-2 text-xs font-bold rounded-lg transition-all duration-200 flex items-center gap-2
              ${demoRunning
                ? 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                : currentStep >= 0
                  ? 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  : 'bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-500 hover:to-orange-400 text-white animate-pulse-glow'}`}>
            {demoRunning ? '⏹ Stop Demo' : currentStep >= 0 ? '🔄 Reset Demo' : '🚨 Simulate Incident'}
          </button>
        </div>
      </div>

      <main className="p-4 md:p-6 space-y-5">
        {activeTab === 'dashboard' && (
          <>
            <MetricsPanel incidentActive={incidentActive} recovered={recovered} />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              <div className="lg:col-span-2">
                <DemoFlowPanel
                  currentStep={currentStep}
                  visibleLogs={visibleLogs}
                  demoRunning={demoRunning}
                  onSimulate={runDemo}
                />
              </div>
              <div>
                <IncidentPanel
                  incidentActive={incidentActive}
                  onSelect={setSelectedIncident}
                  selectedId={selectedIncident}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <ServicePanel incidentActive={incidentActive} />
              <PredictivePanel show={showPredictions} />
            </div>
            <BeforeAfterPanel show={showFix} />
          </>
        )}

        {activeTab === 'investigation' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="space-y-5">
              <DemoFlowPanel
                currentStep={currentStep}
                visibleLogs={visibleLogs}
                demoRunning={demoRunning}
                onSimulate={runDemo}
              />
              <RootCausePanel show={showRCA} />
            </div>
            <div className="space-y-5">
              <RiskPanel show={showRisk} riskScore={8} />
              <BeforeAfterPanel show={showFix} />
            </div>
          </div>
        )}

        {activeTab === 'agents' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <AgentCommandCenter activeAgent={activeAgent} demoRunning={demoRunning} />
            <div className="space-y-5">
              <IncidentPanel incidentActive={incidentActive} onSelect={setSelectedIncident} selectedId={selectedIncident} />
              <PredictivePanel show={true} />
            </div>
          </div>
        )}

        {activeTab === 'knowledge' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <KnowledgeBasePanel />
            <div className="space-y-5">
              <RootCausePanel show={true} />
              <RiskPanel show={true} riskScore={8} />
            </div>
          </div>
        )}

        {activeTab === 'about' && <AboutPanel />}
      </main>

      <ChatBot />

      {/* Footer */}
      <footer className="border-t border-slate-800/50 px-6 py-3 flex items-center justify-between text-xs text-slate-600">
        <span>REPAIRX AI © 2026 — Autonomous Production Engineer</span>
        <div className="flex items-center gap-4">
          <span>Phase 1 Prototype</span>
          <span className="text-green-600">● All systems simulated</span>
          <button
            onClick={() => exportReport({ currentStep, recovered, incidentActive })}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600/20 hover:bg-blue-600/40 border border-blue-500/30 text-blue-400 hover:text-blue-300 rounded-lg transition-all duration-200 font-medium">
            📄 Export Report
          </button>
        </div>
      </footer>
    </div>
  );
}
