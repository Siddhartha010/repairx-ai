import { Badge, SectionHeader, ProgressBar } from '../components';
import { AGENTS } from '../mockData';

const colorMap = {
  blue: 'border-blue-500/40 bg-blue-500/5 text-blue-400',
  purple: 'border-purple-500/40 bg-purple-500/5 text-purple-400',
  yellow: 'border-yellow-500/40 bg-yellow-500/5 text-yellow-400',
  green: 'border-green-500/40 bg-green-500/5 text-green-400',
  cyan: 'border-cyan-500/40 bg-cyan-500/5 text-cyan-400',
  pink: 'border-pink-500/40 bg-pink-500/5 text-pink-400',
};

export default function AgentCommandCenter({ activeAgent, demoRunning }) {
  return (
    <div className="glass rounded-2xl p-5 border border-slate-700/50">
      <SectionHeader title="AI Agent Command Center" subtitle="Multi-agent autonomous system" icon="🤖" />
      <div className="grid grid-cols-2 gap-3">
        {AGENTS.map(agent => {
          const isActive = activeAgent === agent.name || (demoRunning && agent.status === 'active');
          return (
            <div key={agent.id}
              className={`agent-card p-3 rounded-xl border transition-all duration-300
                ${colorMap[agent.color]}
                ${isActive ? 'ring-1 ring-offset-0 animate-pulse-glow' : 'opacity-80'}`}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{agent.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-white text-xs font-bold">{agent.name}</div>
                  <div className="text-slate-400 text-xs truncate">{agent.role}</div>
                </div>
                <Badge color={isActive ? agent.color : 'slate'}>
                  {isActive ? 'ACTIVE' : agent.status.toUpperCase()}
                </Badge>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Accuracy</span>
                  <span className="text-white font-mono">{agent.accuracy}%</span>
                </div>
                <ProgressBar value={agent.accuracy} max={100} color={agent.color} />
                <div className="text-slate-600 text-xs">{agent.tasks.toLocaleString()} tasks resolved</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
