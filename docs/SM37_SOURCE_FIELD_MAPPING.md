# SM37 Source-to-Widget Field Mapping
Version: 1.0
Status: partial source-label confirmation; original PDF page mapping and runtime remain pending
Source: user-uploaded SM37.md extraction

## Report scope
- Job overview range shown: 1405/07/25 through 1405/07/26.
- Report metadata says Number of Records passed = 8,062 and Calculated total records = 1. This is not a verified unique job-run count.
- Data from this upload must be labelled with neutral source provenance, never LIVE.

## Field mapping

| Source label | Contract field | Evidence | UI treatment |
|---|---|---|---|
| JobName | job_name | Field confirmed | Searchable primary label |
| Job CreatedBy / Job CreatedB | job_created_by | Label and row values observed | Preserve creator label |
| Status | job_status_raw | Field confirmed | Preserve exact raw status |
| Start date | start_date_raw | Field confirmed | Preserve Jalali text; no implicit conversion |
| Start Time | start_time_raw | Field confirmed | Preserve raw text; timezone unknown |
| Duration(sec.) | duration_seconds_raw | Label confirmed | Parse only after column alignment is checked |
| Delay | delay_raw | Label confirmed | Unit and meaning unknown |
| Cli | client_raw | Label appears truncated | Keep technical label provisional |
| Reason for Delay | reason_for_delay | Label confirmed | Show only when row value exists |
| Spool | spool | Label confirmed | No link until row reference is extracted |
| Job doc | job_document | Label confirmed | No link until row reference is extracted |
| ABAP program / Program name | — | Selection/filter area | Not a per-job field without row evidence |

## Observed raw row statuses
- Finished
- Canceled
- Released
- Scheduled

Ready and Active appear as selection categories in the report, but were not confirmed as row values in the reviewed excerpt. Do not include them in a status distribution until row-level evidence confirms them.

## Fields not evidenced
- Stable job-run ID or unique row key
- System ID/SID, target server, end timestamp
- Capture timestamp and timezone
- Confirmed Delay unit/meaning
- Complete row-level values for spool, job document and reason for delay

## Widget decisions
1. Job table: read-only table can render confirmed raw labels; missing values stay Unknown.
2. Status KPI counts: blocked until complete extraction, row identity and duplicate handling are validated.
3. Status chart: blocked until raw-to-normalized mapping and deduplication are approved.
4. Duration trend/long-running jobs: blocked until duration parsing is verified and a threshold is agreed.
5. Delay ranking: blocked until Delay meaning and unit are confirmed.
6. Home-to-detail: a source-locator key may be used only in DEMO and must not be represented as a native SAP job ID.
7. SM21/ST22/SM13 related evidence: only link records after deterministic key matching or an approved, labelled correlation rule.

## Next validation
- Reconcile extraction labels and sample values to original SM37 PDF pages.
- Manually compare a bounded set of parsed rows to the source.
- Test derived-key collisions and duplicate handling.
- Run route, filter preservation, locale, browser-back and reconciliation tests after the application is runnable.
