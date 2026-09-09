import { StatusDot, Badge, ProgressBar, SectionHeader } from '../components';
import { SERVICES } from '../mockData';

const statusColor = { healthy: 'green', degraded: 'yellow', critical: 'red' };

export default function ServicePanel({ incidentActive }) {
  const services = incidentActive
    ? SERVICES.map(s => s.id === 4 ? { ...s, status: 'critical', latency: 8200, errors: 18.4 }
        : s.id === 3 ? { ...s, status: 'degraded', latency: 2840, errors: 4.8 } : s)
    : SERVICES;

  return (
    <div className="glass rounded-2xl p-5 border border-slate-700/50">
      <SectionHeader title="Service Health Monitor" subtitle="Real-time service telemetry" icon="🖥️" />
      <div className="space-y-2">
        {services.map(svc => (
          <div key={svc.id}
            className={`flex items-center gap-3 p-3 rounded-xl bg-slate-800/40 border transition-all duration-500
              ${svc.status === 'critical' ? 'border-red-500/40 bg-red-500/5 animate-pulse-glow' :
                svc.status === 'degraded' ? 'border-yellow-500/30 bg-yellow-500/5' : 'border-slate-700/30'}`}>
            <StatusDot status={svc.status} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-white text-xs font-medium truncate">{svc.name}</span>
                <Badge color={statusColor[svc.status]}>{svc.status.toUpperCase()}</Badge>
              </div>
              <div className="flex items-center gap-4 mt-1">
                <span className={`text-xs ${svc.latency > 1000 ? 'text-red-400' : svc.latency > 200 ? 'text-yellow-400' : 'text-slate-400'}`}>
                  {svc.latency}ms
                </span>
                <span className={`text-xs ${svc.errors > 1 ? 'text-red-400' : 'text-slate-400'}`}>
                  {svc.errors}% err
                </span>
                <span className="text-xs text-slate-500">{svc.uptime}% up</span>
                <span className="text-xs text-slate-600">{svc.region}</span>
              </div>
              <div className="mt-1.5">
                <ProgressBar value={svc.errors} max={20}
                  color={svc.errors > 5 ? 'red' : svc.errors > 1 ? 'yellow' : 'green'} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
