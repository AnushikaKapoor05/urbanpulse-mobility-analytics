-- ==============================================================================
-- File: 07_ev_sustainability_unit_economics.sql
-- Project: UrbanPulse Mobility Operations Analytics
-- Business Purpose: Compares unit economics and ESG sustainability impact across
-- Electric Vehicles (EV) vs Internal Combustion Engine (ICE - Petrol/CNG) fleets.
-- Demonstrates: Unit economics modeling, ESG Carbon Avoidance calculations, CTEs.
-- ==============================================================================

WITH PowertrainTrips AS (
    SELECT 
        v.powertrain,
        v.vehicle_category,
        f.fulfillment_id,
        f.actual_distance_km,
        f.gross_fare_inr,
        f.driver_payout_inr,
        (f.gross_fare_inr - f.driver_payout_inr) AS net_platform_revenue_inr,
        -- Energy / Fuel cost per KM assumption based on Indian market benchmarks:
        -- Electric: ₹1.20/km | CNG: ₹2.80/km | Petrol: ₹4.80/km
        CASE 
            WHEN v.powertrain = 'Electric' THEN f.actual_distance_km * 1.20
            WHEN v.powertrain = 'CNG' THEN f.actual_distance_km * 2.80
            ELSE f.actual_distance_km * 4.80
        END AS estimated_energy_cost_inr,
        -- ICE Equivalent fuel consumption (liters): ~16 km/l for 4W, ~40 km/l for 2W
        CASE 
            WHEN v.powertrain = 'Electric' AND v.vehicle_category IN ('EV_Sedan', 'Prime_Sedan') 
                THEN f.actual_distance_km / 16.0
            WHEN v.powertrain = 'Electric' AND v.vehicle_category IN ('Bike_Taxi', 'Auto_Rickshaw') 
                THEN f.actual_distance_km / 35.0
            ELSE 0.0
        END AS petrol_liters_displaced
    FROM trip_fulfillment_logs f
    JOIN fleet_vehicles v ON f.vehicle_id = v.vehicle_id
    WHERE f.actual_distance_km > 0 AND f.actual_distance_km < 200 AND f.driver_payout_inr > 0
)
SELECT 
    powertrain,
    COUNT(fulfillment_id) AS total_trips_completed,
    ROUND(SUM(actual_distance_km), 1) AS total_km_traveled,
    ROUND(SUM(gross_fare_inr), 2) AS total_gross_fare_inr,
    ROUND(SUM(gross_fare_inr) / SUM(actual_distance_km), 2) AS revenue_per_km_inr,
    ROUND(SUM(estimated_energy_cost_inr), 2) AS total_fuel_energy_cost_inr,
    ROUND(SUM(estimated_energy_cost_inr) / SUM(actual_distance_km), 2) AS operating_energy_cost_per_km_inr,
    ROUND(SUM(net_platform_revenue_inr), 2) AS net_platform_margin_inr,
    -- ESG Green Impact metrics for Electric fleet:
    ROUND(SUM(petrol_liters_displaced), 1) AS fossil_fuel_liters_saved,
    -- Carbon avoidance: 1 liter petrol ≈ 2.31 kg CO2
    ROUND(SUM(petrol_liters_displaced) * 2.31, 1) AS co2_emissions_averted_kg,
    ROUND((SUM(petrol_liters_displaced) * 2.31) / 1000.0, 2) AS co2_emissions_averted_metric_tonnes
FROM PowertrainTrips
GROUP BY powertrain
ORDER BY total_km_traveled DESC;
