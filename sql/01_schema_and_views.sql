-- ==============================================================================
-- File: 01_schema_and_views.sql
-- Project: UrbanPulse Mobility Operations Analytics
-- Description: DDL table schemas, indexes, and reusable reporting views.
-- Compatible with SQLite and PostgreSQL.
-- ==============================================================================

-- 1. Master Table: Urban Zones
CREATE TABLE IF NOT EXISTS urban_zones (
    zone_id VARCHAR(10) PRIMARY KEY,
    zone_name VARCHAR(100) NOT NULL,
    city VARCHAR(50) NOT NULL,
    zone_category VARCHAR(50) NOT NULL,
    active_fleet_target INT NOT NULL,
    base_surge_factor DECIMAL(3, 2) NOT NULL
);

-- 2. Master Table: Fleet Vehicles
CREATE TABLE IF NOT EXISTS fleet_vehicles (
    vehicle_id VARCHAR(15) PRIMARY KEY,
    model_name VARCHAR(50) NOT NULL,
    vehicle_category VARCHAR(30) NOT NULL,
    powertrain VARCHAR(20) NOT NULL,
    battery_or_tank_capacity DECIMAL(5, 2) NOT NULL,
    status VARCHAR(30) NOT NULL,
    current_odometer_km DECIMAL(8, 2) NOT NULL,
    acquisition_date DATE NOT NULL
);

-- 3. Master Table: Driver Partners
CREATE TABLE IF NOT EXISTS driver_partners (
    driver_id VARCHAR(15) PRIMARY KEY,
    driver_name VARCHAR(100) NOT NULL,
    city VARCHAR(50) NOT NULL,
    primary_zone_id VARCHAR(10) REFERENCES urban_zones(zone_id),
    vehicle_id VARCHAR(15) REFERENCES fleet_vehicles(vehicle_id),
    rating DECIMAL(3, 2) NOT NULL,
    onboarding_date DATE NOT NULL,
    shift_type VARCHAR(30) NOT NULL,
    status VARCHAR(20) NOT NULL,
    lifetime_trips INT NOT NULL
);

-- 4. Transaction Table: Ride Requests (Bookings)
CREATE TABLE IF NOT EXISTS ride_requests (
    booking_id VARCHAR(20) PRIMARY KEY,
    customer_id VARCHAR(20) NOT NULL,
    pickup_zone_id VARCHAR(10) REFERENCES urban_zones(zone_id),
    drop_zone_id VARCHAR(10) REFERENCES urban_zones(zone_id),
    vehicle_category VARCHAR(30) NOT NULL,
    request_timestamp TIMESTAMP NOT NULL,
    estimated_distance_km DECIMAL(6, 2) NOT NULL,
    base_fare_inr DECIMAL(8, 2) NOT NULL,
    surge_multiplier DECIMAL(3, 2) NOT NULL,
    total_quoted_fare_inr DECIMAL(8, 2) NOT NULL,
    booking_status VARCHAR(30) NOT NULL
);

-- 5. Transaction Table: Trip Fulfillment Logs
CREATE TABLE IF NOT EXISTS trip_fulfillment_logs (
    fulfillment_id VARCHAR(20) PRIMARY KEY,
    booking_id VARCHAR(20) REFERENCES ride_requests(booking_id),
    driver_id VARCHAR(15),
    vehicle_id VARCHAR(15),
    driver_assigned_at TIMESTAMP,
    arrived_at_pickup_at TIMESTAMP,
    trip_started_at TIMESTAMP,
    trip_ended_at TIMESTAMP,
    pickup_wait_mins DECIMAL(5, 2),
    trip_duration_mins DECIMAL(6, 2),
    actual_distance_km DECIMAL(6, 2),
    gross_fare_inr DECIMAL(8, 2),
    platform_commission_pct DECIMAL(5, 2),
    driver_payout_inr DECIMAL(8, 2),
    rider_rating DECIMAL(2, 1),
    toll_or_tips_inr DECIMAL(6, 2)
);

-- 6. Log Table: Cancellation & Discrepancy Logs
CREATE TABLE IF NOT EXISTS cancellation_discrepancy_logs (
    cancellation_id VARCHAR(20) PRIMARY KEY,
    booking_id VARCHAR(20) REFERENCES ride_requests(booking_id),
    driver_id VARCHAR(15),
    cancelled_by VARCHAR(20) NOT NULL,
    cancellation_stage VARCHAR(30) NOT NULL,
    cancellation_reason VARCHAR(100) NOT NULL,
    cancellation_fee_charged_inr DECIMAL(6, 2) NOT NULL,
    dispute_flag CHAR(1) NOT NULL
);

-- Performance Indexes
CREATE INDEX IF NOT EXISTS idx_requests_pickup ON ride_requests(pickup_zone_id, booking_status);
CREATE INDEX IF NOT EXISTS idx_requests_timestamp ON ride_requests(request_timestamp);
CREATE INDEX IF NOT EXISTS idx_fulfillment_driver ON trip_fulfillment_logs(driver_id);
CREATE INDEX IF NOT EXISTS idx_fulfillment_booking ON trip_fulfillment_logs(booking_id);

-- ==============================================================================
-- REUSABLE ANALYTIC VIEWS
-- ==============================================================================

-- View 1: Enriched Completed Rides View
CREATE VIEW IF NOT EXISTS vw_completed_trips_enriched AS
SELECT 
    f.fulfillment_id,
    f.booking_id,
    r.customer_id,
    f.driver_id,
    d.driver_name,
    f.vehicle_id,
    v.model_name,
    v.vehicle_category,
    v.powertrain,
    pz.city,
    pz.zone_name AS pickup_zone,
    dz.zone_name AS drop_zone,
    r.request_timestamp,
    f.trip_started_at,
    f.trip_ended_at,
    f.pickup_wait_mins,
    f.trip_duration_mins,
    f.actual_distance_km,
    r.surge_multiplier,
    f.gross_fare_inr,
    f.driver_payout_inr,
    (f.gross_fare_inr - f.driver_payout_inr) AS net_platform_revenue_inr,
    f.rider_rating
FROM trip_fulfillment_logs f
JOIN ride_requests r ON f.booking_id = r.booking_id
LEFT JOIN driver_partners d ON f.driver_id = d.driver_id
LEFT JOIN fleet_vehicles v ON f.vehicle_id = v.vehicle_id
LEFT JOIN urban_zones pz ON r.pickup_zone_id = pz.zone_id
LEFT JOIN urban_zones dz ON r.drop_zone_id = dz.zone_id
WHERE f.pickup_wait_mins >= 0 AND f.actual_distance_km < 200 AND f.driver_payout_inr > 0;
