# UrbanPulse Mobility - Fleet Operations & Ride-Hailing Analytics

A data analytics project analyzing urban mobility operations, ride fulfillment rates, cancellation drivers, dynamic surge pricing, and EV fleet economics across 18 urban clusters in **Delhi-NCR, Bengaluru, and Mumbai**.

Built with **SQL (SQLite/PostgreSQL)**, **Python**, **Tableau**, and a lightweight **HTML/JS Web Dashboard**.

---

## 📌 Project Overview & Findings

Over a 45-day operational window (6,800 bookings, 4,960 completed rides across 320 vehicles), this project analyzes:
* **Fulfillment Bottlenecks**: Peak commuter hours (08:00–12:00 and 17:00–22:00) experience a 7–10% drop in completion rates due to localized driver shortages and traffic congestion.
* **Cancellation Diagnostics**: Identified that 52% of cancellations were driver-initiated, with "Drop Location Refusal" (avoiding empty return trips) and "Cash Demands" being the leading causes, resulting in ₹9.56 Lakh in lost Gross Booking Value.
* **Surge Pricing Elasticity**: Discovered that mild-to-moderate surge (1.1x–1.7x) maintained healthy fulfillment (~75%), while extreme surge (1.8x+) caused rider price drop-offs to jump to 14.4% without improving driver availability.
* **EV Fleet Sustainability & Unit Economics**: Electric vehicles operated at ₹1.20/km vs ₹4.80/km for petrol (a 75% fuel cost reduction), covering 40,718 clean kilometers and saving 5.82 metric tonnes of $\text{CO}_2$ emissions.


Live Demo - https://urbanpulse-mobility-analytics.onrender.com/
---

## 📂 Repository Structure

```
.
├── data/                               # Operational datasets & SQLite database
│   ├── urban_zones.csv                 # 18 urban clusters across Delhi-NCR, Bengaluru, Mumbai
│   ├── fleet_vehicles.csv              # 320 fleet vehicles: EV Sedan, Prime Sedan, Auto, Bike
│   ├── driver_partners.csv             # 320 drivers: shifts, ratings, vehicle allocations
│   ├── ride_requests.csv               # 6,800 ride requests: coordinates, fares, surge, status
│   ├── trip_fulfillment_logs.csv       # 4,960 fulfilled rides: wait times, duration, driver payouts
│   ├── cancellation_discrepancy_logs.csv # 1,840 cancellations: root causes, stages, fee disputes
│   └── urbanpulse.db                   # Compiled relational SQLite database
├── sql/                                # 7 Production SQL scripts
│   ├── 01_schema_and_views.sql         # Relational schema DDL, indexes, and reporting views
│   ├── 02_supply_demand_kpis.sql       # Fulfillment rates and demand volume by time slot
│   ├── 03_cancellation_diagnostics.sql # Cancellation ranking and lost revenue (DENSE_RANK)
│   ├── 04_surge_pricing_efficiency.sql # Surge multiplier vs demand elasticity
│   ├── 05_fleet_uptime_and_idle_time.sql # Vehicle utilization rate and mileage leaderboard (RANK)
│   ├── 06_driver_earnings_and_retention.sql # Inter-trip turnaround time using LAG()
│   └── 07_ev_sustainability_unit_economics.sql # EV vs ICE fuel cost per km and CO2 savings
├── tableau/                            # Native Tableau Workbook
│   └── UrbanPulse_Mobility_Operations.twb # Pre-configured Tableau workbook (macOS compatible)
├── scripts/                            # Python automation pipelines
│   ├── generate_urbanpulse_data.py     # Data simulation generator
│   ├── data_quality_auditor.py         # Automated data validation & discrepancy logging
│   ├── automated_mis_reporter.py       # Automated daily/weekly operations MIS compiler
│   └── run_sql_analysis.py             # SQLite test runner executing all SQL scripts
├── reports/                            # Analysis reports & exported MIS
│   ├── UrbanPulse_Daily_Operations_MIS.csv # Daily operations MIS table
│   ├── Data_Discrepancy_Audit_Log.csv  # Flagged telemetry & billing anomalies log
│   └── Executive_Operations_Report.md  # Detailed operational analysis & recommendations
└── dashboard_website/                  # Interactive Web Dashboard
    ├── index.html                      # Interactive dashboard (Tailwind + Chart.js)
    ├── app.js                          # Real-time filtering and visualization logic
    └── dashboard_data.json             # Aggregated operational metrics payload
```

---

## 💻 How to View & Run

### 1. View the Interactive Dashboard
Double-click `dashboard_website/index.html` in Finder (or run `open dashboard_website/index.html`) to open the interactive dashboard in your browser. It includes:
* Live City and Vehicle Category filters.
* Dynamic KPI cards recalculating in real-time.
* 4 interactive charts (Hourly Demand, Cancellation Pareto, Surge Elasticity, Powertrain Share).
* Embedded SQL query explorer and daily MIS data viewer.

### 2. Open the Tableau Workbook
Double-click `tableau/UrbanPulse_Mobility_Operations.twb` on your Mac. It opens directly in **Tableau Desktop** or **Tableau Public** with pre-built calculated fields (`Completion Rate %`, `Net Platform Revenue`, `Avg Wait Mins`) and executive worksheets.

### 3. Run the SQL Queries
To execute all SQL queries against the local SQLite database and view tabular outputs:
```bash
python3 scripts/run_sql_analysis.py
```

### 4. Run the Data Quality Auditor
To run the automated validation script that checks for telematics errors, negative timestamps, and missing IDs:
```bash
python3 scripts/data_quality_auditor.py
```
