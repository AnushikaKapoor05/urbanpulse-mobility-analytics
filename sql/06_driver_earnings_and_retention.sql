-- ==============================================================================
-- File: 06_driver_earnings_and_retention.sql
-- Project: UrbanPulse Mobility Operations Analytics
-- Business Purpose: Analyzes driver partner earnings, inter-trip turnaround time (downtime),
-- shift productivity, and performance tiers.
-- Demonstrates: Advanced Window Functions (LAG, DENSE_RANK, PARTITION BY).
-- ==============================================================================

-- 1. Driver Inter-Trip Idle Time & Turnaround Analysis using LAG()
WITH OrderedTrips AS (
    SELECT 
        f.driver_id,
        d.driver_name,
        d.shift_type,
        f.fulfillment_id,
        f.trip_started_at,
        f.trip_ended_at,
        f.driver_payout_inr,
        LAG(f.trip_ended_at) OVER (
            PARTITION BY f.driver_id 
            ORDER BY f.trip_started_at
        ) AS previous_trip_end_time
    FROM trip_fulfillment_logs f
    JOIN driver_partners d ON f.driver_id = d.driver_id
    WHERE f.driver_payout_inr > 0
),
TripGaps AS (
    SELECT 
        driver_id,
        driver_name,
        shift_type,
        fulfillment_id,
        trip_started_at,
        previous_trip_end_time,
        ROUND(
            (JULIANDIARM_MINS(trip_started_at, previous_trip_end_time)), 
            1
        ) AS idle_minutes_between_trips,
        driver_payout_inr
    FROM (
        SELECT 
            *,
            -- SQLite date diff in minutes: (julianday(trip_started_at) - julianday(previous_trip_end_time)) * 1440.0
            ROUND((JULIANDAY(trip_started_at) - JULIANDAY(previous_trip_end_time)) * 1440.0, 1) AS JULIANDIARM_MINS_CALC
        FROM OrderedTrips
    )
)
-- 2. Driver Performance & Earnings Summary
SELECT 
    d.driver_id,
    d.driver_name,
    d.city,
    d.shift_type,
    d.rating,
    COUNT(f.fulfillment_id) AS trips_completed,
    ROUND(SUM(f.driver_payout_inr), 2) AS total_takehome_earnings_inr,
    ROUND(AVG(f.driver_payout_inr), 2) AS avg_earnings_per_trip_inr,
    ROUND(SUM(f.actual_distance_km), 1) AS total_driving_km,
    DENSE_RANK() OVER (PARTITION BY d.city ORDER BY SUM(f.driver_payout_inr) DESC) AS city_earning_rank
FROM driver_partners d
LEFT JOIN trip_fulfillment_logs f ON d.driver_id = f.driver_id 
    AND f.driver_payout_inr > 0 AND f.actual_distance_km < 200
GROUP BY d.driver_id, d.driver_name, d.city, d.shift_type, d.rating
ORDER BY d.city, total_takehome_earnings_inr DESC;
