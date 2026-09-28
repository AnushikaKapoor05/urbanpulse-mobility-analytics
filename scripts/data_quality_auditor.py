#!/usr/bin/env python3
"""
UrbanPulse Mobility - Data Quality Auditor & Discrepancy Tracker
Directly satisfies the JD responsibility:
"Identify data discrepancies and coordinate with relevant teams for resolution."
"Good attention to detail and data accuracy."
"""

import csv
import os
import sys

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(BASE_DIR, "data")
REPORTS_DIR = os.path.join(BASE_DIR, "reports")
os.makedirs(REPORTS_DIR, exist_ok=True)

def load_csv(filename):
    filepath = os.path.join(DATA_DIR, filename)
    rows = []
    with open(filepath, "r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            rows.append(row)
    return rows

def audit_data_quality():
    print("=" * 70)
    print("   URBANPULSE MOBILITY - AUTOMATED DATA QUALITY AUDIT ENGINE")
    print("=" * 70)

    # Load tables
    zones = {r["zone_id"]: r for r in load_csv("urban_zones.csv")}
    vehicles = {r["vehicle_id"]: r for r in load_csv("fleet_vehicles.csv")}
    drivers = {r["driver_id"]: r for r in load_csv("driver_partners.csv")}
    requests = {r["booking_id"]: r for r in load_csv("ride_requests.csv")}
    fulfillments = load_csv("trip_fulfillment_logs.csv")
    cancellations = load_csv("cancellation_discrepancy_logs.csv")

    discrepancies = []
    disc_id = 1

    # 1. Audit trip_fulfillment_logs
    print("[1/4] Auditing Trip Fulfillment Logs for telemetry & financial anomalies...")
    for row in fulfillments:
        fid = row["fulfillment_id"]
        bid = row["booking_id"]
        did = row["driver_id"]
        
        # Check missing or orphaned driver
        if not did or did.strip() == "":
            discrepancies.append({
                "audit_id": f"ERR_{disc_id:04d}",
                "table_name": "trip_fulfillment_logs",
                "record_id": fid,
                "column_name": "driver_id",
                "invalid_value": "EMPTY_OR_NULL",
                "issue_type": "Orphaned_Trip_Record",
                "severity": "HIGH",
                "recommended_action": "Map trip telemetry to driver GPS logs",
                "action_team": "Driver Operations Team"
            })
            disc_id += 1
        elif did not in drivers:
            discrepancies.append({
                "audit_id": f"ERR_{disc_id:04d}",
                "table_name": "trip_fulfillment_logs",
                "record_id": fid,
                "column_name": "driver_id",
                "invalid_value": did,
                "issue_type": "Foreign_Key_Violation",
                "severity": "HIGH",
                "recommended_action": "Verify driver onboarding active roster",
                "action_team": "Driver Ops / HR"
            })
            disc_id += 1

        # Check negative wait mins
        try:
            wait = float(row["pickup_wait_mins"])
            if wait < 0:
                discrepancies.append({
                    "audit_id": f"ERR_{disc_id:04d}",
                    "table_name": "trip_fulfillment_logs",
                    "record_id": fid,
                    "column_name": "pickup_wait_mins",
                    "invalid_value": str(wait),
                    "issue_type": "Negative_Temporal_Duration",
                    "severity": "MEDIUM",
                    "recommended_action": "Recalculate timestamp difference in ETL",
                    "action_team": "Data Engineering"
                })
                disc_id += 1
        except ValueError:
            pass

        # Check negative payout
        try:
            payout = float(row["driver_payout_inr"])
            if payout < 0:
                discrepancies.append({
                    "audit_id": f"ERR_{disc_id:04d}",
                    "table_name": "trip_fulfillment_logs",
                    "record_id": fid,
                    "column_name": "driver_payout_inr",
                    "invalid_value": str(payout),
                    "issue_type": "Negative_Financial_Payout",
                    "severity": "CRITICAL",
                    "recommended_action": "Freeze negative deduction & audit commission rate",
                    "action_team": "Finance & Payouts"
                })
                disc_id += 1
        except ValueError:
            pass

        # Check extreme GPS outlier (> 200 km in city trip)
        try:
            dist = float(row["actual_distance_km"])
            if dist > 200:
                discrepancies.append({
                    "audit_id": f"ERR_{disc_id:04d}",
                    "table_name": "trip_fulfillment_logs",
                    "record_id": fid,
                    "column_name": "actual_distance_km",
                    "invalid_value": str(dist),
                    "issue_type": "GPS_Telematics_Drift_Outlier",
                    "severity": "HIGH",
                    "recommended_action": "Recalculate route using Google Maps Matrix API",
                    "action_team": "Telematics / Tech"
                })
                disc_id += 1
        except ValueError:
            pass

        # Check zero trip duration with positive distance
        try:
            dur = float(row["trip_duration_mins"])
            dist = float(row["actual_distance_km"])
            if dur <= 0.0 and dist > 2.0:
                discrepancies.append({
                    "audit_id": f"ERR_{disc_id:04d}",
                    "table_name": "trip_fulfillment_logs",
                    "record_id": fid,
                    "column_name": "trip_duration_mins",
                    "invalid_value": str(dur),
                    "issue_type": "Instantaneous_Trip_Anomaly",
                    "severity": "MEDIUM",
                    "recommended_action": "Verify meter start/stop timestamps with socket logs",
                    "action_team": "App Engineering"
                })
                disc_id += 1
        except ValueError:
            pass

    # 2. Audit ride_requests vs trip_fulfillment
    print("[2/4] Cross-auditing Ride Requests against Fulfillment status...")
    completed_bids = {r["booking_id"] for r in fulfillments}
    for bid, req in requests.items():
        if req["booking_status"] == "Completed" and bid not in completed_bids:
            discrepancies.append({
                "audit_id": f"ERR_{disc_id:04d}",
                "table_name": "ride_requests",
                "record_id": bid,
                "column_name": "booking_status",
                "invalid_value": "Completed_Without_Fulfillment",
                "issue_type": "Missing_Fulfillment_Record",
                "severity": "HIGH",
                "recommended_action": "Verify if ride was completed offline or corrupted",
                "action_team": "Operations Escalations"
            })
            disc_id += 1

    # 3. Audit Cancellations for Fee Disputes
    print("[3/4] Auditing Cancellation Fees & Disputes...")
    disputed_fees = 0
    for row in cancellations:
        if row["dispute_flag"] == "Y" and float(row["cancellation_fee_charged_inr"]) > 0:
            disputed_fees += 1

    print(f"      Total customer cancellation fee disputes flagged: {disputed_fees}")

    # 4. Save Audit Report
    report_file = os.path.join(REPORTS_DIR, "Data_Discrepancy_Audit_Log.csv")
    fieldnames = [
        "audit_id", "table_name", "record_id", "column_name", "invalid_value", 
        "issue_type", "severity", "recommended_action", "action_team"
    ]
    with open(report_file, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(discrepancies)

    print("[4/4] Generating Discrepancy Log Export...")
    print(f"\nAUDIT SUMMARY:")
    print(f"  - Total Operational Records Scanned: {len(requests) + len(fulfillments) + len(cancellations):,}")
    print(f"  - Total Data Discrepancies Identified: {len(discrepancies)}")
    print(f"  - Discrepancy Log exported to: {report_file}")
    print("-" * 70)
    for d in discrepancies:
        print(f"  [{d['severity']}] {d['issue_type']} in {d['table_name']} (ID: {d['record_id']}) -> Assigned to: {d['action_team']}")
    print("=" * 70)
    return discrepancies

if __name__ == "__main__":
    audit_data_quality()
