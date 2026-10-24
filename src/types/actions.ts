import { PageId } from './index';

export type OperationalMode = 'M' | 'W' | 'E';

export type TargetEntityType =
  | 'system'
  | 'instance'
  | 'work_process'
  | 'job_definition'
  | 'job_run'
  | 'database'
  | 'storage_volume'
  | 'user'
  | 'session'
  | 'lock'
  | 'security_event'
  | 'log_record'
  | 'dump'
  | 'update_record'
  | 'rfc_destination'
  | 'idoc'
  | 'queue'
  | 'http_service'
  | 'transport_request'
  | 'transport_task'
  | 'backup'
  | 'recovery_point'
  | 'runbook'
  | 'workflow'
  | 'operational_issue';

export type ActionCode =
  // Common M Actions
  | 'SYSTEM_DETAILS'
  | 'INSTANCE_DETAILS'
  | 'WORK_PROCESS_DETAILS'
  | 'STATUS'
  | 'REFRESH'
  | 'METRIC_DETAILS'
  | 'TREND'
  | 'COMPARE'
  | 'WORK_PROCESSES'
  | 'CURRENT_USER_ACTION_DETAILS'
  | 'JOB_DETAILS'
  | 'STEP'
  | 'JOB_LOG'
  | 'SPOOL'
  | 'SCHEDULE_START_CONDITION'
  | 'JOB_DOCUMENTATION'
  | 'RELATED_EVENTS'
  | 'DATABASE_DETAILS'
  | 'CAPACITY_DETAILS'
  | 'SPACE_USAGE'
  | 'RESOURCE_PERFORMANCE_DETAILS'
  | 'RELATED_BACKUPS'
  | 'SESSION_DETAILS'
  | 'USER_TRANSACTION_DETAILS'
  | 'LOCK_DETAILS'
  | 'LOCK_OWNER_OBJECT'
  | 'SECURITY_EVENT_DETAILS'
  | 'LOG_DETAILS'
  | 'FILTER_SEARCH'
  | 'DUMP_DETAILS'
  | 'DUMP_SOURCE_CONTEXT'
  | 'UPDATE_DETAILS'
  | 'RELATED_RECORDS'
  | 'CONNECTION_DETAILS'
  | 'RFC_DESTINATION_DETAILS'
  | 'IDOC_DETAILS'
  | 'QUEUE_DETAILS'
  | 'HTTP_SERVICE_DETAILS'
  | 'REQUEST_DETAILS'
  | 'TASK_DETAILS'
  | 'OBJECT_LIST'
  | 'TRANSPORT_LOG'
  | 'IMPORT_HISTORY'
  | 'BACKUP_DETAILS'
  | 'BACKUP_LOG'
  | 'TARGET_DETAILS'
  | 'RECOVERY_POINT_DETAILS'
  | 'RESTORE_TEST_DETAILS'
  | 'ISSUE_DETAILS'
  | 'RELATED_SYSTEMS'
  | 'RELATED_JOBS_EVENTS'
  | 'OPEN_SOURCE_ISLAND'
  | 'RUNBOOK_DETAILS'
  | 'VERIFY_OUTCOME'
  // W Warning Lifecycle Actions
  | 'ACKNOWLEDGE_ALERT'
  | 'ASSIGN_ALERT'
  | 'ESCALATE_ALERT'
  | 'SNOOZE_ALERT'
  | 'SUPPRESS_ALERT'
  | 'RESOLVE_ALERT'
  // Landscape E Actions
  | 'START_SERVICE'
  | 'STOP_SERVICE'
  | 'RESTART_SERVICE'
  | 'START_INSTANCE'
  | 'STOP_INSTANCE'
  | 'RESTART_INSTANCE'
  // Performance E Actions
  | 'CANCEL_TERMINATE_PROCESS'
  | 'CHANGE_CONFIGURATION'
  | 'EXECUTE_APPROVED_RUNBOOK'
  // Jobs E Actions (Definition vs Run)
  | 'RELEASE'
  | 'CHANGE_RESCHEDULE'
  | 'DELETE_DEFINITION'
  | 'COPY'
  | 'CREATE_SCHEDULE'
  | 'START_IMMEDIATELY'
  | 'STOP'
  | 'CANCEL'
  | 'REPEAT_RERUN'
  // Database E Actions
  | 'RUN_DIAGNOSTICS'
  | 'START_STOP_RESTART_DATABASE'
  | 'EXTEND_RESIZE_STORAGE'
  | 'DROP_DELETE'
  // Security E Actions
  | 'LOCK_USER'
  | 'UNLOCK_USER'
  | 'END_SESSION'
  | 'REMOVE_LOCK'
  | 'CHANGE_ROLE_AUTHORIZATION'
  | 'CHANGE_SECURITY_SETTING'
  // Logs & Events E Actions
  | 'REPROCESS_UPDATE'
  | 'RESTART_RELATED_SERVICE'
  | 'CLEANUP_DELETE'
  // Interfaces E Actions (TEST_CONNECTION is active execution)
  | 'TEST_CONNECTION'
  | 'CHANGE_DESTINATION_CONFIGURATION'
  | 'DISCONNECT_RECONNECT'
  | 'REPROCESS_IDOC'
  | 'ACTIVATE_DEACTIVATE_QUEUE'
  | 'REPROCESS_QUEUE'
  | 'START_STOP_RESTART_HTTP_SERVICE'
  // Transports E Actions
  | 'RELEASE_TASK_REQUEST'
  | 'ADD_TO_IMPORT_QUEUE'
  | 'IMPORT'
  | 'IMPORT_AGAIN'
  | 'CHANGE_MODIFY'
  | 'DELETE'
  | 'EXECUTE_APPROVED_RECOVERY'
  // Backup & Recovery E Actions
  | 'RETRY_BACKUP'
  | 'CANCEL_BACKUP'
  | 'CHANGE_BACKUP_SCHEDULE'
  | 'CHANGE_TARGET_CONFIGURATION'
  | 'RESTORE'
  | 'RECOVERY_VALIDATION'
  | 'FAILOVER'
  // System Operations E Actions
  | 'PREFLIGHT_CHECK'
  | 'EXECUTE_RUNBOOK'
  | 'START_WORKFLOW'
  | 'CANCEL_WORKFLOW'
  | 'RETRY_FAILED_STEP';

export type JobActionCategory = 'definition' | 'run';

export interface ActionDefinition {
  actionId: string; // e.g. ACT-JOB-001
  version: string; // e.g. 1.0.0
  islandId: PageId;
  actionCode: ActionCode;
  mode: OperationalMode; // 'M' | 'W' | 'E'
  name: string;
  nameFa: string;
  description: string;
  descriptionFa: string;
  entityType: TargetEntityType;
  jobCategory?: JobActionCategory; // Set for Job actions: 'definition' vs 'run'
  purpose: string;
  purposeFa: string;
  expectedImpact: string;
  expectedImpactFa: string;
  riskLevel: 'Critical' | 'High' | 'Medium' | 'Low';
  preconditions: string[];
  preconditionsFa: string[];
  requiredPermissions: string[]; // SAP Auth objects like S_BTCH_JOB, S_ADMI_FCD
  approvalRequired: boolean;
  changeWindowRequired: boolean;
  adapterStatus: 'Not implemented' | 'Phase 1 read-only' | 'Gated';
  isExecutableInPhase1: boolean; // Strictly false for all E actions
  disabledReason: string;
  disabledReasonFa: string;
  rollbackPlan: string;
  rollbackPlanFa: string;
  verificationCriteria: string;
  verificationCriteriaFa: string;
  auditFields?: {
    actorRequirement: string;
    targetIdentity: string;
    correlationIdScheme: string;
  };
}
