import { useState, useRef, useEffect, useCallback } from 'react';
import { getBotResponse } from '../chatbot';

const SUGGESTIONS = [
  'What caused the incident?',
  'Why this fix and not others?',
  'Tell me about Sherlock',
  'Compare before and after metrics',
  'What failures are predicted?',
  'How was the fix deployed?',
  'What was the MTTR?',
  'Tell me about all agents',
];

// Simple markdown-like renderer for bold, code, tables, bullets
function MsgContent({ text }) {
  const lines = text.split('\n');
  const elements = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Table detection
    if (line.includes('|') && lines[i + 1]?.includes('|---')) {
      const headers = line.split('|').filter(Boolean).map(h => h.trim());
      i += 2; // skip separator
      const rows = [];
      while (i < lines.length && lines[i].includes('|')) {
        rows.push(lines[i].split('|').filter(Boolean).map(c => c.trim()));
        i++;
      }
      elements.push(
        <div key={i} className="overflow-x-auto my-2">
          <table className="text-xs w-full border-collapse">
            <thead>
              <tr>{headers.map((h, j) => (
                <th key={j} className="border border-slate-600 px-2 py-1 bg-slate-700/50 text-slate-200 text-left">{renderInline(h)}</th>
              ))}</tr>
            </thead>
            <tbody>
              {rows.map((row, ri) => (
                <tr key={ri} className="border-b border-slate-700/30">
                  {row.map((cell, ci) => (
                    <td key={ci} className="border border-slate-700/50 px-2 py-1 text-slate-300">{renderInline(cell)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      continue;
    }

    // Code block
    if (line.startsWith('```')) {
      i++;
      const codeLines = [];
      while (i < lines.length && !lines[i].startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      i++;
      elements.push(
        <pre key={i} className="bg-black/50 border border-slate-700/50 rounded-lg p-2 my-2 text-xs text-green-300 overflow-x-auto whitespace-pre-wrap font-mono">
          {codeLines.join('\n')}
        </pre>
      );
      continue;
    }

    // Empty line
    if (!line.trim()) { elements.push(<div key={i} className="h-1" />); i++; continue; }

    // Bullet
    if (line.startsWith('• ') || line.startsWith('- ')) {
      elements.push(
        <div key={i} className="flex gap-2 text-xs text-slate-300 leading-relaxed">
          <span className="text-blue-400 shrink-0 mt-0.5">•</span>
          <span>{renderInline(line.slice(2))}</span>
        </div>
      );
      i++; continue;
    }

    // Numbered list
    if (/^\d+\.\s/.test(line)) {
      const num = line.match(/^(\d+)\./)[1];
      elements.push(
        <div key={i} className="flex gap-2 text-xs text-slate-300 leading-relaxed">
          <span className="text-blue-400 shrink-0 font-bold">{num}.</span>
          <span>{renderInline(line.replace(/^\d+\.\s/, ''))}</span>
        </div>
      );
      i++; continue;
    }

    // Heading (##)
    if (line.startsWith('## ')) {
      elements.push(<div key={i} className="text-blue-300 font-bold text-sm mt-2 mb-1">{renderInline(line.slice(3))}</div>);
      i++; continue;
    }

    // Normal line
    elements.push(
      <div key={i} className="text-xs text-slate-300 leading-relaxed">{renderInline(line)}</div>
    );
    i++;
  }

  return <div className="space-y-0.5">{elements}</div>;
}

function renderInline(text) {
  // Bold **text**, inline code `code`, emoji passthrough
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**'))
      return <strong key={i} className="text-white font-semibold">{part.slice(2, -2)}</strong>;
    if (part.startsWith('`') && part.endsWith('`'))
      return <code key={i} className="bg-slate-700 text-green-300 px-1 rounded text-xs font-mono">{part.slice(1, -1)}</code>;
    return part;
  });
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 0, role: 'bot',
      text: `Hi! I'm the **REPAIRX AI Assistant** 🤖\n\nI have full knowledge of this dashboard — incidents, root causes, AI agents, fixes, predictions, and more.\n\nAsk me anything, or pick a suggestion below!`,
      ts: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [unread, setUnread] = useState(0);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  useEffect(() => {
    if (open) { setUnread(0); inputRef.current?.focus(); }
  }, [open]);

  const send = useCallback((text) => {
    const msg = text || input.trim();
    if (!msg) return;
    setInput('');

    const userMsg = { id: Date.now(), role: 'user', text: msg, ts: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setTyping(true);

    // Simulate thinking delay proportional to response complexity
    const delay = 400 + Math.min(msg.length * 8, 800);
    setTimeout(() => {
      const response = getBotResponse(msg);
      setMessages(prev => [...prev, { id: Date.now() + 1, role: 'bot', text: response, ts: new Date() }]);
      setTyping(false);
      if (!open) setUnread(n => n + 1);
    }, delay);
  }, [input, open]);

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  };

  const fmt = (d) => d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(o => !o)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300
          bg-gradient-to-br from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 animate-pulse-glow
          ${open ? 'rotate-0 scale-95' : 'rotate-0 scale-100'}`}
        title="REPAIRX AI Assistant">
        <span className="text-2xl">{open ? '✕' : '🤖'}</span>
        {unread > 0 && !open && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center font-bold animate-bounce">
            {unread}
          </span>
        )}
      </button>

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-24px)] flex flex-col rounded-2xl shadow-2xl border border-slate-700/60 overflow-hidden animate-slide-in-up"
          style={{ height: '560px', maxHeight: 'calc(100vh - 120px)' }}>

          {/* Header */}
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 border-b border-slate-700/50 px-4 py-3 flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-lg animate-pulse-glow shrink-0">
              🤖
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-white font-bold text-sm">REPAIRX Assistant</div>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                <span className="text-green-400 text-xs">Online — Full knowledge mode</span>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-slate-400 hover:text-white transition-colors text-lg leading-none">✕</button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto scrollbar-thin bg-slate-950 p-3 space-y-3">
            {messages.map(msg => (
              <div key={msg.id} className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'} animate-fade-in`}>
                {msg.role === 'bot' && (
                  <div className="w-7 h-7 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-sm shrink-0 mt-0.5">⚡</div>
                )}
                <div className={`max-w-[85%] rounded-2xl px-3 py-2.5 ${
                  msg.role === 'user'
                    ? 'bg-blue-600 text-white rounded-tr-sm'
                    : 'bg-slate-800/80 border border-slate-700/40 rounded-tl-sm'
                }`}>
                  {msg.role === 'user'
                    ? <p className="text-xs text-white leading-relaxed">{msg.text}</p>
                    : <MsgContent text={msg.text} />
                  }
                  <div className={`text-xs mt-1 ${msg.role === 'user' ? 'text-blue-200' : 'text-slate-600'} text-right`}>
                    {fmt(msg.ts)}
                  </div>
                </div>
              </div>
            ))}

            {typing && (
              <div className="flex gap-2 animate-fade-in">
                <div className="w-7 h-7 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-sm shrink-0">⚡</div>
                <div className="bg-slate-800/80 border border-slate-700/40 rounded-2xl rounded-tl-sm px-4 py-3">
                  <div className="flex gap-1 items-center">
                    {[0, 1, 2].map(i => (
                      <div key={i} className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"
                        style={{ animationDelay: `${i * 0.15}s` }} />
                    ))}
                    <span className="text-slate-500 text-xs ml-1">Thinking...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Suggestions */}
          {messages.length <= 2 && (
            <div className="bg-slate-900/80 border-t border-slate-700/30 px-3 py-2 shrink-0">
              <div className="text-slate-500 text-xs mb-1.5">Suggested questions:</div>
              <div className="flex flex-wrap gap-1.5">
                {SUGGESTIONS.slice(0, 4).map(s => (
                  <button key={s} onClick={() => send(s)}
                    className="text-xs px-2.5 py-1 bg-slate-800 hover:bg-blue-600/30 border border-slate-700/50 hover:border-blue-500/50 text-slate-300 hover:text-blue-300 rounded-full transition-all duration-150">
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="bg-slate-900 border-t border-slate-700/50 px-3 py-3 shrink-0">
            <div className="flex gap-2 items-end">
              <textarea
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Ask about incidents, fixes, agents, predictions..."
                rows={1}
                className="flex-1 bg-slate-800 border border-slate-700/50 focus:border-blue-500/50 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 resize-none outline-none transition-colors scrollbar-thin"
                style={{ maxHeight: '80px' }}
              />
              <button
                onClick={() => send()}
                disabled={!input.trim() || typing}
                className="w-9 h-9 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:text-slate-500 text-white rounded-xl flex items-center justify-center transition-all duration-150 shrink-0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </div>
            <div className="text-slate-600 text-xs mt-1.5 text-center">Enter to send · Shift+Enter for new line</div>
          </div>
        </div>
      )}
    </>
  );
}
