import {
  SERVICES, INCIDENTS, AGENTS, KNOWLEDGE_BASE,
  PREDICTIONS, BEFORE_AFTER, GENERATED_FIX, DEMO_FLOW_STEPS
} from './mockData';

const normalize = (s) => s.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim();

const has = (text, ...terms) => terms.some(t => normalize(text).includes(normalize(t)));

// ─── Response builders ────────────────────────────────────────────────────────

function incidentSummary() {
  return `There are currently **3 incidents** in the system:

🔴 **INC-4821 — CRITICAL** (Active)
• Service: Inventory DB
• Problem: Connection pool exhaustion — 100% saturated
• Impact: 18.4% error rate, 8,200ms P99 latency
• Users affected: 12,400
• Triggered by: Deploy #d-8821 (ORM N+1 query regression)

🟡 **INC-4820 — WARNING** (Monitoring)
• Service: ML Inference API
• Problem: Elevated latency — 1,200ms avg (baseline: 180ms)
• Users affected: 4,100

🟡 **INC-4819 — WARNING** (Resolved)
• Service: Order Processing
• Problem: Timeout spike — 4.8% timeout rate on checkout
• Users affected: 890

The most critical is **INC-4821**, which triggered the full AI autonomous resolution demo.`;
}

function rootCauseExplain() {
  return `**Root Cause of INC-4821 — Explained in Detail**

The root cause was a **SQL N+1 Query Anti-Pattern** introduced in deploy #d-8821 at 14:32 UTC.

**What happened step by step:**
1. A developer refactored \`OrderService.getItems()\` using an ORM change that removed eager loading
2. The new code loops through each order item and fires a **separate DB query per item**
3. Average order has 12 items → **13 queries per request** (was 1)
4. At 8,900 requests/min → **115,700 DB queries/min** (was 8,900)
5. The DB connection pool has a max of 100 connections — it **saturated in under 30 seconds**
6. All new requests started timing out, cascading to Order Processing service
7. **12,400 users** were impacted across 3 services

**Why this wasn't caught earlier:**
• The N+1 pattern only becomes catastrophic at scale — it passed unit tests
• Staging had lower traffic, so the pool exhaustion didn't manifest
• No query-count regression test existed for this code path

**Sherlock AI confidence:** 97.8% — matched KB-006 (SQL N+1 Anti-Pattern, 47 prior resolutions)`;
}

function fixExplain() {
  return `**Why This Fix? — AI Reasoning by Forge Agent**

The fix replaces the N+1 loop with a **single JOIN query using eager loading**.

**The problematic code:**
\`\`\`java
// ❌ BEFORE — fires N queries (one per item)
for (Long itemId : order.getItemIds()) {
  items.add(itemRepo.findById(itemId));
}
\`\`\`

**The AI-generated fix:**
\`\`\`java
// ✅ AFTER — single JOIN fetches everything
return orderRepo.findByIdWithItems(orderId).getItems();
\`\`\`

**Why this solution and not others?**

| Alternative | Why Rejected |
|---|---|
| Increase connection pool size | Treats symptom, not cause. Would fail again at higher load |
| Add caching layer | Adds complexity, stale data risk, doesn't fix the query pattern |
| Rate limiting | Degrades user experience, doesn't fix the underlying bug |
| Rollback deploy | Valid short-term, but loses the feature. Fix is better |
| **Eager-load JOIN (chosen)** | ✅ Fixes root cause, 1 query regardless of item count |

**Results after fix:**
• Latency: 8,200ms → **38ms** (↓ 99.5%)
• Error rate: 18.4% → **0.01%** (↓ 99.9%)
• DB connections: 100% → **11%** utilization
• Throughput: 680 → **9,200 rps** (↑ 1,253%)`;
}

function agentExplain(name) {
  const agent = AGENTS.find(a => normalize(a.name) === normalize(name));
  if (!agent) {
    return `I don't have a specific agent named "${name}". The available agents are: ${AGENTS.map(a => a.name).join(', ')}.`;
  }
  const details = {
    Sentinel: `**Sentinel** is the Anomaly Detector agent.\n\nIt continuously monitors all 8 services using statistical baselines and ML anomaly detection. When INC-4821 occurred, Sentinel detected the error rate spike from 0.02% to 18.4% in under 620ms and automatically created the incident ticket.\n\n• Accuracy: 99.2%\n• Tasks resolved: 847\n• Detection latency: < 1 second\n• Uses: time-series anomaly detection, threshold alerting, correlation scoring`,
    Sherlock: `**Sherlock** is the Root Cause Analyst agent.\n\nIt performs automated investigation by correlating deployment history, log patterns, query execution plans, and the knowledge base. For INC-4821, it scanned 847 signals, found the deploy correlation, and identified the N+1 pattern with 97.8% confidence in under 3.5 minutes.\n\n• Accuracy: 97.8%\n• Tasks resolved: 312\n• Uses: causal inference, log correlation, KB matching, deployment diff analysis`,
    Forge: `**Forge** is the Fix Generator agent.\n\nIt generates production-ready code fixes based on the root cause identified by Sherlock. For INC-4821, it replaced the N+1 ORM loop with an eager-loading JOIN query, modified 3 files, changed 47 lines, and ran 142 unit tests — all passing.\n\n• Accuracy: 96.4%\n• Tasks resolved: 289\n• Uses: AST analysis, code generation, test execution, query plan optimization`,
    Guardian: `**Guardian** is the Risk Assessor agent.\n\nIt validates fixes in a staging environment before production deployment. For INC-4821, it ran a 60-second load test at 10,000 req/min, confirmed P99 latency of 38ms, error rate of 0.01%, and assigned a risk score of 8/100 (LOW).\n\n• Accuracy: 98.9%\n• Tasks resolved: 289\n• Uses: load testing, regression testing, risk scoring, blast radius analysis`,
    Pilot: `**Pilot** is the Deployment Manager agent.\n\nIt executes safe canary deployments with automatic rollback triggers. For INC-4821, it deployed v2.4.1-hotfix progressively: 5% → 25% → 75% → 100% traffic, monitoring metrics at each stage.\n\n• Accuracy: 99.7%\n• Tasks resolved: 156\n• Uses: canary deployment, traffic shifting, rollback automation, deployment gating`,
    Oracle: `**Oracle** is the Predictive Engine agent.\n\nIt learns from resolved incidents and scans all services for similar failure signatures before they occur. After INC-4821, it detected that Auth Service JWT cache is at 72% capacity and predicted failure in ~2.4 hours without intervention.\n\n• Accuracy: 94.1%\n• Tasks resolved: 1,204\n• Uses: time-series forecasting, pattern matching, pre-emptive alerting, capacity planning`,
  };
  return details[agent.name] || `Agent ${agent.name}: ${agent.role}, accuracy ${agent.accuracy}%, ${agent.tasks} tasks resolved.`;
}

function serviceStatus(name) {
  const svc = SERVICES.find(s => normalize(s.name).includes(normalize(name)));
  if (!svc) {
    return `I couldn't find a service matching "${name}". Available services: ${SERVICES.map(s => s.name).join(', ')}.`;
  }
  const statusEmoji = { healthy: '🟢', degraded: '🟡', critical: '🔴' };
  return `**${svc.name}** — ${statusEmoji[svc.status]} ${svc.status.toUpperCase()}

• Latency (P99): ${svc.latency}ms ${svc.latency > 1000 ? '⚠️ Elevated' : '✅ Normal'}
• Error Rate: ${svc.errors}% ${svc.errors > 1 ? '⚠️ Above threshold' : '✅ Normal'}
• Uptime: ${svc.uptime}%
• Requests/min: ${svc.requests.toLocaleString()}
• Region: ${svc.region}
${svc.status === 'critical' ? '\n⚠️ This service is currently experiencing a critical incident (INC-4821). AI agents are actively resolving it.' : ''}
${svc.status === 'degraded' ? '\n⚠️ This service is degraded — elevated latency detected. Being monitored.' : ''}`;
}

function performanceComparison() {
  const { before, after } = BEFORE_AFTER;
  return `**Before vs After — AI Fix Performance Impact**

| Metric | Before (Broken) | After (Fixed) | Improvement |
|---|---|---|---|
| P99 Latency | ${before.latency}ms | ${after.latency}ms | ↓ 99.5% |
| Error Rate | ${before.errorRate}% | ${after.errorRate}% | ↓ 99.9% |
| Throughput | ${before.throughput} rps | ${after.throughput} rps | ↑ 1,253% |
| CPU Usage | ${before.cpuUsage}% | ${after.cpuUsage}% | ↓ 75.5% |
| DB Connections | ${before.dbConnections}% | ${after.dbConnections}% | ↓ 89% |
| Users Impacted | ${before.userImpact.toLocaleString()} | ${after.userImpact} | ✅ Fully resolved |

The fix reduced database query count from **13 queries/request to 1**, which is the single change responsible for all these improvements. The connection pool dropped from 100% saturation to just 11% utilization.`;
}

function predictionsInfo() {
  return `**Oracle AI — Predictive Failure Alerts**

Oracle detected **3 upcoming risks** after analyzing post-incident patterns:

🔴 **PRD-01 — HIGH RISK (72%)**
• Service: Auth Service
• Issue: JWT token cache approaching capacity
• Predicted failure in: ~2.4 hours
• Recommended action: Pre-scale cache cluster
• Status: Awaiting human approval

🟡 **PRD-02 — MEDIUM RISK (45%)**
• Service: Payment Gateway
• Issue: TLS certificate expiry approaching
• Predicted failure in: ~6 days
• Recommended action: Auto-renew TLS certificate

🔵 **PRD-03 — LOW RISK (38%)**
• Service: Analytics Engine
• Issue: Disk I/O saturation trend detected
• Predicted failure in: ~18 hours
• Recommended action: Migrate to gp3 EBS volumes

Oracle learned the JWT cache pattern directly from INC-4821's telemetry — this is the self-learning loop that prevents future failures.`;
}

function knowledgeBaseInfo() {
  return `**AI Knowledge Base — ${KNOWLEDGE_BASE.length} Resolution Patterns**

${KNOWLEDGE_BASE.map(kb =>
  `📘 **${kb.id}** — ${kb.title}\n   Category: ${kb.category} | Confidence: ${kb.confidence}% | Used ${kb.uses} times | Avg resolution: ${kb.resolution}`
).join('\n\n')}

The knowledge base is continuously updated after each resolved incident. INC-4821 reinforced **KB-006** (SQL N+1 Anti-Pattern) and added the ORM eager-load regression signature as a new detection pattern.`;
}

function deploymentInfo() {
  return `**Deployment Strategy — Canary Rollout by Pilot Agent**

Pilot used a **progressive canary deployment** for the hotfix (v2.4.1-hotfix):

1. **5% canary** — Metrics monitored for 30 seconds ✅
2. **25% traffic** — Latency and error rate confirmed nominal ✅
3. **75% traffic** — No regressions detected ✅
4. **100% rollout** — Full deployment complete ✅

**Safety mechanisms:**
• Auto-rollback trigger armed: if error rate > 1%, instant rollback
• Each stage required metrics to be nominal before proceeding
• Total deployment time: ~2 minutes
• Zero downtime — users experienced seamless transition

**Why canary and not blue-green or rolling?**
Canary was chosen because it allows real traffic validation at each stage with minimal blast radius if something goes wrong. Blue-green would require double the infrastructure cost. Rolling updates risk partial degradation across all instances simultaneously.`;
}

function mttrInfo() {
  return `**MTTR (Mean Time To Resolve) — INC-4821**

Total resolution time: **11 minutes** (fully autonomous)

| Phase | Agent | Duration |
|---|---|---|
| Incident Detected | Sentinel | ~1 sec |
| AI Investigation | Sherlock | ~3.5 min |
| Root Cause Confirmed | Sherlock | ~30 sec |
| Fix Generated | Forge | ~1.5 min |
| Fix Validated | Guardian | ~2 min |
| Deployment | Pilot | ~2 min |
| System Recovered | Sentinel | ~30 sec |
| Prediction Generated | Oracle | ~1.5 min |

**Industry comparison:**
• Average human MTTR for this type of incident: 2–4 hours
• REPAIRX AI MTTR: **11 minutes**
• Improvement: **~92% faster**

Zero human intervention was required from detection to resolution.`;
}

function riskInfo() {
  return `**Risk Assessment — Guardian Agent Analysis**

For the INC-4821 fix, Guardian assigned a risk score of **8/100 (LOW)**.

**Risk factors evaluated:**

✅ Blast Radius: LOW — only OrderService affected
✅ Rollback Plan: Auto-rollback armed and tested
✅ Test Coverage: 142/142 unit + integration tests passed
✅ Staging Validation: 60-second load test at 10,000 req/min passed
✅ Change Complexity: Small — 47 lines across 3 files
✅ P99 Latency in staging: 38ms (target < 100ms)
✅ Error rate in staging: 0.01% (target < 0.1%)
✅ DB connection pool in staging: 12% (target < 60%)

**What would increase the risk score?**
• Changes to authentication or payment flows (+30 points)
• No staging validation (+25 points)
• Test failures (+40 points)
• High change complexity > 500 lines (+15 points)
• No rollback plan (+20 points)`;
}

function helpMessage() {
  return `**Hi! I'm REPAIRX AI Assistant** 👋

I have full knowledge of everything in this dashboard. Here's what you can ask me:

**🚨 Incidents**
• "What incidents are active?"
• "Tell me about INC-4821"
• "How many users were affected?"

**🧠 Root Cause**
• "What caused the incident?"
• "Explain the N+1 problem"
• "Why did the DB connection pool exhaust?"

**⚡ Fix & Code**
• "What fix was generated?"
• "Why this fix and not others?"
• "Show me the code change"

**📊 Performance**
• "Compare before and after metrics"
• "How much did latency improve?"

**🤖 AI Agents**
• "Tell me about Sherlock"
• "What does Sentinel do?"
• "How does Forge work?"

**🖥️ Services**
• "What's the status of Inventory DB?"
• "Is Payment Gateway healthy?"

**🔮 Predictions**
• "What failures are predicted?"
• "Tell me about predictive alerts"

**🚀 Deployment**
• "How was the fix deployed?"
• "What is canary deployment?"

**⏱️ MTTR & Risk**
• "What was the MTTR?"
• "What is the risk score?"

Just ask naturally — I understand context!`;
}

// ─── Main response engine ─────────────────────────────────────────────────────

export function getBotResponse(input) {
  const t = input.trim();
  if (!t) return "Please type a question — I'm here to help!";

  // Greetings
  if (has(t, 'hello', 'hi', 'hey', 'howdy', 'greetings', 'sup', 'yo'))
    return `Hey there! 👋 I'm the REPAIRX AI assistant. I know everything about this dashboard — incidents, root causes, fixes, agents, predictions, and more.\n\nType **"help"** to see what you can ask, or just ask naturally!`;

  if (has(t, 'help', 'what can you do', 'what can i ask', 'commands', 'options', 'menu'))
    return helpMessage();

  // MTTR
  if (has(t, 'mttr', 'mean time', 'how long', 'time to resolve', 'resolution time', 'how fast', 'how quick'))
    return mttrInfo();

  // Risk
  if (has(t, 'risk', 'risk score', 'risk assessment', 'safe', 'safety', 'guardian'))
    return riskInfo();

  // Deployment
  if (has(t, 'deploy', 'deployment', 'canary', 'rollout', 'pilot', 'release', 'blue green', 'rolling update'))
    return deploymentInfo();

  // Predictions
  if (has(t, 'predict', 'prediction', 'future', 'oracle', 'prevent', 'upcoming', 'prd-01', 'prd-02', 'prd-03', 'jwt', 'certificate', 'disk io'))
    return predictionsInfo();

  // Knowledge base
  if (has(t, 'knowledge', 'kb-', 'knowledge base', 'pattern', 'learned', 'library'))
    return knowledgeBaseInfo();

  // Performance comparison
  if (has(t, 'before', 'after', 'comparison', 'compare', 'improvement', 'performance', 'metrics', 'throughput', 'latency improve', 'error rate improve'))
    return performanceComparison();

  // Fix explanation
  if (has(t, 'why this fix', 'why not', 'alternative', 'other solution', 'other fix', 'why join', 'why eager', 'why not cache', 'why not rollback', 'why not increase'))
    return fixExplain();

  if (has(t, 'fix', 'solution', 'code', 'generated', 'forge', 'patch', 'hotfix', 'orderservice', 'java', 'query fix', 'sql fix'))
    return fixExplain();

  // Root cause
  if (has(t, 'root cause', 'why did', 'what caused', 'cause', 'n+1', 'n plus 1', 'connection pool', 'pool exhaust', 'orm', 'query pattern', 'why fail', 'why broke', 'what happened'))
    return rootCauseExplain();

  // Specific agents
  for (const agent of AGENTS) {
    if (has(t, agent.name.toLowerCase())) return agentExplain(agent.name);
  }
  if (has(t, 'agent', 'agents', 'all agents', 'list agents', 'ai agent')) {
    return `**REPAIRX AI has 6 autonomous agents:**\n\n${AGENTS.map(a =>
      `${a.icon} **${a.name}** — ${a.role}\n   Accuracy: ${a.accuracy}% | Tasks: ${a.tasks.toLocaleString()} | Status: ${a.status}`
    ).join('\n\n')}\n\nAsk me about any specific agent for full details!`;
  }

  // Specific services
  for (const svc of SERVICES) {
    if (has(t, svc.name.toLowerCase())) return serviceStatus(svc.name);
  }
  if (has(t, 'service', 'services', 'all services', 'list services', 'health')) {
    const statusEmoji = { healthy: '🟢', degraded: '🟡', critical: '🔴' };
    return `**All 8 Services — Current Status:**\n\n${SERVICES.map(s =>
      `${statusEmoji[s.status]} **${s.name}** — ${s.status.toUpperCase()} | ${s.latency}ms | ${s.errors}% errors | ${s.uptime}% uptime`
    ).join('\n')}\n\nAsk me about any specific service for full details!`;
  }

  // Incidents
  if (has(t, 'inc-4821', '4821')) {
    return `**INC-4821 — Critical Incident (Inventory DB)**\n\n${INCIDENTS[0].title}\n\n• Severity: CRITICAL\n• Status: Investigating → Resolved by AI\n• Impact: ${INCIDENTS[0].impact}\n• Users affected: ${INCIDENTS[0].affectedUsers.toLocaleString()}\n• Root cause: N+1 ORM query pattern in deploy #d-8821\n• MTTR: 11 minutes (fully autonomous)\n\nAsk me "what caused the incident?" or "what fix was generated?" for more details.`;
  }
  if (has(t, 'inc-4820', '4820')) {
    return `**INC-4820 — Warning (ML Inference API)**\n\n${INCIDENTS[1].title}\n\n• Severity: WARNING\n• Status: Monitoring\n• Impact: ${INCIDENTS[1].impact}\n• Users affected: ${INCIDENTS[1].affectedUsers.toLocaleString()}\n\nThis incident is being monitored. Latency is elevated at 1,200ms vs baseline of 180ms. No fix has been deployed yet — Sentinel is tracking the trend.`;
  }
  if (has(t, 'inc-4819', '4819')) {
    return `**INC-4819 — Warning (Order Processing)**\n\n${INCIDENTS[2].title}\n\n• Severity: WARNING\n• Status: ✅ Resolved\n• Impact: ${INCIDENTS[2].impact}\n• Users affected: ${INCIDENTS[2].affectedUsers.toLocaleString()}\n\nThis incident was resolved 31 minutes ago. The timeout spike was a downstream effect of INC-4821's connection pool exhaustion.`;
  }
  if (has(t, 'incident', 'incidents', 'active', 'alert', 'alerts', 'problem', 'issue', 'outage', 'down'))
    return incidentSummary();

  // System health
  if (has(t, 'system health', 'overall health', 'health score', 'how is the system', 'system status'))
    return `**Overall System Health: 71%** (during incident) / **99%** (normal)\n\n• 6 services healthy 🟢\n• 2 services degraded 🟡 (Order Processing, ML Inference API)\n• 1 service critical 🔴 (Inventory DB — INC-4821)\n\nThe system health dropped from 99% to 71% when INC-4821 was triggered. After the AI fix was deployed, it recovered back to 99%.`;

  // What is REPAIRX
  if (has(t, 'what is repairx', 'what is this', 'about repairx', 'explain repairx', 'what does repairx do', 'how does repairx work'))
    return `**REPAIRX AI — Autonomous Production Engineer**\n\nREPAIRX is an AI-powered platform that autonomously detects, investigates, diagnoses, fixes, validates, and deploys solutions to production software failures — with zero human intervention.\n\n**The 8-phase autonomous loop:**\n${DEMO_FLOW_STEPS.map(s => `${s.icon} **${s.phase}** — handled by ${s.agent}`).join('\n')}\n\n**Key stats:**\n• MTTR: 11 minutes (vs 2–4 hours human average)\n• 6 specialized AI agents working in parallel\n• 97.8% root cause accuracy\n• Predictive failure prevention via Oracle AI\n\nThis is a Phase 1 prototype built for hackathon demonstration.`;

  // Affected users
  if (has(t, 'user', 'users', 'affected', 'impact', 'how many'))
    return `**User Impact Summary:**\n\n• INC-4821 (Critical): **12,400 users** affected — fully restored after fix\n• INC-4820 (Warning): **4,100 users** experiencing slow ML responses\n• INC-4819 (Resolved): **890 users** — resolved 31 min ago\n\n**Total peak impact: 17,390 users** across 3 concurrent incidents.\n\nAfter the AI fix for INC-4821 was deployed, all 12,400 users were restored within 11 minutes of the incident being detected.`;

  // DB / database questions
  if (has(t, 'database', 'db', 'postgres', 'sql', 'query', 'queries', 'connection'))
    return rootCauseExplain();

  // Latency questions
  if (has(t, 'latency', 'slow', 'slowness', 'response time', '8200', '38ms'))
    return `**Latency Analysis:**\n\nDuring INC-4821, P99 latency on Inventory DB spiked from **45ms → 8,200ms** (182x increase).\n\n**Why so high?**\nEach request was firing 13 DB queries instead of 1. With the connection pool exhausted, queries were queuing — adding thousands of milliseconds of wait time.\n\n**After the fix:**\nLatency dropped to **38ms** — actually better than the original 45ms baseline because the JOIN query is more efficient than the original single query.\n\nAsk me "what fix was generated?" for the full code explanation.`;

  // Error rate questions
  if (has(t, 'error rate', 'errors', '18.4', 'error spike'))
    return `**Error Rate Analysis:**\n\nError rate on Inventory DB spiked from **0.02% → 18.4%** — a 920x increase.\n\n**Why?**\nWhen the DB connection pool hit 100% saturation, all new requests received connection timeout errors. These propagated up through Order Processing, causing a cascade of 5xx errors.\n\n**After the fix:**\nError rate dropped to **0.01%** — lower than the pre-incident baseline of 0.02%, because the optimized query is more reliable.\n\nThe fix resolved the root cause (N+1 queries) rather than just masking the errors.`;

  // Thank you
  if (has(t, 'thank', 'thanks', 'thx', 'ty', 'appreciate', 'great', 'awesome', 'nice', 'good job', 'well done'))
    return `You're welcome! 😊 I'm always here if you have more questions about the incident, the AI agents, the fix, or anything else in the dashboard. Just ask!`;

  // Fallback with suggestions
  return `I'm not sure I understood that fully. Here are some things I can help with:\n\n• **"What caused the incident?"** — root cause analysis\n• **"Why this fix?"** — fix reasoning and alternatives\n• **"Tell me about Sherlock"** — agent details\n• **"Compare before and after"** — performance metrics\n• **"What failures are predicted?"** — Oracle predictions\n• **"How was the fix deployed?"** — deployment strategy\n• **"What was the MTTR?"** — resolution timeline\n\nOr type **"help"** for the full list of topics!`;
}
