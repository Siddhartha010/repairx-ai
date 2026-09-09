import { useEffect, useRef } from 'react';

export function StatusDot({ status }) {
  const colors = {
    healthy: 'bg-green-400',
    degraded: 'bg-yellow-400',
    critical: 'bg-red-400',
    active: 'bg-blue-400',
    standby: 'bg-slate-400',
    investigating: 'bg-orange-400',
    monitoring: 'bg-yellow-400',
    resolved: 'bg-green-400',
  };
  return (
    <span className="relative inline-flex">
      <span className={`status-dot ${colors[status] || 'bg-slate-400'}`} />
      {(status === 'critical' || status === 'active') && (
        <span className={`absolute inset-0 status-dot ${colors[status]} animate-ping opacity-75`} />
      )}
    </span>
  );
}

export function MetricCard({ label, value, unit, trend, color = 'blue', icon }) {
  const colorMap = {
    blue: 'text-blue-400 border-blue-500/30 bg-blue-500/5',
    green: 'text-green-400 border-green-500/30 bg-green-500/5',
    red: 'text-red-400 border-red-500/30 bg-red-500/5',
    yellow: 'text-yellow-400 border-yellow-500/30 bg-yellow-500/5',
    purple: 'text-purple-400 border-purple-500/30 bg-purple-500/5',
    cyan: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/5',
  };
  return (
    <div className={`glass rounded-xl p-4 border ${colorMap[color]} animate-slide-in-up`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-slate-400 text-xs font-medium uppercase tracking-wider">{label}</span>
        {icon && <span className="text-lg">{icon}</span>}
      </div>
      <div className={`text-2xl font-bold ${colorMap[color].split(' ')[0]}`}>
        {value}<span className="text-sm font-normal text-slate-400 ml-1">{unit}</span>
      </div>
      {trend && <div className="text-xs text-slate-500 mt-1">{trend}</div>}
    </div>
  );
}

export function Sparkline({ data, color = '#3b82f6', height = 40 }) {
  if (!data || data.length < 2) return null;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 120, h = height;
  const points = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * h}`).join(' ');
  return (
    <svg width={w} height={h} className="overflow-visible">
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points={`0,${h} ${points} ${w},${h}`} fill={color} fillOpacity="0.1" stroke="none" />
    </svg>
  );
}

export function ProgressBar({ value, max = 100, color = 'blue', animated = false }) {
  const pct = Math.min((value / max) * 100, 100);
  const colorMap = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    red: 'bg-red-500',
    yellow: 'bg-yellow-500',
    purple: 'bg-purple-500',
    cyan: 'bg-cyan-500',
    orange: 'bg-orange-500',
  };
  return (
    <div className="metric-bar w-full">
      <div
        className={`metric-bar-fill ${colorMap[color]} ${animated ? 'animate-pulse' : ''}`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

export function Badge({ children, color = 'blue' }) {
  const colorMap = {
    blue: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    green: 'bg-green-500/20 text-green-300 border-green-500/30',
    red: 'bg-red-500/20 text-red-300 border-red-500/30',
    yellow: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    purple: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    cyan: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    orange: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
    pink: 'bg-pink-500/20 text-pink-300 border-pink-500/30',
    slate: 'bg-slate-500/20 text-slate-300 border-slate-500/30',
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${colorMap[color]}`}>
      {children}
    </span>
  );
}

export function SectionHeader({ title, subtitle, icon }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      {icon && <span className="text-xl">{icon}</span>}
      <div>
        <h2 className="text-white font-semibold text-sm uppercase tracking-wider">{title}</h2>
        {subtitle && <p className="text-slate-500 text-xs mt-0.5">{subtitle}</p>}
      </div>
    </div>
  );
}

export function TerminalLog({ lines, maxHeight = '160px' }) {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) ref.current.scrollTop = ref.current.scrollHeight;
  }, [lines]);
  return (
    <div
      ref={ref}
      className="terminal-text bg-black/60 rounded-lg p-3 overflow-y-auto scrollbar-thin border border-slate-700/50"
      style={{ maxHeight }}
    >
      {lines.map((line, i) => (
        <div key={i} className="text-green-400 animate-fade-in" style={{ animationDelay: `${i * 0.05}s` }}>
          {line}
        </div>
      ))}
      <span className="text-green-400 animate-pulse">█</span>
    </div>
  );
}

export function RiskGauge({ score }) {
  const color = score < 30 ? '#22c55e' : score < 60 ? '#eab308' : '#ef4444';
  const label = score < 30 ? 'LOW' : score < 60 ? 'MEDIUM' : 'HIGH';
  const angle = (score / 100) * 180 - 90;
  return (
    <div className="flex flex-col items-center">
      <svg width="120" height="70" viewBox="0 0 120 70">
        <path d="M 10 65 A 50 50 0 0 1 110 65" fill="none" stroke="#1e293b" strokeWidth="10" strokeLinecap="round" />
        <path d="M 10 65 A 50 50 0 0 1 110 65" fill="none" stroke={color} strokeWidth="10" strokeLinecap="round"
          strokeDasharray={`${(score / 100) * 157} 157`} opacity="0.8" />
        <line
          x1="60" y1="65"
          x2={60 + 35 * Math.cos((angle * Math.PI) / 180)}
          y2={65 + 35 * Math.sin((angle * Math.PI) / 180)}
          stroke="white" strokeWidth="2" strokeLinecap="round"
        />
        <circle cx="60" cy="65" r="4" fill="white" />
        <text x="60" y="58" textAnchor="middle" fill={color} fontSize="14" fontWeight="bold">{score}</text>
      </svg>
      <span className="text-xs font-bold mt-1" style={{ color }}>{label} RISK</span>
    </div>
  );
}

export function MiniChart({ data, width = 200, height = 60, color = '#3b82f6', label }) {
  if (!data || data.length < 2) return null;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * width},${height - ((v - min) / range) * (height - 4) - 2}`).join(' ');
  return (
    <div>
      {label && <div className="text-xs text-slate-500 mb-1">{label}</div>}
      <svg width={width} height={height} className="overflow-visible">
        <defs>
          <linearGradient id={`grad-${label}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <polyline points={`0,${height} ${pts} ${width},${height}`} fill={`url(#grad-${label})`} stroke="none" />
        <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}
