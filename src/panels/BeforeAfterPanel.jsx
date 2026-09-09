import { SectionHeader } from '../components';
import { BEFORE_AFTER, GENERATED_FIX } from '../mockData';

function CompareRow({ label, before, after, unit, higherIsBetter = false }) {
  const improved = higherIsBetter ? after > before : after < before;
  const pct = Math.abs(((after - before) / before) * 100).toFixed(1);
  return (
    <div className="flex items-center gap-3 py-2 border-b border-slate-700/30 last:border-0">
      <span className="text-slate-400 text-xs w-32 shrink-0">{label}</span>
      <span className="text-red-400 text-xs font-mono w-24 text-right">{before.toLocaleString()}{unit}</span>
      <span className="text-slate-600 text-xs">→</span>
      <span className="text-green-400 text-xs font-mono w-24">{after.toLocaleString()}{unit}</span>
      <span className={`text-xs font-bold ml-auto ${improved ? 'text-green-400' : 'text-red-400'}`}>
        {improved ? '↓' : '↑'} {pct}%
      </span>
    </div>
  );
}

export default function BeforeAfterPanel({ show }) {
  if (!show) return null;
  const { before, after } = BEFORE_AFTER;
  return (
    <div className="glass rounded-2xl p-5 border border-green-500/30 animate-slide-in-up">
      <SectionHeader title="Before vs After — Performance Impact" subtitle="AI fix validation results" icon="📊" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div>
          <h3 className="text-slate-400 text-xs uppercase tracking-wider mb-3">Metrics Comparison</h3>
          <CompareRow label="P99 Latency" before={before.latency} after={after.latency} unit="ms" />
          <CompareRow label="Error Rate" before={before.errorRate} after={after.errorRate} unit="%" />
          <CompareRow label="Throughput" before={before.throughput} after={after.throughput} unit=" rps" higherIsBetter />
          <CompareRow label="CPU Usage" before={before.cpuUsage} after={after.cpuUsage} unit="%" />
          <CompareRow label="DB Connections" before={before.dbConnections} after={after.dbConnections} unit="%" />
          <CompareRow label="Users Impacted" before={before.userImpact} after={after.userImpact} unit="" />
        </div>
        <div>
          <h3 className="text-slate-400 text-xs uppercase tracking-wider mb-3">AI-Generated Code Fix</h3>
          <div className="text-xs text-slate-400 mb-1 font-mono">{GENERATED_FIX.filename}</div>
          <div className="space-y-2">
            <div className="bg-red-950/40 border border-red-500/20 rounded-lg p-3">
              <div className="text-red-400 text-xs font-bold mb-1">BEFORE (Problematic)</div>
              <pre className="terminal-text text-red-300 text-xs overflow-x-auto whitespace-pre-wrap">{GENERATED_FIX.before}</pre>
            </div>
            <div className="bg-green-950/40 border border-green-500/20 rounded-lg p-3">
              <div className="text-green-400 text-xs font-bold mb-1">AFTER (AI Fix)</div>
              <pre className="terminal-text text-green-300 text-xs overflow-x-auto whitespace-pre-wrap">{GENERATED_FIX.after}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
