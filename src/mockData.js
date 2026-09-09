export const SERVICES = [
  { id: 1, name: 'Payment Gateway', status: 'healthy', latency: 42, uptime: 99.98, requests: 12400, errors: 0.02, region: 'us-east-1' },
  { id: 2, name: 'Auth Service', status: 'healthy', latency: 18, uptime: 99.99, requests: 45200, errors: 0.01, region: 'us-east-1' },
  { id: 3, name: 'Order Processing', status: 'degraded', latency: 2840, uptime: 97.2, requests: 8900, errors: 4.8, region: 'us-west-2' },
  { id: 4, name: 'Inventory DB', status: 'critical', latency: 8200, uptime: 89.1, requests: 3200, errors: 18.4, region: 'us-west-2' },
  { id: 5, name: 'Notification Service', status: 'healthy', latency: 95, uptime: 99.95, requests: 22100, errors: 0.05, region: 'eu-west-1' },
  { id: 6, name: 'Analytics Engine', status: 'healthy', latency: 210, uptime: 99.87, requests: 5600, errors: 0.13, region: 'ap-southeast-1' },
  { id: 7, name: 'CDN / Edge Cache', status: 'healthy', latency: 8, uptime: 100, requests: 189000, errors: 0.0, region: 'global' },
  { id: 8, name: 'ML Inference API', status: 'degraded', latency: 1200, uptime: 98.4, requests: 4100, errors: 1.6, region: 'us-east-1' },
];

export const METRICS_HISTORY = Array.from({ length: 30 }, (_, i) => ({
  t: i,
  cpu: 20 + Math.sin(i * 0.4) * 15 + (i > 20 ? 40 : 0) + Math.random() * 5,
  mem: 45 + Math.cos(i * 0.3) * 10 + (i > 20 ? 20 : 0) + Math.random() * 3,
  latency: 80 + Math.sin(i * 0.5) * 30 + (i > 20 ? 2000 : 0) + Math.random() * 20,
  errors: i > 20 ? 15 + Math.random() * 8 : Math.random() * 0.5,
}));

export const INCIDENTS = [
  {
    id: 'INC-4821',
    severity: 'critical',
    title: 'Inventory DB Connection Pool Exhaustion',
    service: 'Inventory DB',
    time: '2 min ago',
    status: 'investigating',
    impact: '18.4% error rate, 8200ms p99 latency',
    affectedUsers: 12400,
  },
  {
    id: 'INC-4820',
    severity: 'warning',
    title: 'ML Inference API Elevated Latency',
    service: 'ML Inference API',
    time: '14 min ago',
    status: 'monitoring',
    impact: '1200ms avg latency (baseline: 180ms)',
    affectedUsers: 4100,
  },
  {
    id: 'INC-4819',
    severity: 'warning',
    title: 'Order Processing Timeout Spike',
    service: 'Order Processing',
    time: '31 min ago',
    status: 'resolved',
    impact: '4.8% timeout rate on checkout flow',
    affectedUsers: 890,
  },
];

export const AGENTS = [
  { id: 'AGT-01', name: 'Sentinel', role: 'Anomaly Detector', icon: '🔍', color: 'blue', status: 'active', tasks: 847, accuracy: 99.2 },
  { id: 'AGT-02', name: 'Sherlock', role: 'Root Cause Analyst', icon: '🧠', color: 'purple', status: 'active', tasks: 312, accuracy: 97.8 },
  { id: 'AGT-03', name: 'Forge', role: 'Fix Generator', icon: '⚡', color: 'yellow', status: 'active', tasks: 289, accuracy: 96.4 },
  { id: 'AGT-04', name: 'Guardian', role: 'Risk Assessor', icon: '🛡️', color: 'green', status: 'active', tasks: 289, accuracy: 98.9 },
  { id: 'AGT-05', name: 'Pilot', role: 'Deployment Manager', icon: '🚀', color: 'cyan', status: 'standby', tasks: 156, accuracy: 99.7 },
  { id: 'AGT-06', name: 'Oracle', role: 'Predictive Engine', icon: '🔮', color: 'pink', status: 'active', tasks: 1204, accuracy: 94.1 },
];

export const KNOWLEDGE_BASE = [
  { id: 'KB-001', title: 'Connection Pool Exhaustion — PostgreSQL', category: 'Database', uses: 47, resolution: '< 4 min', confidence: 98 },
  { id: 'KB-002', title: 'Memory Leak in Node.js Event Loop', category: 'Runtime', uses: 31, resolution: '< 8 min', confidence: 95 },
  { id: 'KB-003', title: 'Redis Cache Stampede Pattern', category: 'Cache', uses: 28, resolution: '< 2 min', confidence: 99 },
  { id: 'KB-004', title: 'Kubernetes OOMKilled Pod Recovery', category: 'Infrastructure', uses: 62, resolution: '< 6 min', confidence: 97 },
  { id: 'KB-005', title: 'Cascading Timeout in Microservices', category: 'Network', uses: 19, resolution: '< 12 min', confidence: 91 },
  { id: 'KB-006', title: 'SQL N+1 Query Anti-Pattern', category: 'Database', uses: 38, resolution: '< 5 min', confidence: 96 },
];

export const PREDICTIONS = [
  { id: 'PRD-01', service: 'Auth Service', risk: 72, issue: 'JWT token cache near capacity', eta: '~2.4 hours', action: 'Pre-scale cache cluster' },
  { id: 'PRD-02', service: 'Payment Gateway', risk: 45, issue: 'Certificate expiry approaching', eta: '~6 days', action: 'Auto-renew TLS cert' },
  { id: 'PRD-03', service: 'Analytics Engine', risk: 38, issue: 'Disk I/O saturation trend', eta: '~18 hours', action: 'Migrate to gp3 volumes' },
];

export const DEMO_FLOW_STEPS = [
  {
    id: 0, phase: 'Incident Detected', icon: '🚨', color: 'red',
    agent: 'Sentinel',
    log: [
      '[00:00.000] Anomaly detector triggered — Inventory DB',
      '[00:00.120] Error rate: 0.02% → 18.4% (↑ 920x)',
      '[00:00.240] P99 latency: 45ms → 8,200ms (↑ 182x)',
      '[00:00.380] Connection pool utilization: 100% (saturated)',
      '[00:00.500] Alert escalated → CRITICAL severity',
      '[00:00.620] Incident INC-4821 created automatically',
    ],
  },
  {
    id: 1, phase: 'AI Investigation', icon: '🔍', color: 'blue',
    agent: 'Sherlock',
    log: [
      '[00:01.000] Sherlock agent activated for INC-4821',
      '[00:01.200] Scanning 847 correlated signals...',
      '[00:01.800] Correlating deployment history (last 72h)',
      '[00:02.100] Found: deploy #d-8821 at 14:32 UTC (22 min ago)',
      '[00:02.400] Analyzing query execution plans...',
      '[00:02.900] Detected N+1 query pattern in OrderService.getItems()',
      '[00:03.200] Cross-referencing KB-006 (SQL N+1 Anti-Pattern)',
      '[00:03.500] Confidence score: 97.8% — Root cause identified',
    ],
  },
  {
    id: 2, phase: 'Root Cause Found', icon: '🧠', color: 'purple',
    agent: 'Sherlock',
    log: [
      '[00:03.600] ROOT CAUSE CONFIRMED',
      '[00:03.700] Deploy #d-8821 introduced ORM change in OrderService',
      '[00:03.800] New code executes 1 query per order item (N+1 pattern)',
      '[00:03.900] Avg order: 12 items → 13 queries per request (was 1)',
      '[00:04.000] At 8,900 req/min → 115,700 DB queries/min (was 8,900)',
      '[00:04.100] Connection pool (max: 100) exhausted in < 30 seconds',
      '[00:04.200] Cascading timeouts propagated to Order Processing service',
      '[00:04.300] Blast radius: 12,400 users affected across 3 services',
    ],
  },
  {
    id: 3, phase: 'Fix Generated', icon: '⚡', color: 'yellow',
    agent: 'Forge',
    log: [
      '[00:04.500] Forge agent generating fix...',
      '[00:04.700] Strategy: Replace N+1 with eager-loading JOIN query',
      '[00:05.000] Generating optimized SQL with batch fetch...',
      '[00:05.300] Fix generated: 3 files modified, 47 lines changed',
      '[00:05.500] Unit tests: 142 passed, 0 failed',
      '[00:05.700] Query plan analysis: 13 queries → 1 query per request',
      '[00:05.900] Estimated latency improvement: 8,200ms → 38ms',
      '[00:06.000] Fix package ready for validation',
    ],
  },
  {
    id: 4, phase: 'Fix Validated', icon: '✅', color: 'green',
    agent: 'Guardian',
    log: [
      '[00:06.200] Guardian running validation suite...',
      '[00:06.400] Staging environment provisioned (us-west-2-staging)',
      '[00:06.800] Load test: 10,000 req/min for 60 seconds',
      '[00:07.200] P99 latency: 38ms ✓ (target: < 100ms)',
      '[00:07.400] Error rate: 0.01% ✓ (target: < 0.1%)',
      '[00:07.600] Connection pool utilization: 12% ✓ (target: < 60%)',
      '[00:07.800] No regression detected in 847 integration tests',
      '[00:08.000] Risk score: LOW (8/100) — Approved for deployment',
    ],
  },
  {
    id: 5, phase: 'Deployment Approved', icon: '🚀', color: 'cyan',
    agent: 'Pilot',
    log: [
      '[00:08.200] Pilot initiating canary deployment...',
      '[00:08.400] Canary: 5% traffic → new build (v2.4.1-hotfix)',
      '[00:08.800] Canary metrics nominal — expanding to 25%',
      '[00:09.200] 25% traffic nominal — expanding to 75%',
      '[00:09.600] 75% traffic nominal — full rollout initiated',
      '[00:10.000] 100% traffic on v2.4.1-hotfix',
      '[00:10.200] Rollback trigger: armed (auto-rollback if error > 1%)',
      '[00:10.400] Deployment complete — monitoring active',
    ],
  },
  {
    id: 6, phase: 'System Recovered', icon: '💚', color: 'green',
    agent: 'Sentinel',
    log: [
      '[00:10.600] Recovery confirmed — all metrics nominal',
      '[00:10.700] P99 latency: 8,200ms → 38ms (↓ 99.5%)',
      '[00:10.800] Error rate: 18.4% → 0.01% (↓ 99.9%)',
      '[00:10.900] Connection pool: 100% → 11% utilization',
      '[00:11.000] All 12,400 affected users restored',
      '[00:11.100] Incident INC-4821 resolved — MTTR: 11 minutes',
      '[00:11.200] Post-incident report generated automatically',
      '[00:11.300] Fix committed to main branch — PR #4821 merged',
    ],
  },
  {
    id: 7, phase: 'Future Failure Predicted', icon: '🔮', color: 'pink',
    agent: 'Oracle',
    log: [
      '[00:11.500] Oracle analyzing post-incident patterns...',
      '[00:11.700] Training on INC-4821 telemetry data',
      '[00:12.000] Pattern registered: ORM eager-load regression signature',
      '[00:12.200] Scanning all 47 services for similar patterns...',
      '[00:12.500] WARNING: Auth Service — JWT cache 72% capacity',
      '[00:12.700] Predicted failure in ~2.4 hours without intervention',
      '[00:12.900] Pre-emptive action queued: cache cluster scale-out',
      '[00:13.000] Predictive alert PRD-01 created — human approval requested',
    ],
  },
];

export const BEFORE_AFTER = {
  before: { latency: 8200, errorRate: 18.4, throughput: 680, cpuUsage: 94, dbConnections: 100, userImpact: 12400 },
  after: { latency: 38, errorRate: 0.01, throughput: 9200, cpuUsage: 23, dbConnections: 11, userImpact: 0 },
};

export const GENERATED_FIX = {
  filename: 'OrderService.java',
  before: `// BEFORE — N+1 Query Pattern (PROBLEMATIC)
public List<OrderItem> getOrderItems(Long orderId) {
  Order order = orderRepo.findById(orderId);
  List<OrderItem> items = new ArrayList<>();
  
  // ❌ Executes 1 query per item (N+1 problem)
  for (Long itemId : order.getItemIds()) {
    items.add(itemRepo.findById(itemId)); // N queries!
  }
  return items;
}`,
  after: `// AFTER — Optimized Batch Query (AI-GENERATED FIX)
public List<OrderItem> getOrderItems(Long orderId) {
  // ✅ Single JOIN query fetches all items at once
  return orderRepo.findByIdWithItems(orderId)
    .getItems(); // 1 query regardless of item count
}

// New repository method (auto-generated):
@Query("SELECT o FROM Order o " +
       "LEFT JOIN FETCH o.items " +
       "WHERE o.id = :orderId")
Order findByIdWithItems(@Param("orderId") Long id);`,
};
