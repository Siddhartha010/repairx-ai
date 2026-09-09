import { TerminalLog, SectionHeader } from '../components';
import { DEMO_FLOW_STEPS } from '../mockData';

const colorMap = {
  red: 'text-red-400 border-red-500/50 bg-red-500/10',
  blue: 'text-blue-400 border-blue-500/50 bg-blue-500/10',
  purple: 'text-purple-400 border-purple-500/50 bg-purple-500/10',
  yellow: 'text-yellow-400 border-yellow-500/50 bg-yellow-500/10',
  green: 'text-green-400 border-green-500/50 bg-green-500/10',
  cyan: 'text-cyan-400 border-cyan-500/50 bg-cyan-500/10',
  pink: 'text-pink-400 border-pink-500/50 bg-pink-500/10',
};

export default function DemoFlowPanel({ currentStep, visibleLogs, demoRunning, onSimulate }) {
  return (
    <div className="glass rounded-2xl p-5 border border-slate-700/50">
      <div className="flex items-center justify-between mb-4">
        <SectionHeader title="AI Autonomous Resolution Flow" subtitle="End-to-end incident lifecycle" icon="⚡" />
        {!demoRunning && currentStep === -1 && (
          <button
            onClick={onSimulate}
            className="px-4 py-2 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500
              text-white text-xs font-bold rounded-lg transition-all duration-200 animate-pulse-glow
              flex items-center gap-2 shrink-0">
            <span>🚨</span> Simulate Incident
          </button>
        )}
        {demoRunning && (
          <div className="flex items-center gap-2 text-blue-400 text-xs animate-pulse">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-ping" />
            AI RUNNING...
          </div>
        )}
        {!demoRunning && currentStep >= 0 && (
          <button onClick={onSimulate}
            className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-white text-xs rounded-lg transition-colors">
            🔄 Reset
          </button>
        )}
      </div>

      {/* Step indicators */}
      <div className="flex gap-1.5 mb-4 overflow-x-auto pb-1 scrollbar-thin">
        {DEMO_FLOW_STEPS.map(step => {
          const state = currentStep === step.id ? 'active' : currentStep > step.id ? 'complete' : 'pending';
          return (
            <div key={step.id}
              className={`flex-shrink-0 flex flex-col items-center gap-1 px-3 py-2 rounded-xl border text-center transition-all duration-500
                ${state === 'active' ? 'step-active' : state === 'complete' ? 'step-complete' : 'step-pending'}`}
              style={{ minWidth: '90px' }}>
              <span className="text-lg">{state === 'complete' ? '✅' : step.icon}</span>
              <span className={`text-xs font-medium leading-tight
                ${state === 'active' ? 'text-blue-300' : state === 'complete' ? 'text-green-300' : 'text-slate-500'}`}>
                {step.phase}
              </span>
              {state === 'active' && (
                <div className="flex gap-0.5">
                  {[0,1,2].map(i => (
                    <div key={i} className="w-1 h-1 bg-blue-400 rounded-full animate-bounce"
                      style={{ animationDelay: `${i * 0.15}s` }} />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Active step detail */}
      {currentStep >= 0 && (
        <div className={`p-4 rounded-xl border animate-slide-in-up ${colorMap[DEMO_FLOW_STEPS[Math.min(currentStep, 7)].color]}`}>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">{DEMO_FLOW_STEPS[Math.min(currentStep, 7)].icon}</span>
            <div>
              <div className="text-white font-bold text-sm">{DEMO_FLOW_STEPS[Math.min(currentStep, 7)].phase}</div>
              <div className="text-slate-400 text-xs">Agent: {DEMO_FLOW_STEPS[Math.min(currentStep, 7)].agent}</div>
            </div>
          </div>
          <TerminalLog lines={visibleLogs} maxHeight="180px" />
        </div>
      )}

      {currentStep === -1 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="text-5xl mb-4 animate-rotate-slow">⚙️</div>
          <p className="text-slate-400 text-sm">Click <strong className="text-white">Simulate Incident</strong> to trigger the full AI autonomous resolution demo</p>
          <p className="text-slate-600 text-xs mt-2">8 phases · ~30 seconds · fully automated</p>
        </div>
      )}
    </div>
  );
}
