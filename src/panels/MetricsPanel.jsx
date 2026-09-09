import { MetricCard, MiniChart, SectionHeader } from '../components';
import { METRICS_HISTORY } from '../mockData';

export default function MetricsPanel({ incidentActive, recovered }) {
  const cpu = incidentActive && !recovered ? 94 : recovered ? 23 : 38;
  const mem = incidentActive && !recovered ? 87 : recovered ? 41 : 52;
  const latency = incidentActive && !recovered ? 8200 : recovered ? 38 : 82;
  const errors = incidentActive && !recovered ? 18.4 : recovered ? 0.01 : 0.08;

  const cpuData = METRICS_HISTORY.map(m => incidentActive ? m.cpu : m.cpu * 0.5);
  const latData = METRICS_HISTORY.map(m => incidentActive ? m.latency : m.latency * 0.4);
  const errData = METRICS_HISTORY.map(m => incidentActive ? m.errors : m.errors * 0.3);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <MetricCard label="P99 Latency" value={latency.toLocaleString()} unit="ms"
          color={latency > 1000 ? 'red' : latency > 200 ? 'yellow' : 'green'}
          trend={incidentActive && !recovered ? '↑ 182x above baseline' : recovered ? '↓ 99.5% improvement' : 'Normal range'}
          icon="⏱️" />
        <MetricCard label="Error Rate" value={errors} unit="%"
          color={errors > 5 ? 'red' : errors > 1 ? 'yellow' : 'green'}
          trend={incidentActive && !recovered ? '↑ Critical threshold' : recovered ? '↓ Resolved' : 'Nominal'}
          icon="❌" />
        <MetricCard label="CPU Usage" value={cpu} unit="%"
          color={cpu > 80 ? 'red' : cpu > 60 ? 'yellow' : 'blue'}
          trend={`${incidentActive && !recovered ? 'Saturated' : 'Normal'}`}
          icon="💻" />
        <MetricCard label="Memory" value={mem} unit="%"
          color={mem > 80 ? 'red' : mem > 60 ? 'yellow' : 'blue'}
          trend="Heap utilization"
          icon="🧠" />
      </div>

      <div className="glass rounded-2xl p-5 border border-slate-700/50">
        <SectionHeader title="Live System Metrics" subtitle="30-second rolling window" icon="📈" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <MiniChart data={cpuData} color={cpu > 80 ? '#ef4444' : '#3b82f6'} label="CPU %" width={180} height={60} />
          <MiniChart data={latData} color={latency > 1000 ? '#ef4444' : '#22c55e'} label="Latency (ms)" width={180} height={60} />
          <MiniChart data={errData} color={errors > 1 ? '#ef4444' : '#a855f7'} label="Error Rate %" width={180} height={60} />
        </div>
      </div>
    </div>
  );
}
