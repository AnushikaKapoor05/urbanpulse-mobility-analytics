-- ==============================================================================
-- File: 04_surge_pricing_efficiency.sql
-- Project: UrbanPulse Mobility Operations Analytics
-- Business Purpose: Evaluates price elasticity, conversion rate, and revenue impact
-- across dynamic surge pricing multipliers.
-- Demonstrates: Numerical bucketing, conversion metrics, elasticity analysis.
-- ==============================================================================

WITH SurgeBuckets AS (
    SELECT 
        booking_id,
        surge_multiplier,
        total_quoted_fare_inr,
        booking_status,
        CASE 
            WHEN surge_multiplier = 1.0 THEN '1. Base Pricing (1.0x)'
            WHEN surge_multiplier BETWEEN 1.1 AND 1.3 THEN '2. Mild Surge (1.1x - 1.3x)'
            WHEN surge_multiplier BETWEEN 1.4 AND 1.7 THEN '3. High Surge (1.4x - 1.7x)'
            ELSE '4. Extreme Surge (1.8x+)'
        END AS surge_tier
    FROM ride_requests
)
SELECT 
    surge_tier,
    COUNT(booking_id) AS total_requests_generated,
    ROUND(COUNT(booking_id) * 100.0 / (SELECT COUNT(*) FROM ride_requests), 2) AS request_share_pct,
    SUM(CASE WHEN booking_status = 'Completed' THEN 1 ELSE 0 END) AS completed_trips,
    ROUND(SUM(CASE WHEN booking_status = 'Completed' THEN 1.0 ELSE 0.0 END) / COUNT(booking_id) * 100, 2) AS completion_conversion_rate_pct,
    SUM(CASE WHEN booking_status = 'Rider_Cancelled' THEN 1 ELSE 0 END) AS rider_cancelled_count,
    ROUND(SUM(CASE WHEN booking_status = 'Rider_Cancelled' THEN 1.0 ELSE 0.0 END) / COUNT(booking_id) * 100, 2) AS rider_price_dropoff_pct,
    SUM(CASE WHEN booking_status = 'Driver_Cancelled' THEN 1 ELSE 0 END) AS driver_cancelled_count,
    ROUND(SUM(CASE WHEN booking_status = 'Driver_Cancelled' THEN 1.0 ELSE 0.0 END) / COUNT(booking_id) * 100, 2) AS driver_cancel_rate_pct,
    ROUND(SUM(CASE WHEN booking_status = 'Completed' THEN total_quoted_fare_inr ELSE 0 END), 2) AS realized_gross_booking_value_inr,
    ROUND(AVG(CASE WHEN booking_status = 'Completed' THEN total_quoted_fare_inr ELSE NULL END), 2) AS avg_completed_ticket_size_inr
FROM SurgeBuckets
GROUP BY surge_tier
ORDER BY surge_tier ASC;
