function Arrow({ x1, y1, x2, y2, label, color = '#475569', dashed = false }) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  return (
    <g>
      <defs>
        <marker id={`arr-${x1}-${y1}`} markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
          <path d="M0,0 L0,6 L7,3 z" fill={color} />
        </marker>
      </defs>
      <line x1={x1} y1={y1} x2={x2} y2={y2}
        stroke={color} strokeWidth="1.5"
        strokeDasharray={dashed ? '5 3' : undefined}
        markerEnd={`url(#arr-${x1}-${y1})`} />
      {label && (
        <text x={mx} y={my - 5} textAnchor="middle" fill="#64748b" fontSize="8" fontFamily="monospace">{label}</text>
      )}
    </g>
  );
}

function Process({ x, y, r, label, sub, color }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill={color + '22'} stroke={color} strokeWidth="1.5" />
      <text x={x} y={sub ? y - 5 : y + 4} textAnchor="middle" fill="white" fontSize="9" fontWeight="bold" fontFamily="monospace">{label}</text>
      {sub && <text x={x} y={y + 9} textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="monospace">{sub}</text>}
    </g>
  );
}

function Store({ x, y, w, label, color }) {
  return (
    <g>
      <line x1={x} y1={y} x2={x + w} y2={y} stroke={color} strokeWidth="1.5" />
      <line x1={x} y1={y + 22} x2={x + w} y2={y + 22} stroke={color} strokeWidth="1.5" />
      <text x={x + w / 2} y={y + 15} textAnchor="middle" fill={color} fontSize="9" fontFamily="monospace" fontWeight="bold">{label}</text>
    </g>
  );
}

function External({ x, y, w, h, label, color }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="4" fill={color + '22'} stroke={color} strokeWidth="1.5" strokeDasharray="4 2" />
      <text x={x + w / 2} y={y + h / 2 + 4} textAnchor="middle" fill={color} fontSize="9" fontWeight="bold" fontFamily="monospace">{label}</text>
    </g>
  );
}

export default function DFDDiagram() {
  return (
    <div className="space-y-6">

      {/* Level 0 — Context Diagram */}
      <div>
        <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-3">Level 0 — Context Diagram</div>
        <svg viewBox="0 0 700 300" className="w-full" style={{ minHeight: 220 }}>
          {/* External entities */}
          <External x={10} y={110} w={110} h={50} label="PRODUCTION" color="#ef4444" />
          <External x={10} y={180} w={110} h={50} label="SERVICES" color="#ef4444" />
          <External x={580} y={80} w={110} h={50} label="ENGINEERS" color="#3b82f6" />
          <External x={580} y={150} w={110} h={50} label="DASHBOARD" color="#3b82f6" />
          <External x={580} y={220} w={110} h={50} label="DEPLOYMENT" color="#22c55e" />

          {/* Central process */}
          <Process x={350} y={150} r={80} label="REPAIRX AI" sub="Autonomous Engine" color="#a855f7" />

          {/* Arrows in */}
          <Arrow x1={120} y1={130} x2={275} y2={140} label="metrics / logs / traces" color="#ef4444" />
          <Arrow x1={120} y1={200} x2={275} y2={165} label="service telemetry" color="#ef4444" />

          {/* Arrows out */}
          <Arrow x1={425} y1={120} x2={580} y2={100} label="alerts / reports" color="#3b82f6" />
          <Arrow x1={425} y1={150} x2={580} y2={170} label="live metrics / status" color="#3b82f6" />
          <Arrow x1={425} y1={175} x2={580} y2={240} label="code fix / deployment" color="#22c55e" />

          {/* Feedback */}
          <Arrow x1={580} y1={95} x2={430} y2={130} label="override / approve" color="#64748b" dashed />
        </svg>
      </div>

      {/* Level 1 — Detailed DFD */}
      <div>
        <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-3">Level 1 — Detailed Data Flow</div>
        <svg viewBox="0 0 820 520" className="w-full" style={{ minHeight: 340 }}>

          {/* External entities */}
          <External x={0} y={200} w={90} h={40} label="SERVICES" color="#ef4444" />
          <External x={730} y={60} w={90} h={40} label="ENGINEERS" color="#3b82f6" />
          <External x={730} y={200} w={90} h={40} label="DASHBOARD" color="#3b82f6" />
          <External x={730} y={340} w={90} h={40} label="PROD ENV" color="#22c55e" />

          {/* Processes */}
          <Process x={160} y={220} r={44} label="P1" sub="Sentinel" color="#3b82f6" />
          <Process x={300} y={140} r={44} label="P2" sub="Sherlock" color="#a855f7" />
          <Process x={440} y={220} r={44} label="P3" sub="Forge" color="#eab308" />
          <Process x={580} y={140} r={44} label="P4" sub="Guardian" color="#22c55e" />
          <Process x={580} y={300} r={44} label="P5" sub="Pilot" color="#06b6d4" />
          <Process x={300} y={380} r={44} label="P6" sub="Oracle" color="#ec4899" />

          {/* Data stores */}
          <Store x={160} y={370} w={120} label="D1: INCIDENTS" color="#ef4444" />
          <Store x={430} y={460} w={130} label="D2: KNOWLEDGE BASE" color="#8b5cf6" />
          <Store x={620} y={460} w={110} label="D3: FIXES" color="#22c55e" />

          {/* Flow: Services → P1 */}
          <Arrow x1={90} y1={220} x2={116} y2={220} label="telemetry" color="#ef4444" />
          {/* P1 → Incident store */}
          <Arrow x1={160} y1={264} x2={200} y2={370} label="create incident" color="#ef4444" />
          {/* P1 → P2 */}
          <Arrow x1={200} y1={200} x2={256} y2={160} label="anomaly context" color="#3b82f6" />
          {/* P2 → P3 */}
          <Arrow x1={344} y1={180} x2={396} y2={200} label="root cause" color="#a855f7" />
          {/* P2 → KB */}
          <Arrow x1={300} y1={184} x2={460} y2={460} label="KB lookup" color="#a855f7" dashed />
          {/* P3 → P4 */}
          <Arrow x1={484} y1={200} x2={536} y2={160} label="fix package" color="#eab308" />
          {/* P3 → D3 */}
          <Arrow x1={480} y1={240} x2={650} y2={460} label="store fix" color="#eab308" dashed />
          {/* P4 → P5 */}
          <Arrow x1={580} y1={184} x2={580} y2={256} label="approved fix" color="#22c55e" />
          {/* P4 → Engineers */}
          <Arrow x1={624} y1={140} x2={730} y2={80} label="risk report" color="#22c55e" />
          {/* P5 → PROD */}
          <Arrow x1={624} y1={320} x2={730} y2={355} label="deploy canary" color="#06b6d4" />
          {/* P5 → Dashboard */}
          <Arrow x1={624} y1={290} x2={730} y2={220} label="deploy status" color="#06b6d4" />
          {/* P6 → Engineers */}
          <Arrow x1={340} y1={360} x2={730} y2={80} label="predictive alert" color="#ec4899" dashed />
          {/* Incident store → P6 */}
          <Arrow x1={220} y1={385} x2={256} y2={390} label="resolved incidents" color="#8b5cf6" dashed />
          {/* KB → P6 */}
          <Arrow x1={460} y1={460} x2={344} y2={410} label="patterns" color="#8b5cf6" dashed />
          {/* P1 → Dashboard */}
          <Arrow x1={200} y1={210} x2={730} y2={215} label="live metrics" color="#64748b" dashed />

          {/* Legend */}
          <g transform="translate(0,500)">
            <line x1="0" y1="8" x2="30" y2="8" stroke="#475569" strokeWidth="1.5" />
            <text x="34" y="12" fill="#64748b" fontSize="8" fontFamily="monospace">Data flow</text>
            <line x1="100" y1="8" x2="130" y2="8" stroke="#475569" strokeWidth="1.5" strokeDasharray="5 3" />
            <text x="134" y="12" fill="#64748b" fontSize="8" fontFamily="monospace">Async / read</text>
          </g>
        </svg>
      </div>

    </div>
  );
}
