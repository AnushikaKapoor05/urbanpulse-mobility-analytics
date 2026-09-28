-- ==============================================================================
-- File: 05_fleet_uptime_and_idle_time.sql
-- Project: UrbanPulse Mobility Operations Analytics
-- Business Purpose: Assesses fleet utilization, asset productivity, active vs idle vehicles,
-- and identifies top & under-utilized vehicles across categories.
-- Demonstrates: Window functions (RANK, ROW_NUMBER), Joins, Utilization % logic.
-- ==============================================================================

-- 1. Fleet Asset Availability Overview
WITH FleetStatusSummary AS (
    SELECT 
        vehicle_category,
        powertrain,
        COUNT(vehicle_id) AS total_fleet_size,
        SUM(CASE WHEN status = 'Active' THEN 1 ELSE 0 END) AS active_vehicles,
        SUM(CASE WHEN status = 'Idle' THEN 1 ELSE 0 END) AS idle_vehicles,
        SUM(CASE WHEN status = 'Grounded_Maintenance' THEN 1 ELSE 0 END) AS grounded_maintenance_vehicles,
        ROUND(AVG(current_odometer_km), 1) AS avg_odometer_km
    FROM fleet_vehicles
    GROUP BY vehicle_category, powertrain
)
SELECT 
    vehicle_category,
    powertrain,
    total_fleet_size,
    active_vehicles,
    ROUND(active_vehicles * 100.0 / total_fleet_size, 2) AS fleet_utilization_rate_pct,
    idle_vehicles,
    grounded_maintenance_vehicles,
    ROUND(grounded_maintenance_vehicles * 100.0 / total_fleet_size, 2) AS downtime_maintenance_pct,
    avg_odometer_km
FROM FleetStatusSummary
ORDER BY vehicle_category, powertrain;

-- 2. Vehicle Operational Utilization Leaderboard (Top 10 High-Mileage Workhorses)
WITH VehicleTrips AS (
    SELECT 
        v.vehicle_id,
        v.model_name,
        v.vehicle_category,
        v.powertrain,
        COUNT(f.fulfillment_id) AS completed_trips_count,
        ROUND(COALESCE(SUM(f.actual_distance_km), 0), 2) AS total_operational_km,
        ROUND(COALESCE(SUM(f.trip_duration_mins) / 60.0, 0), 2) AS total_active_trip_hours,
        ROUND(COALESCE(SUM(f.gross_fare_inr), 0), 2) AS total_revenue_generated_inr
    FROM fleet_vehicles v
    LEFT JOIN trip_fulfillment_logs f ON v.vehicle_id = f.vehicle_id 
        AND f.actual_distance_km < 200 AND f.driver_payout_inr > 0
    GROUP BY v.vehicle_id, v.model_name, v.vehicle_category, v.powertrain
)
SELECT 
    vehicle_id,
    model_name,
    vehicle_category,
    powertrain,
    completed_trips_count,
    total_operational_km,
    total_active_trip_hours,
    total_revenue_generated_inr,
    RANK() OVER (ORDER BY total_operational_km DESC) AS utilization_rank
FROM VehicleTrips
ORDER BY total_operational_km DESC
LIMIT 10;
