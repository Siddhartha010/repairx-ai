export default function ERDiagram() {
  const entities = [
    { id: 'incident', x: 320, y: 20, w: 160, label: 'INCIDENT', color: '#ef4444', fields: ['PK incident_id','severity','title','status','created_at','resolved_at','mttr_minutes'] },
    { id: 'service', x: 20, y: 20, w: 150, label: 'SERVICE', color: '#3b82f6', fields: ['PK service_id','name','region','status','uptime_pct'] },
    { id: 'metric', x: 20, y: 260, w: 150, label: 'METRIC', color: '#06b6d4', fields: ['PK metric_id','FK service_id','latency_p99','error_rate','cpu_pct','mem_pct','recorded_at'] },
    { id: 'agent', x: 620, y: 20, w: 150, label: 'AI_AGENT', color: '#a855f7', fields: ['PK agent_id','name','role','accuracy_pct','tasks_resolved','status'] },
    { id: 'rca', x: 320, y: 260, w: 160, label: 'ROOT_CAUSE', color: '#f59e0b', fields: ['PK rca_id','FK incident_id','FK agent_id','description','confidence_pct','deploy_ref'] },
    { id: 'fix', x: 620, y: 260, w: 150, label: 'FIX', color: '#22c55e', fields: ['PK fix_id','FK rca_id','FK agent_id','filename','lines_changed','tests_passed','risk_score'] },
    { id: 'deployment', x: 320, y: 500, w: 160, label: 'DEPLOYMENT', color: '#06b6d4', fields: ['PK deploy_id','FK fix_id','FK agent_id','version','strategy','status','canary_pct'] },
    { id: 'kb', x: 20, y: 500, w: 150, label: 'KNOWLEDGE_BASE', color: '#8b5cf6', fields: ['PK kb_id','FK rca_id','title','category','confidence_pct','use_count'] },
    { id: 'prediction', x: 620, y: 500, w: 150, label: 'PREDICTION', color: '#ec4899', fields: ['PK pred_id','FK agent_id','FK service_id','risk_pct','issue','eta','action','status'] },
  ];

  const relations = [
    { from: [400,20], to: [170,50], label: 'affects', fromAnchor: 'left', toAnchor: 'right' },
    { from: [95,20], to: [95,260], label: 'has', fromAnchor: 'bottom', toAnchor: 'top' },
    { from: [400,260], to: [320,80], label: 'belongs to', fromAnchor: 'top', toAnchor: 'bottom' },
    { from: [400,260], to: [620,80], label: 'handled by', fromAnchor: 'right', toAnchor: 'left' },
    { from: [620,260], to: [480,260], label: 'generated from', fromAnchor: 'left', toAnchor: 'right' },
    { from: [620,260], to: [695,260], label: '', fromAnchor: 'top', toAnchor: 'bottom' },
    { from: [400,500], to: [480,320], label: 'deploys', fromAnchor: 'top', toAnchor: 'bottom' },
    { from: [170,500], to: [320,320], label: 'learned from', fromAnchor: 'right', toAnchor: 'left' },
    { from: [695,500], to: [695,320], label: 'queued by', fromAnchor: 'top', toAnchor: 'bottom' },
    { from: [695,500], to: [170,50], label: 'monitors', fromAnchor: 'left', toAnchor: 'right' },
  ];

  return (
    <svg viewBox="0 0 820 680" className="w-full" style={{ minHeight: 420 }}>
      <defs>
        <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill="#475569" />
        </marker>
      </defs>

      {/* relation lines */}
      {relations.map((r, i) => (
        <line key={i}
          x1={r.from[0]} y1={r.from[1]} x2={r.to[0]} y2={r.to[1]}
          stroke="#334155" strokeWidth="1.5" strokeDasharray="4 3"
          markerEnd="url(#arrow)" />
      ))}

      {/* entities */}
      {entities.map(e => (
        <g key={e.id}>
          <rect x={e.x} y={e.y} width={e.w} height={22 + e.fields.length * 16}
            rx="6" fill="#0f172a" stroke={e.color} strokeWidth="1.5" />
          {/* header */}
          <rect x={e.x} y={e.y} width={e.w} height={22} rx="6" fill={e.color + '33'} />
          <rect x={e.x} y={e.y + 10} width={e.w} height={12} fill={e.color + '33'} />
          <text x={e.x + e.w / 2} y={e.y + 15} textAnchor="middle"
            fill={e.color} fontSize="10" fontWeight="bold" fontFamily="monospace">{e.label}</text>
          {/* fields */}
          {e.fields.map((f, fi) => (
            <g key={fi}>
              <text x={e.x + 8} y={e.y + 34 + fi * 16}
                fill={f.startsWith('PK') ? '#fbbf24' : f.startsWith('FK') ? '#60a5fa' : '#94a3b8'}
                fontSize="9" fontFamily="monospace">{f}</text>
              {fi < e.fields.length - 1 && (
                <line x1={e.x + 4} y1={e.y + 38 + fi * 16} x2={e.x + e.w - 4} y2={e.y + 38 + fi * 16}
                  stroke="#1e293b" strokeWidth="0.5" />
              )}
            </g>
          ))}
        </g>
      ))}

      {/* legend */}
      <g transform="translate(10,640)">
        <rect x="0" y="0" width="300" height="30" rx="4" fill="#0f172a" stroke="#1e293b" strokeWidth="1" />
        <circle cx="16" cy="15" r="4" fill="#fbbf24" />
        <text x="24" y="19" fill="#94a3b8" fontSize="9" fontFamily="monospace">PK = Primary Key</text>
        <circle cx="110" cy="15" r="4" fill="#60a5fa" />
        <text x="118" y="19" fill="#94a3b8" fontSize="9" fontFamily="monospace">FK = Foreign Key</text>
        <line x1="210" y1="15" x2="230" y2="15" stroke="#334155" strokeWidth="1.5" strokeDasharray="4 3" />
        <text x="234" y="19" fill="#94a3b8" fontSize="9" fontFamily="monospace">Relation</text>
      </g>
    </svg>
  );
}
