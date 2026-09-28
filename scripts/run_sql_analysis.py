#!/usr/bin/env python3
"""
UrbanPulse Mobility - SQLite Test & Execution Pipeline
Loads CSV datasets into an SQLite database and executes all 7 SQL analytics scripts.
Guarantees 100% syntactical correctness and outputs clean results.
"""

import csv
import os
import sqlite3

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(BASE_DIR, "data")
SQL_DIR = os.path.join(BASE_DIR, "sql")
DB_PATH = os.path.join(DATA_DIR, "urbanpulse.db")

def init_database():
    if os.path.exists(DB_PATH):
        os.remove(DB_PATH)
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    # 1. Run Schema Setup
    schema_file = os.path.join(SQL_DIR, "01_schema_and_views.sql")
    with open(schema_file, "r", encoding="utf-8") as f:
        schema_sql = f.read()
    cursor.executescript(schema_sql)

    # 2. Populate tables from CSVs
    table_csv_map = [
        ("urban_zones", "urban_zones.csv"),
        ("fleet_vehicles", "fleet_vehicles.csv"),
        ("driver_partners", "driver_partners.csv"),
        ("ride_requests", "ride_requests.csv"),
        ("trip_fulfillment_logs", "trip_fulfillment_logs.csv"),
        ("cancellation_discrepancy_logs", "cancellation_discrepancy_logs.csv"),
    ]

    for table, csv_name in table_csv_map:
        csv_path = os.path.join(DATA_DIR, csv_name)
        with open(csv_path, "r", encoding="utf-8") as f:
            reader = csv.reader(f)
            header = next(reader)
            placeholders = ",".join(["?"] * len(header))
            sql = f"INSERT INTO {table} VALUES ({placeholders})"
            cursor.executemany(sql, reader)
        print(f"Loaded data into table '{table}' from {csv_name}")

    conn.commit()
    return conn

def run_queries(conn):
    cursor = conn.cursor()
    sql_files = [
        ("02_supply_demand_kpis.sql", "Supply-Demand Fulfillment by City & Time Slot"),
        ("03_cancellation_diagnostics.sql", "Cancellation Root Cause & Revenue Leakage Ranking"),
        ("04_surge_pricing_efficiency.sql", "Surge Pricing Multiplier vs Conversion Efficiency"),
        ("05_fleet_uptime_and_idle_time.sql", "Fleet Utilization & Asset Productivity"),
        ("06_driver_earnings_and_retention.sql", "Driver Partner Earnings & Productivity"),
        ("07_ev_sustainability_unit_economics.sql", "EV Sustainability & Powertrain Unit Economics"),
    ]

    print("\n" + "=" * 75)
    print("   URBANPULSE MOBILITY - EXECUTING SQL ANALYTICS SUITE")
    print("=" * 75)

    for filename, title in sql_files:
        filepath = os.path.join(SQL_DIR, filename)
        with open(filepath, "r", encoding="utf-8") as f:
            query = f.read()

        print(f"\n>>> Running: {filename} [{title}]")
        print("-" * 75)

        # Split multiple queries if separated by semicolon
        statements = [s.strip() for s in query.split(";") if s.strip()]
        for stmt in statements:
            # Skip pure comments or blank statements
            clean_stmt = "\n".join([line for line in stmt.splitlines() if not line.strip().startswith("--")]).strip()
            if not clean_stmt:
                continue

            cursor.execute(clean_stmt)
            headers = [desc[0] for desc in cursor.description] if cursor.description else []
            rows = cursor.fetchall()

            # Pretty print first 5 rows
            header_str = " | ".join([f"{h[:20]:<20}" for h in headers[:6]])
            print(header_str)
            print("-" * len(header_str))
            for row in rows[:5]:
                row_str = " | ".join([f"{str(v)[:20]:<20}" for v in row[:6]])
                print(row_str)
            if len(rows) > 5:
                print(f"... [{len(rows) - 5} more rows returned]")
            print(f"Total Rows: {len(rows)}")

    print("\n" + "=" * 75)
    print("   ALL SQL ANALYTICS QUERIES EXECUTED WITH 100% SUCCESS")
    print("=" * 75)

if __name__ == "__main__":
    connection = init_database()
    run_queries(connection)
    connection.close()
