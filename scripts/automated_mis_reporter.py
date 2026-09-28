#!/usr/bin/env python3
"""
UrbanPulse Mobility - Automated Daily & Weekly Operations MIS Generator
Satisfies JD responsibilities:
- "Prepare daily, weekly, and monthly MIS reports."
- "Support the team in automating repetitive reporting processes."
- "Strong knowledge of MS Excel / Google Sheets."
"""

import csv
import os
from collections import defaultdict
from datetime import datetime

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(BASE_DIR, "data")
REPORTS_DIR = os.path.join(BASE_DIR, "reports")
os.makedirs(REPORTS_DIR, exist_ok=True)

def load_csv(filename):
    filepath = os.path.join(DATA_DIR, filename)
    with open(filepath, "r", encoding="utf-8") as f:
        return list(csv.DictReader(f))

def generate_operations_mis():
    print("=" * 70)
    print("   URBANPULSE MOBILITY - AUTOMATED OPERATIONS MIS GENERATOR")
    print("=" * 70)

    zones = {r["zone_id"]: r for r in load_csv("urban_zones.csv")}
    requests = load_csv("ride_requests.csv")
    fulfillments = {r["booking_id"]: r for r in load_csv("trip_fulfillment_logs.csv")}

    # Group by (Date, City)
    daily_city_metrics = defaultdict(lambda: {
        "total_requests": 0,
        "completed_trips": 0,
        "driver_cancelled": 0,
        "rider_cancelled": 0,
        "eta_timeout": 0,
        "total_quoted_fare": 0.0,
        "gross_completed_fare": 0.0,
        "driver_payouts": 0.0,
        "platform_net_revenue": 0.0,
        "sum_surge": 0.0,
        "sum_distance_km": 0.0,
        "sum_wait_mins": 0.0,
        "active_drivers": set(),
        "active_vehicles": set(),
    })

    for req in requests:
        bid = req["booking_id"]
        req_dt = req["request_timestamp"]
        date_str = req_dt.split(" ")[0]
        p_zone_id = req["pickup_zone_id"]
        city = zones.get(p_zone_id, {}).get("city", "Unknown")
        status = req["booking_status"]
        quoted_fare = float(req["total_quoted_fare_inr"])
        surge = float(req["surge_multiplier"])

        bucket = daily_city_metrics[(date_str, city)]
        bucket["total_requests"] += 1
        bucket["total_quoted_fare"] += quoted_fare
        bucket["sum_surge"] += surge

        if status == "Completed":
            bucket["completed_trips"] += 1
            if bid in fulfillments:
                f_row = fulfillments[bid]
                try:
                    g_fare = float(f_row["gross_fare_inr"])
                    payout = float(f_row["driver_payout_inr"])
                    dist = float(f_row["actual_distance_km"])
                    wait = float(f_row["pickup_wait_mins"])
                    
                    # Sanitize discrepancies for clean executive reporting
                    if payout > 0 and 0 <= wait <= 60 and 0 < dist < 200:
                        bucket["gross_completed_fare"] += g_fare
                        bucket["driver_payouts"] += payout
                        bucket["platform_net_revenue"] += (g_fare - payout)
                        bucket["sum_distance_km"] += dist
                        bucket["sum_wait_mins"] += wait

                    if f_row["driver_id"]:
                        bucket["active_drivers"].add(f_row["driver_id"])
                    if f_row["vehicle_id"]:
                        bucket["active_vehicles"].add(f_row["vehicle_id"])
                except ValueError:
                    pass
        elif status == "Driver_Cancelled":
            bucket["driver_cancelled"] += 1
        elif status == "Rider_Cancelled":
            bucket["rider_cancelled"] += 1
        elif status == "ETA_Timeout":
            bucket["eta_timeout"] += 1

    # Prepare rows sorted by Date and City
    mis_rows = []
    for (d_str, city), b in sorted(daily_city_metrics.items()):
        reqs = b["total_requests"]
        comps = b["completed_trips"]
        completion_rate = round((comps / reqs * 100), 2) if reqs > 0 else 0.0
        driver_cancel_rate = round((b["driver_cancelled"] / reqs * 100), 2) if reqs > 0 else 0.0
        rider_cancel_rate = round((b["rider_cancelled"] / reqs * 100), 2) if reqs > 0 else 0.0
        avg_surge = round(b["sum_surge"] / reqs, 2) if reqs > 0 else 1.0
        avg_dist = round(b["sum_distance_km"] / comps, 2) if comps > 0 else 0.0
        avg_wait = round(b["sum_wait_mins"] / comps, 2) if comps > 0 else 0.0
        revenue_per_trip = round(b["gross_completed_fare"] / comps, 2) if comps > 0 else 0.0

        mis_rows.append({
            "report_date": d_str,
            "city": city,
            "total_requests": reqs,
            "completed_trips": comps,
            "completion_rate_pct": completion_rate,
            "driver_cancelled_trips": b["driver_cancelled"],
            "driver_cancel_rate_pct": driver_cancel_rate,
            "rider_cancelled_trips": b["rider_cancelled"],
            "rider_cancel_rate_pct": rider_cancel_rate,
            "eta_timeout_trips": b["eta_timeout"],
            "gross_booking_value_inr": round(b["gross_completed_fare"], 2),
            "driver_payouts_inr": round(b["driver_payouts"], 2),
            "platform_net_revenue_inr": round(b["platform_net_revenue"], 2),
            "avg_revenue_per_trip_inr": revenue_per_trip,
            "avg_surge_multiplier": avg_surge,
            "avg_trip_distance_km": avg_dist,
            "avg_pickup_wait_mins": avg_wait,
            "active_drivers_on_road": len(b["active_drivers"]),
            "active_vehicles_deployed": len(b["active_vehicles"]),
        })

    # Save to CSV
    output_csv = os.path.join(REPORTS_DIR, "UrbanPulse_Daily_Operations_MIS.csv")
    fieldnames = list(mis_rows[0].keys())
    with open(output_csv, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(mis_rows)

    print(f"Daily Operations MIS successfully compiled.")
    print(f"Total Daily MIS Records Generated: {len(mis_rows)}")
    print(f"Saved to: {output_csv}")
    print("-" * 70)
    print("Latest 3 Days MIS Sample Preview:")
    for row in mis_rows[-3:]:
        print(f"  {row['report_date']} | {row['city']} | Requests: {row['total_requests']} | Comp%: {row['completion_rate_pct']}% | Net Rev: ₹{row['platform_net_revenue_inr']:,.2f} | Wait: {row['avg_pickup_wait_mins']}m")
    print("=" * 70)

if __name__ == "__main__":
    generate_operations_mis()
