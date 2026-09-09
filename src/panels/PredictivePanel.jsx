import { Badge, SectionHeader, ProgressBar } from '../components';
import { PREDICTIONS, KNOWLEDGE_BASE } from '../mockData';

export function PredictivePanel({ show }) {
  return (
    <div className="glass rounded-2xl p-5 border border-purple-500/30">
      <SectionHeader title="Predictive Failure Prevention" subtitle="Oracle AI — future risk detection" icon="🔮" />
      <div className="space-y-3">
        {PREDICTIONS.map(p => (
          <div key={p.id} className={`p-3 rounded-xl border transition-all duration-300
            ${p.risk > 60 ? 'border-red-500/40 bg-red-500/5' : p.risk > 40 ? 'border-yellow-500/30 bg-yellow-500/5' : 'border-blue-500/20 bg-blue-500/5'}
            ${show && p.id === 'PRD-01' ? 'ring-1 ring-purple-500/50 animate-pulse-glow' : ''}`}>
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <div className="text-white text-xs font-medium">{p.service}</div>
                <div className="text-slate-400 text-xs mt-0.5">{p.issue}</div>
              </div>
              <div className="text-right shrink-0">
                <div className={`text-sm font-bold ${p.risk > 60 ? 'text-red-400' : p.risk > 40 ? 'text-yellow-400' : 'text-blue-400'}`}>
                  {p.risk}%
                </div>
                <div className="text-slate-500 text-xs">risk</div>
              </div>
            </div>
            <ProgressBar value={p.risk} max={100} color={p.risk > 60 ? 'red' : p.risk > 40 ? 'yellow' : 'blue'} />
            <div className="flex items-center justify-between mt-2">
              <span className="text-slate-500 text-xs">ETA: {p.eta}</span>
              <Badge color={p.risk > 60 ? 'red' : 'yellow'}>{p.action}</Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function KnowledgeBasePanel() {
  return (
    <div className="glass rounded-2xl p-5 border border-slate-700/50">
      <SectionHeader title="AI Knowledge Base" subtitle="Learned resolution patterns" icon="📚" />
      <div className="space-y-2">
        {KNOWLEDGE_BASE.map(kb => (
          <div key={kb.id} className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/40 border border-slate-700/30 hover:border-blue-500/30 transition-colors cursor-pointer">
            <div className="flex-1 min-w-0">
              <div className="text-white text-xs font-medium truncate">{kb.title}</div>
              <div className="flex items-center gap-3 mt-1">
                <Badge color="blue">{kb.category}</Badge>
                <span className="text-slate-500 text-xs">{kb.uses} uses</span>
                <span className="text-green-400 text-xs">avg {kb.resolution}</span>
              </div>
            </div>
            <div className="text-right shrink-0">
              <div className="text-white text-xs font-bold">{kb.confidence}%</div>
              <div className="text-slate-500 text-xs">confidence</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
