-- ==============================================================================
-- File: 02_supply_demand_kpis.sql
-- Project: UrbanPulse Mobility Operations Analytics
-- Business Purpose: Evaluates supply-demand fulfillment across cities and operational time slots.
-- Demonstrates: CTEs, CASE statements, aggregation, percentage calculation.
-- ==============================================================================

WITH TimeSlotAggregations AS (
    SELECT 
        r.booking_id,
        z.city,
        z.zone_name AS pickup_zone,
        r.booking_status,
        r.total_quoted_fare_inr,
        CAST(SUBSTR(r.request_timestamp, 12, 2) AS INTEGER) AS request_hour,
        CASE 
            WHEN CAST(SUBSTR(r.request_timestamp, 12, 2) AS INTEGER) BETWEEN 8 AND 11 THEN 'Morning Peak (08:00 - 11:59)'
            WHEN CAST(SUBSTR(r.request_timestamp, 12, 2) AS INTEGER) BETWEEN 12 AND 16 THEN 'Afternoon Normal (12:00 - 16:59)'
            WHEN CAST(SUBSTR(r.request_timestamp, 12, 2) AS INTEGER) BETWEEN 17 AND 21 THEN 'Evening Rush (17:00 - 21:59)'
            ELSE 'Late Night / Early Morning (22:00 - 07:59)'
        END AS time_window
    FROM ride_requests r
    JOIN urban_zones z ON r.pickup_zone_id = z.zone_id
)
SELECT 
    city,
    time_window,
    COUNT(booking_id) AS total_requests,
    SUM(CASE WHEN booking_status = 'Completed' THEN 1 ELSE 0 END) AS completed_trips,
    ROUND(SUM(CASE WHEN booking_status = 'Completed' THEN 1.0 ELSE 0.0 END) / COUNT(booking_id) * 100, 2) AS completion_rate_pct,
    SUM(CASE WHEN booking_status = 'Driver_Cancelled' THEN 1 ELSE 0 END) AS driver_cancelled,
    ROUND(SUM(CASE WHEN booking_status = 'Driver_Cancelled' THEN 1.0 ELSE 0.0 END) / COUNT(booking_id) * 100, 2) AS driver_cancel_rate_pct,
    SUM(CASE WHEN booking_status = 'Rider_Cancelled' THEN 1 ELSE 0 END) AS rider_cancelled,
    ROUND(SUM(CASE WHEN booking_status = 'Rider_Cancelled' THEN 1.0 ELSE 0.0 END) / COUNT(booking_id) * 100, 2) AS rider_cancel_rate_pct,
    SUM(CASE WHEN booking_status = 'ETA_Timeout' THEN 1 ELSE 0 END) AS timeout_unfulfilled,
    ROUND(SUM(CASE WHEN booking_status = 'Completed' THEN total_quoted_fare_inr ELSE 0 END), 2) AS gross_completed_value_inr
FROM TimeSlotAggregations
GROUP BY city, time_window
ORDER BY city, completion_rate_pct ASC;
