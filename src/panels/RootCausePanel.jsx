import { Badge, SectionHeader, RiskGauge } from '../components';

export function RootCausePanel({ show }) {
  if (!show) return null;
  return (
    <div className="glass rounded-2xl p-5 border border-purple-500/30 animate-slide-in-up">
      <SectionHeader title="Root Cause Analysis" subtitle="Sherlock AI — causal chain" icon="🧠" />
      <div className="space-y-3">
        {[
          { step: 1, label: 'Trigger', desc: 'Deploy #d-8821 merged at 14:32 UTC', color: 'red', icon: '🔴' },
          { step: 2, label: 'Code Change', desc: 'ORM refactor in OrderService.getItems() — eager load removed', color: 'orange', icon: '📝' },
          { step: 3, label: 'Query Explosion', desc: '1 query/request → 13 queries/request (N+1 pattern)', color: 'yellow', icon: '💥' },
          { step: 4, label: 'Pool Exhaustion', desc: 'DB connection pool (max 100) saturated in < 30s', color: 'orange', icon: '🔒' },
          { step: 5, label: 'Cascade Failure', desc: 'Order Processing timeouts → 12,400 users impacted', color: 'red', icon: '🌊' },
        ].map(item => (
          <div key={item.step} className="flex items-start gap-3">
            <div className="flex flex-col items-center">
              <span className="text-lg">{item.icon}</span>
              {item.step < 5 && <div className="w-0.5 h-4 bg-slate-600 mt-1" />}
            </div>
            <div className="flex-1 pb-1">
              <div className="flex items-center gap-2">
                <Badge color={item.color}>{item.label}</Badge>
              </div>
              <p className="text-slate-300 text-xs mt-1">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 p-3 bg-purple-500/10 border border-purple-500/30 rounded-xl">
        <div className="text-purple-300 text-xs font-bold mb-1">🎯 Confidence: 97.8%</div>
        <div className="text-slate-400 text-xs">Matched KB-006 (SQL N+1 Anti-Pattern) — 47 prior resolutions</div>
      </div>
    </div>
  );
}

export function RiskPanel({ show, riskScore = 8 }) {
  if (!show) return null;
  return (
    <div className="glass rounded-2xl p-5 border border-green-500/30 animate-slide-in-up">
      <SectionHeader title="Risk Assessment" subtitle="Guardian AI — deployment safety" icon="🛡️" />
      <div className="flex items-center gap-6">
        <RiskGauge score={riskScore} />
        <div className="flex-1 space-y-2">
          {[
            { label: 'Blast Radius', value: 'Low — single service', ok: true },
            { label: 'Rollback Plan', value: 'Auto-rollback armed', ok: true },
            { label: 'Test Coverage', value: '142/142 tests pass', ok: true },
            { label: 'Staging Validation', value: 'Passed (60s load test)', ok: true },
            { label: 'Change Complexity', value: '47 lines, 3 files', ok: true },
          ].map(item => (
            <div key={item.label} className="flex items-center justify-between text-xs">
              <span className="text-slate-400">{item.label}</span>
              <span className={item.ok ? 'text-green-400' : 'text-red-400'}>
                {item.ok ? '✓' : '✗'} {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
