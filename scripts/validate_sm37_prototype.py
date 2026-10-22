#!/usr/bin/env python3
"""Offline static acceptance checks for the SM37 Home-to-Detail prototype.

Run from repository root: python3 scripts/validate_sm37_prototype.py
This validates the committed DEMO artifact only; it does not claim browser or SAP integration tests.
"""
from __future__ import annotations
import json
from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
FIXTURE = ROOT / "fixtures/sm37-extracted-snapshot.sample.json"
HTML = ROOT / "prototypes/sm37-home-to-detail.html"

def main() -> int:
    failures: list[str] = []
    checks: list[str] = []
    try:
        fixture = json.loads(FIXTURE.read_text(encoding="utf-8"))
        checks.append("fixture parses as JSON")
    except Exception as exc:
        print(f"FAIL: fixture JSON parse: {exc}")
        return 1

    records = fixture.get("records")
    if fixture.get("data_state") == "DEMO" and isinstance(records, list) and records:
        checks.append("fixture explicitly DEMO and has records")
    else:
        failures.append("fixture must be DEMO and contain records")

    ids = [r.get("record_id") for r in records or []]
    if len(ids) == len(set(ids)) and all(str(x).startswith("DEMO-SM37-") for x in ids):
        checks.append("sample locators are unique and DEMO-prefixed")
    else:
        failures.append("sample locators must be unique and DEMO-prefixed")

    allowed_statuses = {"Finished", "Canceled", "Released", "Scheduled"}
    statuses = {r.get("job_status_raw") for r in records or []}
    if statuses and statuses <= allowed_statuses:
        checks.append("raw status values remain in observed set")
    else:
        failures.append(f"unexpected or missing raw status values: {sorted(map(str, statuses))}")

    if fixture.get("system_id") is None and fixture.get("observed_at") is None:
        checks.append("unknown system ID and capture timestamp remain null")
    else:
        failures.append("unknown system ID/capture timestamp must not be fabricated")

    for row in records or []:
        if row.get("record_id_kind") != "derived-source-locator" or not row.get("source_locator"):
            failures.append(f"row {row.get('record_id')} lacks derived-locator provenance")
        if row.get("job_status_raw") == "Released" and row.get("start_date_raw") is None and row.get("start_time_raw") is None:
            checks.append("unscheduled start time remains unknown")
            break

    try:
        html = HTML.read_text(encoding="utf-8")
        checks.append("prototype HTML readable")
    except Exception as exc:
        print(f"FAIL: prototype read: {exc}")
        return 1

    required = {
        "Home-to-detail route affordance": re.search(r"Home|خانه", html, re.I),
        "English/Persian labels": re.search(r"فارسی|Persian", html, re.I),
        "read-only / no execution warning": re.search(r"read.only|no execution|بدون اجرای|فقط خواندنی", html, re.I),
        "source provenance": re.search(r"source_locator|source locator|SM37\.md", html, re.I),
        "search/filter controls": re.search(r"<input", html, re.I) and re.search(r"<select", html, re.I),
        "details drawer/panel": re.search(r"drawer|detail-panel|details", html, re.I),
    }
    for label, ok in required.items():
        (checks if ok else failures).append(label)

    # Avoid false confidence: operational summary charts/KPIs must not be introduced in this slice.
    if re.search(r"\b(live SAP|LIVE DATA)\b", html, re.I):
        failures.append("prototype must not claim live SAP data")
    else:
        checks.append("no explicit live-SAP claim")
    if fixture.get("reported_records_passed") == 8062 and len(records or []) < 8062:
        checks.append("reported source total is not confused with sample row count")

    print("SM37 prototype static validation")
    for item in checks:
        print(f"PASS: {item}")
    for item in failures:
        print(f"FAIL: {item}")
    print(f"RESULT: {'PASS' if not failures else 'FAIL'} ({len(checks)} checks, {len(failures)} failures)")
    print("SCOPE: static repository checks only; browser interaction and SAP integration are not tested.")
    return 1 if failures else 0

if __name__ == "__main__":
    sys.exit(main())
