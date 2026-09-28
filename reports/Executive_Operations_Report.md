# UrbanPulse Mobility - Executive Operations & Business Intelligence Report

**Author**: Data & Business Intelligence Operations Team  
**Target Audience**: VP of Operations, Head of Business Intelligence, Fleet Strategy Committee  
**Timeframe**: 45-Day Operational Window (13,600 Records Scanned Across Delhi-NCR, Bengaluru, Mumbai)  

---

## 1. Executive Summary & Core Metrics

Over the 45-day evaluation period, **UrbanPulse Mobility** processed **6,800 ride requests** across 18 high-density urban clusters, realizing **₹24.35 Lakh in Gross Completed Booking Value** and **₹4.87 Lakh in Net Platform Revenue** (20% commission model).

However, rigorous data analysis revealed significant revenue leakage and supply-demand friction:
* **Realized Fulfillment Rate**: **72.9%** (4,960 completed rides out of 6,800 requested).
* **Lost Gross Booking Value (GBV)**: **₹9.56 Lakh** lost to unfulfilled bookings (1,840 cancelled or timed-out rides).
* **Driver Cancellations**: **13.4%** of all requests (912 rides), representing **52.3% of total revenue leakage**.
* **Average Pickup Wait Time**: **8.1 minutes** across the network, peaking at **12.4 minutes** in suburban transit corridors.
* **ESG Sustainability Impact**: The Electric Vehicle (EV) fleet covered **40,718 clean kilometers**, displacing **2,519 liters of fossil fuel** and averting **5.82 metric tonnes of $\text{CO}_2$ emissions** while lowering operating energy costs by **75%** compared to petrol counterparts.

---

## 2. Supply-Demand Imbalances & Operational Bottlenecks

### Key Insight: Peak Hour Fulfillment Compression
Fulfillment efficiency dropped sharply during peak commuter hours:
* **Morning Peak (08:00 - 11:59)**: Completion rate compressed to **68.4%** in Delhi-NCR and **69.1%** in Bengaluru. High driver en-route traffic and tight driver supply resulted in average wait times exceeding 10.5 minutes.
* **Evening Rush (17:00 - 21:59)**: Highest booking density (32% of daily volume), but completion rate hovered at **70.2%** due to driver destination cherry-picking.
* **Afternoon Normal (12:00 - 16:59)**: Highest operational stability with **78.0% completion rate** and average pickup wait time under 6.8 minutes.

```
Hour-by-Hour Diagnostic:
08:00 - 10:00: Supply Deficit -> High Wait Times -> Surge Escalation
12:00 - 16:00: Equilibrium -> Optimal Completion Rate (78%)
18:00 - 21:00: Concentrated Tech Park Outflow -> Driver Drop-location Refusals
```

---

## 3. Cancellation Diagnostics: Root Causes & Revenue Leakage

Using SQL window functions (`DENSE_RANK()`) and Pareto analysis, cancellations were categorized across 3 initiators:

| Rank | Initiator | Primary Cancellation Reason | Incidents | Lost GBV (₹) | % of Total Leakage | Root Cause Diagnosis |
| :---: | :--- | :--- | :---: | :---: | :---: | :--- |
| **1** | **Driver** | `Driver Refused Drop Location` | 247 | ₹1,23,871 | 12.95% | Drivers avoid deadhead return trips from peripheral zones without return rides. |
| **2** | **Driver** | `Driver Demanded Cash Offline` | 221 | ₹1,16,251 | 12.16% | Driver commission avoidance; attempting to bypass 20% platform take-rate. |
| **3** | **Driver** | `Traffic Gridlock En Route` | 226 | ₹1,14,152 | 11.94% | Prolonged ingress times into high-congestion zones (e.g. Gurugram Cyber City, Silk Board). |
| **4** | **Driver** | `Vehicle Mechanical Issue` | 218 | ₹1,08,672 | 11.36% | High battery drain or maintenance downtime during high ambient heat. |
| **5** | **Rider** | `High ETA / Long Wait Time` | 194 | ₹1,02,322 | 10.70% | Passenger cancels when assigned driver ETA exceeds 8 minutes. |
| **6** | **Rider** | `Booked Alternative Ride` | 172 | ₹89,450 | 9.35% | Multi-apping passengers booking concurrently on competing platforms. |

> [!WARNING]
> **Cancellation Fee Dispute Risk**: 85 customer cancellation fee charges were flagged with dispute requests, primarily occurring when drivers were stationary or moving in reverse while en-route.

---

## 4. Dynamic Surge Pricing: Elasticity & Conversion Efficiency

Our analysis evaluated the conversion rate and consumer price resistance across 4 distinct surge multiplier tiers:

```
┌────────────────────────┬─────────────┬──────────────┬───────────────┬─────────────────┐
│ Surge Tier             │ Requests    │ Request Share│ Completion %  │ Rider Drop-off% │
├────────────────────────┼─────────────┼──────────────┼───────────────┼─────────────────┤
│ 1. Base (1.0x)         │ 2,558       │ 37.62%       │ 74.20%        │ 9.97%           │
│ 2. Mild (1.1x - 1.3x)  │ 2,121       │ 31.19%       │ 75.15%        │ 8.86%           │
│ 3. High (1.4x - 1.7x)  │ 839         │ 12.34%       │ 75.21%        │ 8.94%           │
│ 4. Extreme (1.8x+)     │ 1,282       │ 18.85%       │ 65.29%        │ 14.43%          │
└────────────────────────┴─────────────┴──────────────┴───────────────┴─────────────────┘
```

### Strategic Takeaways on Surge Pricing:
1. **The Sweet Spot**: Surge between **1.1x and 1.7x** maintains high conversion (~75.2%) while successfully incentivizing driver supply and boosting average ticket size.
2. **The Elasticity Cliff (1.8x+)**: Once surge exceeds 1.8x, **completion drops by 10 percentage points (from 75.2% to 65.3%)**, and rider price-resistance cancellations jump by **62%**. Extreme surge suppresses demand without generating additional completed trips.

---

## 5. Fleet Unit Economics & ESG Sustainability Analysis

A comparative audit of powertrain unit economics across our 320 fleet vehicles revealed distinct cost structures:

| Metric | Electric (EV) | Compressed Natural Gas (CNG) | Petrol (ICE) |
| :--- | :---: | :---: | :---: |
| **Total Trips Completed** | 2,597 | 1,227 | 1,134 |
| **Total Operational KM** | 40,718.7 km | 19,600.2 km | 17,814.2 km |
| **Energy/Fuel Cost per KM** | **₹1.20 / km** | **₹2.80 / km** | **₹4.80 / km** |
| **Total Operating Fuel Expense** | ₹48,862 | ₹54,881 | ₹85,508 |
| **Realized Revenue per KM** | ₹31.21 / km | ₹32.56 / km | ₹29.55 / km |
| **Fossil Fuel Saved (Liters)** | **2,519.2 L** | 0.0 L | 0.0 L |
| **CO2 Avoided (Metric Tonnes)** | **5.82 Tonnes** | Baseline | Baseline |

* **Economic Advantage**: EV operations deliver a **75.0% energy cost reduction** per kilometer compared to Petrol vehicles and **57.1% reduction** compared to CNG.
* **Environmental Impact**: Scaling the EV fleet to 80% of active operations will avert an estimated **180+ metric tonnes of $\text{CO}_2$ annually**.

---

## 6. Automated Data Quality Audit Findings

Our automated anomaly detection engine (`data_quality_auditor.py`) scanned 13,600 operational records and successfully flagged 5 critical discrepancies:
1. `FUL_000142`: Negative pickup wait time (-5.0 mins) caused by un-synchronized GPS device clock $\rightarrow$ routed to Data Engineering.
2. `FUL_000993`: 1,250 km telematics drift outlier in intra-city ride $\rightarrow$ routed to Telematics Team for route recalculation.
3. `FUL_001499`: Negative financial driver payout (-₹150.00) $\rightarrow$ frozen and routed to Finance & Payouts.
4. `FUL_001609`: Orphaned trip fulfillment record with missing `driver_id` $\rightarrow$ routed to Driver Operations.
5. `FUL_001958`: Instantaneous trip record (0.0 mins duration for positive distance) $\rightarrow$ routed to App Engineering.

---

## 7. Actionable Recommendations for Operations Leadership

1. **Implement Return-Trip Guarantee for Peripheral Drop-offs**:
   * Introduce a 15% incentive surcharge on drop-offs to suburban zones (e.g., Greater Noida, Sohna Road) to eliminate the #1 driver refusal cause (`Driver Refused Drop Location`).
2. **Cap Dynamic Surge Multiplier at 1.7x**:
   * Suppress surge multipliers above 1.7x in high-demand zones. Replace extreme surge with **Driver Positioning Bounties** to draw driver supply without triggering rider price drop-off.
3. **Automate Offline Cash Fraud Detection**:
   * Flag driver partners with above-average cancellation rates under `Driver Demanded Cash Offline` for automated KYC warning and temporary dispatch cooldowns.
4. **Transition Remaining ICE Vehicles to EV Fleet**:
   * Given the ₹3.60/km operating cost delta between Petrol and EV, transitioning 100 Petrol 2-wheelers to EV Bike Taxis will yield **₹8.4 Lakh in annual fleet operational savings**.
