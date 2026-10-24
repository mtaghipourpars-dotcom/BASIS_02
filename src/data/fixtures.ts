import {
  LandscapeSystemItem,
  MetricSparkline,
  PriorityWarningItem,
  DBConsumerItem,
  RiskCategoryItem,
  ConnectivityItem,
  SM37JobRecord,
} from '../types';

export const COCKPIT_HEADER_INFO = {
  appName: 'Basis Operations Cockpit',
  subtitle: 'Monitor · Warn · Execute',
  userName: 'Mehrdad Taghipour',
  userNameEn: 'Mehrdad Taghipour',
  userNameFa: 'مهرداد تقی پور',
  userRole: 'Basis Lead Architect',
  userRoleFa: 'معمار ارشد Basis',
  lastUpdateStr: 'Apr 26, 2025 14:32',
  selectedLandscape: 'Production',
};

export interface SystemInstanceDetail {
  instanceId: string;
  systemId: string;
  environment: 'Production' | 'Quality' | 'Development' | 'Test';
  instanceType: 'ASCS' | 'PAS' | 'AAS' | 'HDB';
  instanceNumber: string;
  host: string;
  status: 'Running' | 'Degraded' | 'Stopped';
  observedAt: string;
  source: string;
  dataState: 'NORMAL' | 'ATTENTION' | 'CRITICAL';
  cpuPercent: number;
  memoryPercent: number;
}

export const INSTANCE_DIRECTORY: SystemInstanceDetail[] = [
  {
    instanceId: 'PRD-ASCS00',
    systemId: 'PRD01',
    environment: 'Production',
    instanceType: 'ASCS',
    instanceNumber: '00',
    host: 'sap-prd-ascs.corp.local',
    status: 'Running',
    observedAt: '14:32:00',
    source: 'SM51 / Message Server',
    dataState: 'NORMAL',
    cpuPercent: 12,
    memoryPercent: 28,
  },
  {
    instanceId: 'PRD-D01',
    systemId: 'PRD01',
    environment: 'Production',
    instanceType: 'PAS',
    instanceNumber: '01',
    host: 'sap-prd-app01.corp.local',
    status: 'Running',
    observedAt: '14:32:00',
    source: 'SM51 / Disp+work',
    dataState: 'NORMAL',
    cpuPercent: 54,
    memoryPercent: 68,
  },
  {
    instanceId: 'PRD-D02',
    systemId: 'PRD01',
    environment: 'Production',
    instanceType: 'AAS',
    instanceNumber: '02',
    host: 'sap-prd-app02.corp.local',
    status: 'Degraded',
    observedAt: '14:31:45',
    source: 'SM51 / Disp+work',
    dataState: 'ATTENTION',
    cpuPercent: 88,
    memoryPercent: 84,
  },
  {
    instanceId: 'PRD-HDB00',
    systemId: 'PRD01',
    environment: 'Production',
    instanceType: 'HDB',
    instanceNumber: '00',
    host: 'hana-prd-01.corp.local',
    status: 'Running',
    observedAt: '14:32:10',
    source: 'HDB Studio / ST04',
    dataState: 'NORMAL',
    cpuPercent: 38,
    memoryPercent: 74,
  },
  {
    instanceId: 'QAS-ASCS00',
    systemId: 'QAS01',
    environment: 'Quality',
    instanceType: 'ASCS',
    instanceNumber: '00',
    host: 'sap-qas-ascs.corp.local',
    status: 'Running',
    observedAt: '14:28:00',
    source: 'SM51',
    dataState: 'NORMAL',
    cpuPercent: 10,
    memoryPercent: 22,
  },
  {
    instanceId: 'QAS-D01',
    systemId: 'QAS01',
    environment: 'Quality',
    instanceType: 'PAS',
    instanceNumber: '01',
    host: 'sap-qas-app01.corp.local',
    status: 'Running',
    observedAt: '14:28:00',
    source: 'SM51',
    dataState: 'NORMAL',
    cpuPercent: 32,
    memoryPercent: 48,
  },
  {
    instanceId: 'DEV-D01',
    systemId: 'DEV01',
    environment: 'Development',
    instanceType: 'PAS',
    instanceNumber: '01',
    host: 'sap-dev-app01.corp.local',
    status: 'Running',
    observedAt: '14:25:00',
    source: 'SM51',
    dataState: 'NORMAL',
    cpuPercent: 24,
    memoryPercent: 42,
  },
  {
    instanceId: 'TST-D01',
    systemId: 'TST01',
    environment: 'Test',
    instanceType: 'PAS',
    instanceNumber: '01',
    host: 'sap-tst-app01.corp.local',
    status: 'Running',
    observedAt: '14:10:00',
    source: 'SM51',
    dataState: 'NORMAL',
    cpuPercent: 18,
    memoryPercent: 36,
  },
];

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
    instancesCount: 4,
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
    availabilityPercent: 100,
    lastUpdate: '14:10',
    latencyMs: 15,
    host: 'sap-tst01.corp.local',
    instancesCount: 1,
    dbHost: 'hana-tst-01.corp.local',
  },
  {
    id: 'BW01',
    name: 'SAP BW/4HANA Analytics',
    role: 'Production',
    status: 'Running',
    availabilityPercent: 99,
    lastUpdate: '14:30',
    latencyMs: 22,
    host: 'sap-bw01.corp.local',
    instancesCount: 2,
    dbHost: 'hana-bw-01.corp.local',
  },
  {
    id: 'SOL01',
    name: 'Solution Manager 7.2',
    role: 'Production',
    status: 'Warning',
    availabilityPercent: 91,
    lastUpdate: '14:02',
    latencyMs: 180,
    host: 'sap-sol01.corp.local',
    instancesCount: 2,
    dbHost: 'syb-sol-01.corp.local',
  },
  {
    id: 'PI01',
    name: 'Process Orchestration (PO)',
    role: 'Production',
    status: 'Running',
    availabilityPercent: 100,
    lastUpdate: '14:20',
    latencyMs: 16,
    host: 'sap-pi01.corp.local',
    instancesCount: 2,
    dbHost: 'oracle-pi-01.corp.local',
  },
  {
    id: 'SBX01',
    name: 'Research Sandbox Clean',
    role: 'Development',
    status: 'Stopped',
    availabilityPercent: 0,
    lastUpdate: 'Yesterday',
    latencyMs: 0,
    host: 'sap-sbx01.corp.local',
    instancesCount: 1,
    dbHost: 'hana-sbx-01.corp.local',
  },
];

export const TOP_KPIS = {
  totalSystems: 8,
  systemsRunning: 7,
  systemsStopped: 1,
  healthy: 6,
  healthyCount: 6,
  healthyPercent: 75,
  warnings: 2,
  warningsCount: 2,
  warningsPercent: 25,
  critical: 0,
  criticalCount: 0,
  criticalPercent: 0,
};

export const PERFORMANCE_METRICS: Record<string, MetricSparkline> = {
  cpuUsage: {
    name: 'CPU Usage',
    value: 54,
    unit: '%',
    changePercent: -2.4,
    isPositive: true,
    points: [45, 52, 48, 60, 58, 54],
  },
  memoryUsage: {
    name: 'Memory Usage',
    value: 68,
    unit: '%',
    changePercent: 1.8,
    isPositive: false,
    points: [62, 64, 65, 67, 69, 68],
  },
  dbResponseTime: {
    name: 'DB Response Time',
    value: 410,
    unit: 'ms',
    changePercent: 5.1,
    isPositive: false,
    points: [380, 390, 420, 405, 415, 410],
  },
  workProcessLoad: {
    name: 'Work Process Load',
    value: 38,
    unit: '%',
    changePercent: -1.2,
    isPositive: true,
    points: [40, 42, 44, 38, 36, 38],
  },
};

export const PERFORMANCE_HOURLY_SERIES = [
  { time: '00:00', cpu: 28, memory: 58, responseTime: 290, wpLoad: 20 },
  { time: '02:00', cpu: 65, memory: 62, responseTime: 440, wpLoad: 48 }, // Batch peak
  { time: '04:00', cpu: 42, memory: 60, responseTime: 310, wpLoad: 32 },
  { time: '06:00', cpu: 30, memory: 59, responseTime: 280, wpLoad: 22 },
  { time: '08:00', cpu: 58, memory: 66, responseTime: 380, wpLoad: 45 },
  { time: '10:00', cpu: 72, memory: 71, responseTime: 450, wpLoad: 60 },
  { time: '12:00', cpu: 48, memory: 68, responseTime: 360, wpLoad: 38 },
  { time: '14:00', cpu: 54, memory: 68, responseTime: 410, wpLoad: 38 },
  { time: '16:00', cpu: 50, memory: 65, responseTime: 370, wpLoad: 36 },
  { time: '18:00', cpu: 35, memory: 62, responseTime: 310, wpLoad: 25 },
  { time: '20:00', cpu: 40, memory: 61, responseTime: 330, wpLoad: 28 },
  { time: '22:00', cpu: 32, memory: 60, responseTime: 300, wpLoad: 24 },
];

export const INSTANCE_RESOURCE_RANKING = [
  { instance: 'PRD-D02 (AAS)', cpu: 88, memory: 84, status: 'Attention' },
  { instance: 'PRD-D01 (PAS)', cpu: 54, memory: 68, status: 'Normal' },
  { instance: 'PRD-HDB00 (DB)', cpu: 38, memory: 74, status: 'Normal' },
  { instance: 'QAS-D01 (PAS)', cpu: 32, memory: 48, status: 'Normal' },
  { instance: 'DEV-D01 (PAS)', cpu: 24, memory: 42, status: 'Normal' },
  { instance: 'TST-D01 (PAS)', cpu: 18, memory: 36, status: 'Normal' },
];

export const PRIORITY_WARNINGS: PriorityWarningItem[] = [
  {
    id: 'WRN-PRD-01',
    title: 'High Work Process Load on PRD01-D02',
    description: 'Active dialog work process queue exceeded 85% capacity for 10 minutes.',
    severity: 'Warning',
    systemId: 'PRD01',
    time: '14:28',
    tags: ['SM50', 'WorkProcess', 'Dialog'],
    source: 'SM51 / ST03N',
  },
  {
    id: 'WRN-SOL-02',
    title: 'RFC Destination SOL_700_BACK Unreachable',
    description: 'Communication error WSAECONNREFUSED when calling target port 3300.',
    severity: 'Warning',
    systemId: 'SOL01',
    time: '14:02',
    tags: ['SM59', 'RFC', 'Network'],
    source: 'SM59 / RFC Echo',
  },
  {
    id: 'INF-QAS-01',
    title: 'Transport PRDK900430 Queued for Import',
    description: 'Pending transport import into QAS01 client 800 with 14 ABAP objects.',
    severity: 'Info',
    systemId: 'QAS01',
    time: '13:45',
    tags: ['STMS', 'TMS', 'Release'],
    source: 'STMS Import Queue',
  },
];

export const JOBS_BREAKDOWN = {
  totalCount: 8062,
  totalJobs: 8062,
  successful: 7894,
  delayed: 142,
  failed: 26,
  cancelled: 12,
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
    id: 'REF-SM37-L83',
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
    id: 'REF-SM37-L95',
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
    id: 'REF-SM37-L143',
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
    id: 'REF-SM37-L155',
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
    id: 'REF-SM37-L2583',
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

export const DATABASE_STORAGE_TREND = [
  { month: 'Nov', dataVolumeGb: 1980, logVolumeGb: 380, backupVolumeGb: 2200 },
  { month: 'Dec', dataVolumeGb: 2040, logVolumeGb: 410, backupVolumeGb: 2250 },
  { month: 'Jan', dataVolumeGb: 2110, logVolumeGb: 420, backupVolumeGb: 2320 },
  { month: 'Feb', dataVolumeGb: 2190, logVolumeGb: 440, backupVolumeGb: 2390 },
  { month: 'Mar', dataVolumeGb: 2280, logVolumeGb: 460, backupVolumeGb: 2480 },
  { month: 'Apr', dataVolumeGb: 2360, logVolumeGb: 480, backupVolumeGb: 2560 },
];

export const DATABASE_VOLUMES = [
  { volumeName: 'SYSTEMDB Data', mountPoint: '/hana/data/PRD/mnt00001/hdb00001', sizeGb: 64, usedGb: 18, pct: 28, status: 'Healthy' },
  { volumeName: 'TENANT_PRD Data', mountPoint: '/hana/data/PRD/mnt00001/hdb00002.00003', sizeGb: 2800, usedGb: 2140, pct: 76, status: 'Healthy' },
  { volumeName: 'PRD Log Area', mountPoint: '/hana/log/PRD/mnt00001', sizeGb: 512, usedGb: 220, pct: 43, status: 'Healthy' },
  { volumeName: 'Shared & Binaries', mountPoint: '/hana/shared/PRD', sizeGb: 256, usedGb: 92, pct: 36, status: 'Healthy' },
  { volumeName: 'Backup Target NFS', mountPoint: '/backup/PRD/data', sizeGb: 4096, usedGb: 2840, pct: 69, status: 'Healthy' },
];

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

export const ENQUEUE_LOCKS = [
  { lockArg: 'VBAK 0000104820', table: 'VBAK', mode: 'Exclusive (E)', user: 'SALES_REP01', time: '14:22:10', client: '800' },
  { lockArg: 'MARA 000000000000042890', table: 'MARA', mode: 'Shared (S)', user: 'NMOSTAFAEI', time: '14:15:02', client: '800' },
  { lockArg: 'BKPF 1000 0100004921 2025', table: 'BKPF', mode: 'Exclusive (E)', user: 'FIN_LEAD02', time: '14:30:18', client: '800' },
];

export const LOGS_DUMPS_DATA = {
  systemLogErrors: 12,
  securityAuditLog: 3,
  abapDumps: 1,
  applicationLog: 7,
  timeline: [
    { time: '00', error: 4, warning: 12, info: 24 },
    { time: '04', error: 2, warning: 18, info: 38 },
    { time: '08', error: 8, warning: 26, info: 62 },
    { time: '12', error: 12, warning: 22, info: 45 },
    { time: '16', error: 6, warning: 15, info: 30 },
    { time: '20', error: 3, warning: 10, info: 22 },
  ],
};

export const LOG_EVENT_RECORDS = [
  { id: 'SM21-EVT-4819', source: 'SM21', type: 'System Log', code: 'Q04', severity: 'Error', message: 'Connection to host sap-sol01 broken WSAECONNREFUSED', user: 'SYSTEM', program: 'SAPMSYST', time: '14:02:14', client: '000' },
  { id: 'ST22-DMP-0012', source: 'ST22', type: 'ABAP Dump', code: 'TSV_TNEW_PAGE_ALLOC_FAILED', severity: 'Critical', message: 'No more memory available to extend internal table', user: 'SALES_REP01', program: 'ZSD_ORDER_EXTRACT', time: '13:12:05', client: '800' },
  { id: 'SM13-UPD-0000', source: 'SM13', type: 'Update Error', code: 'V1', severity: 'Info', message: 'All V1/V2 update queues processed successfully', user: 'SYSTEM', program: 'SAPMV45A', time: '14:30:00', client: '800' },
  { id: 'SM21-EVT-4812', source: 'SM21', type: 'System Log', code: 'F66', severity: 'Warning', message: 'Work process 3 entered PRIV mode due to memory limits', user: 'DDIC', program: '/BUILD/REORG', time: '12:45:10', client: '000' },
];

export const CONNECTIVITY_DATA: ConnectivityItem[] = [
  { type: 'RFC Destinations', total: 5, errors: 1, status: 'Warning' },
  { type: 'IDoc Queues', total: 2, errors: 0, status: 'Healthy' },
  { type: 'HTTP Services', total: 8, errors: 0, status: 'Healthy' },
  { type: 'Message Queues', total: 3, errors: 0, status: 'Healthy' },
];

export const INTERFACE_INVENTORY = [
  { id: 'RFC-PRD-QAS', name: 'QAS_000_TRUSTED', type: 'RFC', targetHost: 'sap-qas01.corp.local', port: 3300, protocol: 'CPIC/RFC', status: 'Online', latencyMs: 14, lastChecked: '14:30:00', errorCount: 0 },
  { id: 'RFC-PRD-SOL', name: 'SOL_700_BACK', type: 'RFC', targetHost: 'sap-sol01.corp.local', port: 3300, protocol: 'CPIC/RFC', status: 'Error', latencyMs: 180, lastChecked: '14:02:14', errorCount: 3, errorText: 'WSAECONNREFUSED: Connection refused' },
  { id: 'IDOC-INBOUND-SALES', name: 'ORDERS05_INBOUND', type: 'IDoc', targetHost: 'sap-prd01.corp.local', port: 3301, protocol: 'ALE/IDoc', status: 'Online', latencyMs: 8, lastChecked: '14:28:00', errorCount: 0 },
  { id: 'HTTP-SICF-ODATA', name: '/sap/opu/odata/IWFND', type: 'HTTP', targetHost: 'sap-prd01.corp.local:44300', port: 44300, protocol: 'HTTPS', status: 'Online', latencyMs: 24, lastChecked: '14:25:00', errorCount: 0 },
  { id: 'MSG-PI-AEX', name: 'SAP_PO_PI01_QUEUE', type: 'Message Queue', targetHost: 'sap-pi01.corp.local', port: 50000, protocol: 'XI/JMS', status: 'Online', latencyMs: 16, lastChecked: '14:20:00', errorCount: 0 },
];

export const TRANSPORTS_DATA = {
  pendingImports: 4,
  lastImportTime: 'Apr 26, 10:24',
  failedImports: 1,
  recentChanges: 8,
};

export const TRANSPORT_RECORDS = [
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

export const BACKUP_DATA = {
  lastBackupTime: 'Apr 26, 02:15',
  backupStatus: 'Successful',
  recoveryReadinessPercent: 98,
};

export const BACKUP_CATALOG = [
  { backupId: 'HDB_PRD_FULL_20250426_0200', sid: 'PRD', type: 'Complete Data Backup', startTime: '1405/07/26 02:00', endTime: '1405/07/26 02:42', duration: '42m 12s', sizeGb: 412, destination: '/backup/data/PRD_data_full', status: 'Successful', checksumVerified: true },
  { backupId: 'HDB_PRD_DIFF_20250425_1400', sid: 'PRD', type: 'Differential Backup', startTime: '1405/07/25 14:00', endTime: '1405/07/25 14:12', duration: '12m 04s', sizeGb: 48, destination: '/backup/data/PRD_diff', status: 'Successful', checksumVerified: true },
  { backupId: 'HDB_QAS_FULL_20250426_0300', sid: 'QAS', type: 'Complete Data Backup', startTime: '1405/07/26 03:00', endTime: '1405/07/26 03:28', duration: '28m 40s', sizeGb: 215, destination: '/backup/data/QAS_data_full', status: 'Successful', checksumVerified: true },
  { backupId: 'HDB_DEV_FULL_20250425_0100', sid: 'DEV', type: 'Complete Data Backup', startTime: '1405/07/25 01:00', endTime: '1405/07/25 01:22', duration: '22m 15s', sizeGb: 140, destination: '/backup/data/DEV_data_full', status: 'Successful', checksumVerified: true },
];

export const SM37_EXTRACTED_METADATA = {
  fixtureId: 'sm37-reference-snapshot-01',
  dataState: 'LOCAL_REFERENCE',
  sourceArtifact: 'user-upload: SM37.md',
  reportScope: {
    fromDateRaw: '1405/07/25',
    toDateRaw: '1405/07/26',
    totalRecordsPassed: 8062,
    uniqueJobCountNote: 'Total records passed count is not validated as a unique-run count.',
  },
  observedAt: '1405/07/26 14:30:00',
  limitations: [
    'Row identity is derived from source excerpt locators for UI selection.',
    'record_id is a derived reference locator, not a native SAP job-run ID.',
    'Status counts and charts remain disabled until unique identity, full extraction, and column alignment are validated.',
  ],
};

export const DATABASE_STATUS = {
  sid: 'HDB',
  dbName: 'SAP HANA 2.0 SPS06',
  version: '2.00.065.00',
  host: 'hana-prd-01.corp.local',
  replicationStatus: 'Active SYNCMEM (HSR Tier 2)',
  memoryUsedGb: 1840,
  memoryTotalGb: 2328,
  dataDiskUsedGb: 2140,
  dataDiskTotalGb: 3100,
  logDiskUsedGb: 220,
  logDiskTotalGb: 512,
  savepointDurationSec: 4.2,
  activeLockWaits: 0,
  lastFullBackup: 'Apr 26, 02:00:00',
};

export const WORK_PROCESS_RECORDS = [
  { no: 0, type: 'DIA', pid: 14201, status: 'Running', time: 3, program: 'SAPMV45A', client: '800', user: 'SALES_REP01', action: 'VA01 Order Entry' },
  { no: 1, type: 'DIA', pid: 14202, status: 'Waiting', time: 0 },
  { no: 2, type: 'DIA', pid: 14203, status: 'Waiting', time: 0 },
  { no: 3, type: 'BTC', pid: 14204, status: 'Running', time: 145, program: '/BUILD/REORG', client: '000', user: 'DDIC', action: 'Table cleanup' },
  { no: 4, type: 'BTC', pid: 14205, status: 'Waiting', time: 0 },
  { no: 5, type: 'UPD', pid: 14206, status: 'Waiting', time: 0 },
  { no: 6, type: 'ENQ', pid: 14207, status: 'Running', time: 0, action: 'Enqueue Lock Server Master' },
  { no: 7, type: 'SPO', pid: 14208, status: 'Waiting', time: 0 },
];

export const SECURITY_SESSION_RECORDS = [
  { client: '800', user: 'SALES_REP01', terminal: '10.20.45.12', tcode: 'VA01', time: '08:12:00', sessions: 2, memoryKb: 18400 },
  { client: '800', user: 'FIN_LEAD02', terminal: '10.20.45.18', tcode: 'FBL3N', time: '08:45:10', sessions: 3, memoryKb: 34200 },
  { client: '000', user: 'DDIC', terminal: 'BATCH_SRV', tcode: 'SM37', time: '00:00:01', sessions: 1, memoryKb: 8900 },
  { client: '800', user: 'NMOSTAFAEI', terminal: '10.20.46.22', tcode: 'QA32', time: '13:00:15', sessions: 2, memoryKb: 26100 },
];


