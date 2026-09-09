import { StatusDot, Badge, SectionHeader } from '../components';
import { INCIDENTS } from '../mockData';

const sevColor = { critical: 'red', warning: 'yellow', info: 'blue' };
const sevBorder = { critical: 'incident-critical', warning: 'incident-warning', info: 'incident-info' };

export default function IncidentPanel({ incidentActive, onSelect, selectedId }) {
  const incidents = incidentActive
    ? INCIDENTS.map(i => i.id === 'INC-4821' ? { ...i, status: 'investigating' } : i)
    : INCIDENTS;

  return (
    <div className="glass rounded-2xl p-5 border border-slate-700/50">
      <SectionHeader title="Active Incidents" subtitle={`${incidents.filter(i => i.status !== 'resolved').length} open`} icon="🚨" />
      <div className="space-y-3">
        {incidents.map(inc => (
          <div key={inc.id}
            onClick={() => onSelect(inc.id)}
            className={`p-3 rounded-xl bg-slate-800/40 border cursor-pointer transition-all duration-200 hover:bg-slate-700/40
              ${sevBorder[inc.severity]}
              ${selectedId === inc.id ? 'ring-1 ring-blue-500/50' : ''}`}>
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-slate-400 text-xs font-mono">{inc.id}</span>
                  <Badge color={sevColor[inc.severity]}>{inc.severity.toUpperCase()}</Badge>
                  <Badge color={inc.status === 'resolved' ? 'green' : inc.status === 'investigating' ? 'orange' : 'yellow'}>
                    {inc.status}
                  </Badge>
                </div>
                <p className="text-white text-xs font-medium leading-snug">{inc.title}</p>
                <p className="text-slate-500 text-xs mt-1">{inc.impact}</p>
              </div>
              <div className="text-right shrink-0">
                <div className="text-slate-500 text-xs">{inc.time}</div>
                {inc.affectedUsers > 0 && (
                  <div className="text-orange-400 text-xs mt-1">{inc.affectedUsers.toLocaleString()} users</div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
