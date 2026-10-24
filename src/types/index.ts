export type PageId =
  | 'home'
  | 'landscape'
  | 'performance'
  | 'jobs-processes'
  | 'database'
  | 'security'
  | 'alerts-events'
  | 'interfaces-connectivity'
  | 'transports'
  | 'backup-recovery'
  | 'system-operations'
  | 'reports'
  | 'settings';

export type Locale = 'en' | 'fa';

export type SystemStatus = 'Running' | 'Warning' | 'Critical' | 'Stopped';

export interface LandscapeSystemItem {
  id: string; // PRD01
  name: string;
  role: 'Production' | 'Quality' | 'Development' | 'Test';
  status: SystemStatus;
  availabilityPercent: number; // e.g. 100, 98, 62, 91
  lastUpdate: string; // 14:32
  latencyMs: number; // 14
  host: string;
  instancesCount: number;
  dbHost: string;
}

export interface MetricSparkline {
  name: string;
  value: number;
  unit: string;
  changePercent: number;
  isPositive: boolean; // green vs red
  points: number[];
}

export interface PriorityWarningItem {
  id: string;
  title: string;
  description: string;
  severity: 'Critical' | 'Warning' | 'Info';
  systemId: string;
  time: string;
  tags: string[];
  source: string;
}

export interface DBConsumerItem {
  userOrProgram: string;
  cpuPercent: number;
  memoryGb: number;
  time: string;
}

export interface RiskCategoryItem {
  category: string;
  percentage: number;
}

export interface ConnectivityItem {
  type: string;
  total: number;
  errors: number;
  status: 'Healthy' | 'Warning' | 'Critical';
}

export interface SM37JobRecord {
  id: string; // e.g. REF-SM37-L83
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
