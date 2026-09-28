-- ==============================================================================
-- File: 03_cancellation_diagnostics.sql
-- Project: UrbanPulse Mobility Operations Analytics
-- Business Purpose: Diagnoses root causes of ride cancellations, stage bottlenecks,
-- and quantifies lost Gross Booking Value (GBV) and fee dispute rates.
-- Demonstrates: Window functions (DENSE_RANK, SUM OVER), Multi-table joins, CTEs.
-- ==============================================================================

WITH CancellationDetails AS (
    SELECT 
        c.cancellation_id,
        c.booking_id,
        c.cancelled_by,
        c.cancellation_stage,
        c.cancellation_reason,
        c.cancellation_fee_charged_inr,
        c.dispute_flag,
        r.total_quoted_fare_inr AS lost_fare_inr,
        z.city,
        z.zone_name
    FROM cancellation_discrepancy_logs c
    JOIN ride_requests r ON c.booking_id = r.booking_id
    JOIN urban_zones z ON r.pickup_zone_id = z.zone_id
),
ReasonRankings AS (
    SELECT 
        cancelled_by,
        cancellation_reason,
        COUNT(cancellation_id) AS total_incidents,
        ROUND(SUM(lost_fare_inr), 2) AS total_lost_gbv_inr,
        ROUND(AVG(lost_fare_inr), 2) AS avg_fare_per_cancelled_ride,
        SUM(CASE WHEN cancellation_fee_charged_inr > 0 THEN 1 ELSE 0 END) AS fees_charged_count,
        SUM(CASE WHEN dispute_flag = 'Y' THEN 1 ELSE 0 END) AS disputed_fees_count
    FROM CancellationDetails
    GROUP BY cancelled_by, cancellation_reason
)
SELECT 
    cancelled_by,
    cancellation_reason,
    total_incidents,
    DENSE_RANK() OVER (PARTITION BY cancelled_by ORDER BY total_incidents DESC) AS reason_rank,
    total_lost_gbv_inr,
    ROUND(total_lost_gbv_inr * 100.0 / SUM(total_lost_gbv_inr) OVER (), 2) AS pct_of_total_revenue_leakage,
    fees_charged_count,
    disputed_fees_count,
    ROUND(
        CASE WHEN fees_charged_count > 0 
             THEN (disputed_fees_count * 100.0 / fees_charged_count) 
             ELSE 0.0 
        END, 2
    ) AS dispute_rate_pct
FROM ReasonRankings
ORDER BY cancelled_by, total_incidents DESC;
