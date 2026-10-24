import {
  LandscapeSystemItem,
  MetricSparkline,
  PriorityWarningItem,
  DBConsumerItem,
  RiskCategoryItem,
  ConnectivityItem,
  SM37JobRecord,
} from '../types';

export const DEMO_HEADER_INFO = {
  appName: 'Basis Operations Cockpit',
  subtitle: 'Monitor · Warn · Execute',
  userName: 'Mehdi Taghipour',
  userRole: 'Basis Manager',
  lastUpdateStr: 'Apr 26, 2025 14:32',
  selectedLandscape: 'Production',
};

export const LANDSCAPE_SYSTEMS: LandscapeSystemItem[] = [
  {
    id: 'PRD01',
    name: 'S/4HANA Production Primary',
    role: 'Production',
    status: 'Running',
    availabilityPercent: 100,
    lastUpdate: '14:32',
    latencyMs: 14,
    host: 'sap-prd01.corp.local',
    instancesCount: 3,
    dbHost: 'hana-prd-01.corp.local',
  },
  {
    id: 'QAS01',
    name: 'Quality Assurance & Staging',
    role: 'Quality',
    status: 'Running',
    availabilityPercent: 98,
    lastUpdate: '14:28',
    latencyMs: 18,
    host: 'sap-qas01.corp.local',
    instancesCount: 2,
    dbHost: 'hana-qas-01.corp.local',
  },
  {
    id: 'DEV01',
    name: 'Development Sandbox',
    role: 'Development',
    status: 'Running',
    availabilityPercent: 100,
    lastUpdate: '14:25',
    latencyMs: 12,
    host: 'sap-dev01.corp.local',
    instancesCount: 1,
    dbHost: 'hana-dev-01.corp.local',
  },
  {
    id: 'TST01',
    name: 'Integration Test Cluster',
    role: 'Test',
    status: 'Running',
    availabilityPercent: 99,
    lastUpdate: '14:22',
    latencyMs: 16,
    host: 'sap-tst01.corp.local',
    instancesCount: 2,
    dbHost: 'hana-tst-01.corp.local',
  },
  {
    id: 'PRD02',
    name: 'Production App Server 02',
    role: 'Production',
    status: 'Critical',
    availabilityPercent: 62,
    lastUpdate: '14:20',
    latencyMs: 85,
    host: 'sap-prd02.corp.local',
    instancesCount: 1,
    dbHost: 'hana-prd-01.corp.local',
  },
  {
    id: 'PRD03',
    name: 'Production App Server 03',
    role: 'Production',
    status: 'Running',
    availabilityPercent: 100,
    lastUpdate: '14:18',
    latencyMs: 14,
    host: 'sap-prd03.corp.local',
    instancesCount: 1,
    dbHost: 'hana-prd-01.corp.local',
  },
  {
    id: 'PRD04',
    name: 'Production Batch Server 04',
    role: 'Production',
    status: 'Warning',
    availabilityPercent: 91,
    lastUpdate: '14:15',
    latencyMs: 32,
    host: 'sap-prd04.corp.local',
    instancesCount: 1,
    dbHost: 'hana-prd-01.corp.local',
  },
  {
    id: 'PRD05',
    name: 'Production Integration Gateway',
    role: 'Production',
    status: 'Running',
    availabilityPercent: 100,
    lastUpdate: '14:10',
    latencyMs: 15,
    host: 'sap-prd05.corp.local',
    instancesCount: 1,
    dbHost: 'hana-prd-01.corp.local',
  },
];

export const TOP_KPIS = {
  totalSystems: 8,
  runningCount: 7,
  stoppedCount: 1,
  healthyCount: 6,
  healthyPercent: 75,
  warningsCount: 1,
  warningsPercent: 12,
  criticalCount: 1,
  criticalPercent: 12,
};

export const PERFORMANCE_METRICS: MetricSparkline[] = [
  {
    name: 'CPU Usage',
    value: 32,
    unit: '%',
    changePercent: -12,
    isPositive: true,
    points: [42, 38, 45, 39, 36, 34, 32],
  },
  {
    name: 'Memory Usage',
    value: 41,
    unit: '%',
    changePercent: -8,
    isPositive: true,
    points: [48, 46, 47, 45, 43, 42, 41],
  },
  {
    name: 'DB Response Time',
    value: 128,
    unit: 'ms',
    changePercent: -21,
    isPositive: true,
    points: [165, 155, 148, 140, 138, 132, 128],
  },
  {
    name: 'Work Process Load',
    value: 68,
    unit: '%',
    changePercent: 9,
    isPositive: false,
    points: [52, 55, 59, 62, 60, 65, 68],
  },
];

export const PRIORITY_WARNINGS: PriorityWarningItem[] = [
  {
    id: 'ALT-PRD-01',
    title: 'High DB Load on PRD01',
    description: 'Database CPU usage is 92% for 15 minutes',
    severity: 'Critical',
    systemId: 'PRD01',
    time: '14:02',
    tags: ['PRD01', 'DB', 'Performance'],
    source: 'ST04 / HANA Engine',
  },
  {
    id: 'ALT-PRD-02',
    title: 'Job ZSD_EOD Failed',
    description: 'Background job ended with error',
    severity: 'Warning',
    systemId: 'PRD01',
    time: '13:45',
    tags: ['PRD01', 'Jobs', 'ABAP'],
    source: 'SM37 / Batch',
  },
  {
    id: 'ALT-QAS-01',
    title: 'Disk Space Low on QAS01',
    description: 'Available space is 8% (threshold 10%)',
    severity: 'Warning',
    systemId: 'QAS01',
    time: '12:30',
    tags: ['QAS01', 'Storage', 'System'],
    source: 'OS / ST06',
  },
  {
    id: 'ALT-PRD-03',
    title: 'Certificate Expiring',
    description: 'SSL certificate expires in 12 days',
    severity: 'Info',
    systemId: 'PRD01',
    time: '11:00',
    tags: ['PRD01', 'Security', 'Certificate'],
    source: 'STRUST',
  },
];

export const JOBS_BREAKDOWN = {
  totalJobs: 245,
  successful: { count: 215, percent: 88 },
  delayed: { count: 12, percent: 5 },
  failed: { count: 8, percent: 9 }, // visual display matches 9% or 3.3%
  cancelled: { count: 10, percent: 9 },
  hourlyTrend: [
    { hour: '00', success: 38, delayed: 3, failed: 1 },
    { hour: '04', success: 42, delayed: 2, failed: 2 },
    { hour: '08', success: 55, delayed: 4, failed: 2 },
    { hour: '12', success: 48, delayed: 2, failed: 1 },
    { hour: '16', success: 39, delayed: 1, failed: 1 },
    { hour: '20', success: 35, delayed: 2, failed: 1 },
  ],
};

export const SM37_ROWS: SM37JobRecord[] = [
  {
    id: 'DEMO-SM37-L83',
    name: '/BUILD/REORG',
    creator: 'DDIC',
    status: 'Finished',
    date: '1405/07/26',
    time: '00:00:03',
    duration: '0',
    delay: '3',
    client: '000',
    source: 'SM37.md excerpt around L83-L92',
  },
  {
    id: 'DEMO-SM37-L95',
    name: '/IWBEP/SUP_UTIL_CLEANUP',
    creator: 'DDIC',
    status: 'Finished',
    date: '1405/07/25',
    time: '03:00:02',
    duration: '1',
    delay: '2',
    client: '000',
    source: 'SM37.md excerpt around L95-L104',
  },
  {
    id: 'DEMO-SM37-L143',
    name: '/SMB/Q2P_RESTART_BATCH_JOBS',
    creator: 'DDIC',
    status: 'Released',
    date: '—',
    time: '—',
    duration: '0',
    delay: '0',
    client: '000',
    source: 'SM37.md excerpt around L143-L152',
  },
  {
    id: 'DEMO-SM37-L155',
    name: '/SMB/Q2P_RESTART_BATCH_JOBS',
    creator: 'DDIC',
    status: 'Finished',
    date: '1405/07/25',
    time: '00:24:02',
    duration: '0',
    delay: '0',
    client: '000',
    source: 'SM37.md excerpt around L155-L164',
  },
  {
    id: 'DEMO-SM37-L2583',
    name: 'QM_REPET_INSP',
    creator: 'NMOSTAFAEI',
    status: 'Canceled',
    date: '1405/07/25',
    time: '13:13:03',
    duration: '0',
    delay: '48',
    client: '800',
    source: 'SM37.md excerpt around L2583-L2592',
  },
];

export const DATABASE_DATA = {
  dbHealthPercent: 98,
  freeSpacePercent: 18,
  topConsumers: [
    { userOrProgram: 'DDIC', cpuPercent: 78, memoryGb: 6.2, time: '12:41' },
    { userOrProgram: 'SAPSR3', cpuPercent: 54, memoryGb: 4.8, time: '11:32' },
    { userOrProgram: 'BATCH', cpuPercent: 32, memoryGb: 3.1, time: '10:18' },
    { userOrProgram: 'RFC', cpuPercent: 21, memoryGb: 2.4, time: '09:45' },
  ] as DBConsumerItem[],
};

export const SECURITY_DATA = {
  blockedUsers: 2,
  failedLogonAttempts: 18,
  sensitiveAccessChanges: 5,
  certificateExpiry7Days: 1,
  topRiskCategories: [
    { category: 'User Management', percentage: 45 },
    { category: 'Authorization Objects', percentage: 32 },
    { category: 'Security Events', percentage: 18 },
    { category: 'Certificate', percentage: 5 },
  ] as RiskCategoryItem[],
};

export const LOGS_DUMPS_DATA = {
  systemLogErrors: 12,
  securityAuditLog: 3,
  abapDumps: 1,
  applicationLog: 7,
  timeline: [
    { time: '00', error: 4, warning: 12, info: 24 },
    { time: '06', error: 2, warning: 18, info: 38 },
    { time: '12', error: 8, warning: 26, info: 62 },
    { time: '18', error: 12, warning: 22, info: 45 },
    { time: '24', error: 6, warning: 15, info: 30 },
  ],
};

export const CONNECTIVITY_DATA: ConnectivityItem[] = [
  { type: 'RFC Destinations', total: 5, errors: 1, status: 'Warning' },
  { type: 'IDoc Queues', total: 2, errors: 0, status: 'Healthy' },
  { type: 'HTTP Services', total: 8, errors: 0, status: 'Healthy' },
  { type: 'Message Queues', total: 3, errors: 0, status: 'Healthy' },
];

export const TRANSPORTS_DATA = {
  pendingImports: 4,
  lastImportTime: 'Apr 26, 10:24',
  failedImports: 1,
  recentChanges: 8,
};

export const BACKUP_DATA = {
  lastBackupTime: 'Apr 26, 02:15',
  backupStatus: 'Successful',
  recoveryReadinessPercent: 98,
};

export const SM37_EXTRACTED_METADATA = {
  fixtureId: 'sm37-extracted-snapshot-01',
  dataState: 'LOCAL_DEMO_FIXTURE',
  sourceArtifact: 'user-upload: SM37.md',
  reportScope: {
    fromDateRaw: '1405/07/25',
    toDateRaw: '1405/07/26',
  },
  reportedRecordsPassed: '8,062',
  observedAt: '1405/07/26 14:30:00 (DEMO)',
  notes: [
    'Sample rows are transcribed from the supplied extraction, not live SAP data.',
    'record_id is a DEMO-only source locator, not a native SAP job-run ID.',
    'Delay meaning/unit and timezone are unknown.',
    'Reconcile values and column alignment to the original PDF before operational use.',
  ],
};

export const DEMO_DATABASE = {
  sid: 'PRD01',
  dbName: 'HDB',
  version: '2.00.072.00 (SPS 07)',
  replicationStatus: 'Active (Sync)',
  memoryUsedGb: 404,
  memoryTotalGb: 512,
  dataDiskUsedGb: 1420,
  dataDiskTotalGb: 2048,
  logDiskUsedGb: 110,
  logDiskTotalGb: 256,
  savepointDurationSec: 1.4,
  activeLockWaits: 0,
  lastFullBackup: 'Apr 26, 02:00:00 (DEMO)',
};

export const DEMO_WORK_PROCESSES = [
  { no: 0, type: 'DIA', pid: 14201, status: 'Running', time: 3, program: 'SAPMV45A', client: '800', user: 'SALES_REP01', action: 'VA01 Order Entry' },
  { no: 1, type: 'DIA', pid: 14202, status: 'Waiting', time: 0 },
  { no: 2, type: 'DIA', pid: 14203, status: 'Waiting', time: 0 },
  { no: 3, type: 'BTC', pid: 14204, status: 'Running', time: 145, program: '/BUILD/REORG', client: '000', user: 'DDIC', action: 'Table cleanup' },
  { no: 4, type: 'BTC', pid: 14205, status: 'Waiting', time: 0 },
  { no: 5, type: 'UPD', pid: 14206, status: 'Waiting', time: 0 },
  { no: 6, type: 'ENQ', pid: 14207, status: 'Running', time: 0, action: 'Enqueue Lock Server Master' },
  { no: 7, type: 'SPO', pid: 14208, status: 'Waiting', time: 0 },
];

export const DEMO_SECURITY_SESSIONS = [
  { client: '800', user: 'SALES_REP01', terminal: '10.20.45.12', tcode: 'VA01', time: '08:12:00', sessions: 2, memoryKb: 18400 },
  { client: '800', user: 'FIN_LEAD02', terminal: '10.20.45.18', tcode: 'FBL3N', time: '08:45:10', sessions: 3, memoryKb: 34200 },
  { client: '000', user: 'DDIC', terminal: 'BATCH_SRV', tcode: 'SM37', time: '00:00:01', sessions: 1, memoryKb: 8900 },
  { client: '800', user: 'NMOSTAFAEI', terminal: '10.20.46.22', tcode: 'QA32', time: '13:00:15', sessions: 2, memoryKb: 26100 },
];

export const DEMO_TRANSPORTS = [
  {
    trNumber: 'PRDK900421',
    description: 'Finance General Ledger Tax Rate Update Q3',
    owner: 'M_RAHIMI',
    sourceSystem: 'DEV01',
    targetSystem: 'QAS01',
    returnCode: 'RC0',
    status: 'Imported',
    importDate: 'Apr 25, 18:20',
  },
  {
    trNumber: 'PRDK900425',
    description: 'Custom SD Billing User Exit Correction',
    owner: 'A_KAVIANI',
    sourceSystem: 'DEV01',
    targetSystem: 'QAS01',
    returnCode: 'RC4',
    status: 'Imported',
    importDate: 'Apr 25, 19:40',
  },
  {
    trNumber: 'PRDK900430',
    description: 'Material Master Table Enhancement Append',
    owner: 'NMOSTAFAEI',
    sourceSystem: 'QAS01',
    targetSystem: 'PRD01',
    returnCode: 'PENDING',
    status: 'In Queue',
    importDate: '—',
  },
  {
    trNumber: 'PRDK900388',
    description: 'HCM Payroll Calculation Enhancement',
    owner: 'H_REZAEI',
    sourceSystem: 'DEV01',
    targetSystem: 'QAS01',
    returnCode: 'RC8',
    status: 'Failed',
    importDate: 'Apr 24, 22:15',
  },
];

export const DEMO_SYSTEMS = LANDSCAPE_SYSTEMS;
export const DEMO_ALERTS = PRIORITY_WARNINGS;

