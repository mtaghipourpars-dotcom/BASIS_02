# BASIS_02 — SRC-to-Widget Field Mapping
Version: 1.0
Status: source inventory reviewed; field-level validation is intentionally conservative
Source repository: https://github.com/mtaghipourpars-dotcom/BASIS_01/tree/main/SRC

## Evidence rule
A file's presence proves only that an artifact exists. It does not prove a field is present, parsed, current, complete or connected live. A widget is "field-confirmed" only after the source content is inspected and the field's meaning/unit/scope is recorded. This mapping separates:
- ARTIFACT_CONFIRMED: filename is present in SRC.
- FIELD_CANDIDATE: likely field/column based on the SAP report purpose; must be checked against the actual artifact.
- FIELD_CONFIRMED: directly inspected and documented.
- LIVE_CONNECTED: live endpoint is implemented and tested.
At this revision, repository listing confirms the artifacts below, but this review has not extracted the binary PDF/XLSX/image payloads into a field-level schema. Therefore no PDF/XLSX field is falsely labeled FIELD_CONFIRMED or LIVE_CONNECTED.

## SRC inventory
| Artifact(s) | Format | Proposed domain | What can be responsibly claimed now |
|---|---|---|---|
| SM51.pdf | PDF | Systems / Landscape | Report artifact exists; exact columns/status meanings pending extraction |
| SM04.xlsx | XLSX | Sessions / Security operations | Spreadsheet exists; header and data types pending workbook inspection |
| SM12.xlsx | XLSX | Locks | Spreadsheet exists; header and key fields pending workbook inspection |
| SM37.pdf | PDF | Jobs | Report artifact exists; exact job rows/columns/statuses pending extraction |
| SM50.pdf, SM66.pdf | PDF | Work processes | Report artifacts exist; row fields and capture scope pending extraction |
| ST03N.pdf | PDF | Workload | Report artifact exists; report variant, period, measures and units pending extraction |
| ST03N-02.stats, ST03N-03.stats | .stats | Workload statistics | Files exist; format/schema/encoding/units pending parsing; do not assume CSV/JSON |
| ST06.pdf, ST06-01.pdf, ST06-02.pdf, ST06-03.pdf | PDF | Host/OS | Artifacts exist; metrics and units pending extraction |
| SM21.pdf | PDF | System log | Artifact exists; event fields/severity and capture window pending extraction |
| RZ20.pdf | PDF | Monitoring tree | Artifact exists; monitor names, values and thresholds pending extraction |
| ST22.pdf | PDF | ABAP dumps | Artifact exists; dump identity/fields pending extraction |
| SM13.pdf | PDF | Update records | Artifact exists; update status/fields pending extraction |
| SMGW.pdf | PDF | Gateway/connectivity | Artifact exists; connection fields and snapshot scope pending extraction |
| DB12.pdf, DB12-01.png…DB12-11.png | PDF/images | Backup/database operations | Artifacts exist; status, timestamps, backup types and result fields pending visual/text inspection |
| STMS.pdf | PDF | Transports | Artifact exists; request/import fields and status meanings pending extraction |
| dashboard.png | Image | Reference UI | Visual reference only; never a telemetry source |
| sapchart_dbg.txt, test.txt | Text | Miscellaneous | Not sufficient as operational telemetry contracts |

## Proposed widget-to-source map
"Candidate" fields below are semantic targets, not assertions that these columns were found in the artifact. Confirm against each report before implementation.

| Widget / metric | Source | Candidate fields needed | Visualization decision |
|---|---|---|---|
| Landscape system inventory | SM51.pdf | system/SID, instance, host, reported state, capture time | Table/topology after fields and relationships are confirmed |
| Session list | SM04.xlsx | user, terminal/client, transaction, start time, instance | Table; no trend unless multiple timestamped snapshots exist |
| Lock list | SM12.xlsx | lock owner/user, lock object/key, time/status if present | Table; counts only after unique-record rule |
| Job list | SM37.pdf | job name/ID, status, start/end, duration, user, target/server | Table after field extraction; status chart only if status categories are confirmed |
| Job duration trend | SM37.pdf | multiple dated job records, start/end or duration, stable job identity | Not yet approved; requires multiple records and time scope |
| Work Process snapshot | SM50.pdf / SM66.pdf | instance, process type/status, runtime, user/action if present | Table/status distribution if categories verified; not automatically a trend |
| Workload trend | ST03N-02.stats / ST03N-03.stats / ST03N.pdf | period/time bucket, workload/response measure, unit, aggregation scope | Trend only after schema/units/period and comparable buckets are verified |
| Host resource metrics | ST06 family | metric name, value, unit, host, observation time | KPI/trend only if values and timestamps exist and are comparable |
| System events | SM21.pdf | event time, message/severity, system/instance, source identifier | Timeline/table after field extraction |
| Monitor values | RZ20.pdf | monitor/metric name, value, unit, threshold/status, time | KPI/status only after semantics and thresholds are verified |
| ABAP dumps | ST22.pdf | dump time, user, program, error/runtime error, system | Table and detail drawer after extraction |
| Update errors | SM13.pdf | time, user, update status, transaction/key, message | Table; counts by status only after status mapping |
| Gateway connections | SMGW.pdf | connection/partner/host/status/time if present | Table only if source contains rows; do not infer network health |
| Backup records | DB12.pdf + DB12 images | backup type, start/end, result, database, timestamp | History table; trend only with multiple comparable dated records |
| Transport/import records | STMS.pdf | request ID, target, status, import time, message/log | Table and status distribution after field extraction |

## Home-to-detail mapping
| Home widget | Authoritative detail | Reconciliation key |
|---|---|---|
| Landscape Overview | /landscape and /systems | same system/instance inventory, selected environment and observation scope |
| Active Alerts / Recent Events | /alerts-events | same event identity, time window, severity mapping and deduplication policy |
| Key Performance Metrics / System Resources | /performance | same metric ID, unit, host/instance, period and aggregation |
| Job Monitoring / Open Jobs | /jobs-processes | same job scope, status mapping, window and deduplication rule |
| Database Status | /database | same database identity, metric and observation time |
| Storage & Backup | /backup-recovery and /database | distinguish storage facts from backup facts; same source timestamp |
| Connectivity | /systems (connectivity section) | same gateway source and observation window |
| Transport status if surfaced | /transports | same request/import ID and target |
| Security/session summaries if surfaced | /security | same user/session/lock scope and snapshot time |

## Chart approval gates
- Bar/pie chart: categorical field exists, category mapping is approved, denominator/scope is clear.
- Line chart: at least two comparable timestamped observations exist; unit and aggregation are stable; missing periods render as gaps.
- Gauge/progress ring: numeric value, scale, thresholds and interpretation are approved. No arbitrary "health percentage".
- Top-N/ranking: comparable measure exists for every included item; UNKNOWN is not ranked as healthy.
- Correlation: deterministic shared key or an explicitly approved correlation rule; temporal proximity alone is only a clue.
- Counts: define record uniqueness, filter scope, time window, and treatment of duplicates.

## Next evidence gate
Inspect the actual PDF page images and workbook sheets/headers. Record field names, source page/sheet, units, sample count, snapshot/window, and whether multiple observations exist. Then promote only verified rows from FIELD_CANDIDATE to FIELD_CONFIRMED. Live integration remains a separate gate requiring a real endpoint and connectivity test.
