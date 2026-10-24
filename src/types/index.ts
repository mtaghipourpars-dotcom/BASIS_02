export type PageId =
  | 'home'
  | 'overview'
  | 'systems'
  | 'landscape'
  | 'alerts-events'
  | 'performance'
  | 'jobs-processes'
  | 'database'
  | 'transports'
  | 'security'
  | 'backup-recovery'
  | 'reports'
  | 'settings';

export type Locale = 'en' | 'fa';

export type StatusKind = 'Finished' | 'Canceled' | 'Released' | 'Scheduled' | 'Active' | 'Unknown';

export interface SM37JobRecord {
  id: string; // e.g. DEMO-SM37-L83
  name: string; // /BUILD/REORG
  creator: string; // DDIC
  status: 'Finished' | 'Canceled' | 'Released' | 'Scheduled';
  date: string; // 1405/07/26 or —
  time: string; // 00:00:03 or —
  duration: string; // 0
  delay: string; // 3
  client: string; // 000
  source: string; // SM37.md excerpt around L83-L92
}

export interface SAPSystem {
  sid: string;
  name: string;
  role: 'Production' | 'Quality' | 'Development' | 'Solution Manager';
  dbType: string;
  dbHost: string;
  appInstances: number;
  status: 'Healthy' | 'Attention' | 'Critical';
  release: string;
  kernel: string;
  workProcessesTotal: number;
  workProcessesActive: number;
  dialogResponseMs: number;
  lastBackup: string;
  openAlerts: number;
}

export interface LandscapeNode {
  id: string;
  sid: string;
  instanceName: string;
  type: 'PAS' | 'AAS' | 'ASCS' | 'HANA_PRIMARY' | 'HANA_SECONDARY' | 'ROUTER';
  host: string;
  ip: string;
  status: 'Online' | 'Degraded' | 'Offline';
  cpuUsage: number;
  memUsage: number;
  activeUsers: number;
}

export interface AlertRecord {
  id: string;
  source: 'SM21' | 'ST22' | 'RZ20' | 'DB12';
  timestamp: string;
  sid: string;
  severity: 'Critical' | 'Warning' | 'Info';
  message: string;
  program?: string;
  user?: string;
  client?: string;
  errorKey: string;
}

export interface WorkProcessSnapshot {
  no: number;
  type: 'DIA' | 'UPD' | 'ENQ' | 'BTC' | 'SPO' | 'UP2';
  pid: number;
  status: 'Running' | 'Waiting' | 'Hold' | 'Killed';
  reason?: string;
  start?: string;
  err?: number;
  sem?: number;
  cpu?: string;
  time?: number;
  program?: string;
  client?: string;
  user?: string;
  action?: string;
}

export interface DatabaseStatus {
  sid: string;
  dbName: string;
  version: string;
  replicationStatus: 'Active (Sync)' | 'Suspended' | 'Standby';
  memoryUsedGb: number;
  memoryTotalGb: number;
  dataDiskUsedGb: number;
  dataDiskTotalGb: number;
  logDiskUsedGb: number;
  logDiskTotalGb: number;
  savepointDurationSec: number;
  activeLockWaits: number;
  lastFullBackup: string;
}

export interface TransportRequest {
  trNumber: string;
  description: string;
  owner: string;
  sourceSystem: string;
  targetSystem: string;
  returnCode: 'RC0' | 'RC4' | 'RC8' | 'RC12' | 'PENDING';
  status: 'Imported' | 'In Queue' | 'Importing' | 'Failed';
  importDate: string;
}

export interface SecurityUserSession {
  client: string;
  user: string;
  terminal: string;
  tcode: string;
  time: string;
  sessions: number;
  memoryKb: number;
}

export interface AppSettings {
  theme: 'dark' | 'light' | 'system';
  language: Locale;
  fontScale: 'default' | 'compact' | 'large';
  density: 'comfortable' | 'compact';
  layout: 'standard' | 'wide' | 'focused';
  highContrast: boolean;
  reducedMotion: boolean;
  defaultLandingPage: PageId;
  autoRefreshIntervalSec: number;
  connectionProfile: {
    systemSid: string;
    instanceNumber: string;
    hostName: string;
    sapRouter: string;
    clientNumber: string;
    description: string;
  };
}
