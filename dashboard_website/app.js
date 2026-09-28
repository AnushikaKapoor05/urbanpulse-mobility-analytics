// UrbanPulse Mobility - Interactive Dashboard Logic
const DASHBOARD_DATA = {
  "city_cat_data": [
    {
      "city": "Bengaluru",
      "vehicle_category": "Auto_Rickshaw",
      "powertrain": null,
      "total_requests": 176,
      "completed": 0,
      "driver_cancelled": 95,
      "rider_cancelled": 66,
      "timeout": 15,
      "gross_fare": 0,
      "avg_wait": null,
      "total_km": 0
    },
    {
      "city": "Bengaluru",
      "vehicle_category": "Auto_Rickshaw",
      "powertrain": "CNG",
      "total_requests": 214,
      "completed": 214,
      "driver_cancelled": 0,
      "rider_cancelled": 0,
      "timeout": 0,
      "gross_fare": 83810.12,
      "avg_wait": 7.870560747663551,
      "total_km": 3273.6
    },
    {
      "city": "Bengaluru",
      "vehicle_category": "Auto_Rickshaw",
      "powertrain": "Electric",
      "total_requests": 204,
      "completed": 204,
      "driver_cancelled": 0,
      "rider_cancelled": 0,
      "timeout": 0,
      "gross_fare": 87870.36,
      "avg_wait": 7.912254901960784,
      "total_km": 3327.8
    },
    {
      "city": "Bengaluru",
      "vehicle_category": "Bike_Taxi",
      "powertrain": null,
      "total_requests": 118,
      "completed": 0,
      "driver_cancelled": 56,
      "rider_cancelled": 44,
      "timeout": 18,
      "gross_fare": 0,
      "avg_wait": null,
      "total_km": 0
    },
    {
      "city": "Bengaluru",
      "vehicle_category": "Bike_Taxi",
      "powertrain": "Electric",
      "total_requests": 189,
      "completed": 189,
      "driver_cancelled": 0,
      "rider_cancelled": 0,
      "timeout": 0,
      "gross_fare": 50228.22,
      "avg_wait": 7.856084656084656,
      "total_km": 2917.5
    },
    {
      "city": "Bengaluru",
      "vehicle_category": "Bike_Taxi",
      "powertrain": "Petrol",
      "total_requests": 179,
      "completed": 179,
      "driver_cancelled": 0,
      "rider_cancelled": 0,
      "timeout": 0,
      "gross_fare": 47418.42,
      "avg_wait": 7.850837988826815,
      "total_km": 2740.5
    },
    {
      "city": "Bengaluru",
      "vehicle_category": "EV_Sedan",
      "powertrain": null,
      "total_requests": 165,
      "completed": 0,
      "driver_cancelled": 81,
      "rider_cancelled": 60,
      "timeout": 24,
      "gross_fare": 0,
      "avg_wait": null,
      "total_km": 0
    },
    {
      "city": "Bengaluru",
      "vehicle_category": "EV_Sedan",
      "powertrain": "Electric",
      "total_requests": 505,
      "completed": 505,
      "driver_cancelled": 0,
      "rider_cancelled": 0,
      "timeout": 0,
      "gross_fare": 307023.6,
      "avg_wait": 7.806336633663366,
      "total_km": 9237.3
    },
    {
      "city": "Bengaluru",
      "vehicle_category": "Prime_Sedan",
      "powertrain": null,
      "total_requests": 146,
      "completed": 0,
      "driver_cancelled": 72,
      "rider_cancelled": 58,
      "timeout": 16,
      "gross_fare": 0,
      "avg_wait": null,
      "total_km": 0
    },
    {
      "city": "Bengaluru",
      "vehicle_category": "Prime_Sedan",
      "powertrain": "CNG",
      "total_requests": 179,
      "completed": 179,
      "driver_cancelled": 0,
      "rider_cancelled": 0,
      "timeout": 0,
      "gross_fare": 127258.32,
      "avg_wait": 7.777094972067038,
      "total_km": 2998.9
    },
    {
      "city": "Bengaluru",
      "vehicle_category": "Prime_Sedan",
      "powertrain": "Petrol",
      "total_requests": 193,
      "completed": 193,
      "driver_cancelled": 0,
      "rider_cancelled": 0,
      "timeout": 0,
      "gross_fare": 126352.8,
      "avg_wait": 8.221761658031088,
      "total_km": 3088.8
    },
    {
      "city": "Delhi-NCR",
      "vehicle_category": "Auto_Rickshaw",
      "powertrain": null,
      "total_requests": 193,
      "completed": 0,
      "driver_cancelled": 93,
      "rider_cancelled": 73,
      "timeout": 27,
      "gross_fare": 0,
      "avg_wait": null,
      "total_km": 0
    },
    {
      "city": "Delhi-NCR",
      "vehicle_category": "Auto_Rickshaw",
      "powertrain": "CNG",
      "total_requests": 266,
      "completed": 266,
      "driver_cancelled": 0,
      "rider_cancelled": 0,
      "timeout": 0,
      "gross_fare": 115194.24,
      "avg_wait": 8.105263157894736,
      "total_km": 4333.9
    },
    {
      "city": "Delhi-NCR",
      "vehicle_category": "Auto_Rickshaw",
      "powertrain": "Electric",
      "total_requests": 259,
      "completed": 259,
      "driver_cancelled": 0,
      "rider_cancelled": 0,
      "timeout": 0,
      "gross_fare": 106912.18000000001,
      "avg_wait": 8.120077220077219,
      "total_km": 4055.7
    },
    {
      "city": "Delhi-NCR",
      "vehicle_category": "Bike_Taxi",
      "powertrain": null,
      "total_requests": 146,
      "completed": 0,
      "driver_cancelled": 69,
      "rider_cancelled": 69,
      "timeout": 8,
      "gross_fare": 0,
      "avg_wait": null,
      "total_km": 0
    },
    {
      "city": "Delhi-NCR",
      "vehicle_category": "Bike_Taxi",
      "powertrain": "Electric",
      "total_requests": 189,
      "completed": 189,
      "driver_cancelled": 0,
      "rider_cancelled": 0,
      "timeout": 0,
      "gross_fare": 49778.68,
      "avg_wait": 8.061375661375662,
      "total_km": 2993.9
    },
    {
      "city": "Delhi-NCR",
      "vehicle_category": "Bike_Taxi",
      "powertrain": "Petrol",
      "total_requests": 213,
      "completed": 213,
      "driver_cancelled": 0,
      "rider_cancelled": 0,
      "timeout": 0,
      "gross_fare": 59857.54,
      "avg_wait": 8.303286384976525,
      "total_km": 3290.1
    },
    {
      "city": "Delhi-NCR",
      "vehicle_category": "EV_Sedan",
      "powertrain": null,
      "total_requests": 202,
      "completed": 0,
      "driver_cancelled": 99,
      "rider_cancelled": 76,
      "timeout": 27,
      "gross_fare": 0,
      "avg_wait": null,
      "total_km": 0
    },
    {
      "city": "Delhi-NCR",
      "vehicle_category": "EV_Sedan",
      "powertrain": "Electric",
      "total_requests": 522,
      "completed": 522,
      "driver_cancelled": 0,
      "rider_cancelled": 0,
      "timeout": 0,
      "gross_fare": 307754.72,
      "avg_wait": 8.077586206896552,
      "total_km": 7871.2
    },
    {
      "city": "Delhi-NCR",
      "vehicle_category": "Prime_Sedan",
      "powertrain": null,
      "total_requests": 174,
      "completed": 0,
      "driver_cancelled": 78,
      "rider_cancelled": 75,
      "timeout": 21,
      "gross_fare": 0,
      "avg_wait": null,
      "total_km": 0
    },
    {
      "city": "Delhi-NCR",
      "vehicle_category": "Prime_Sedan",
      "powertrain": "CNG",
      "total_requests": 198,
      "completed": 198,
      "driver_cancelled": 0,
      "rider_cancelled": 0,
      "timeout": 0,
      "gross_fare": 122947.44,
      "avg_wait": 7.9772727272727275,
      "total_km": 3064.6
    },
    {
      "city": "Delhi-NCR",
      "vehicle_category": "Prime_Sedan",
      "powertrain": "Petrol",
      "total_requests": 225,
      "completed": 225,
      "driver_cancelled": 0,
      "rider_cancelled": 0,
      "timeout": 0,
      "gross_fare": 141498.56,
      "avg_wait": 7.720444444444444,
      "total_km": 3569.4
    },
    {
      "city": "Mumbai",
      "vehicle_category": "Auto_Rickshaw",
      "powertrain": null,
      "total_requests": 140,
      "completed": 0,
      "driver_cancelled": 66,
      "rider_cancelled": 59,
      "timeout": 15,
      "gross_fare": 0,
      "avg_wait": null,
      "total_km": 0
    },
    {
      "city": "Mumbai",
      "vehicle_category": "Auto_Rickshaw",
      "powertrain": "CNG",
      "total_requests": 233,
      "completed": 233,
      "driver_cancelled": 0,
      "rider_cancelled": 0,
      "timeout": 0,
      "gross_fare": 96286.62,
      "avg_wait": 7.9193133047210305,
      "total_km": 3669.7
    },
    {
      "city": "Mumbai",
      "vehicle_category": "Auto_Rickshaw",
      "powertrain": "Electric",
      "total_requests": 183,
      "completed": 183,
      "driver_cancelled": 0,
      "rider_cancelled": 0,
      "timeout": 0,
      "gross_fare": 82677.66,
      "avg_wait": 8.210928961748634,
      "total_km": 2946.5
    },
    {
      "city": "Mumbai",
      "vehicle_category": "Bike_Taxi",
      "powertrain": null,
      "total_requests": 109,
      "completed": 0,
      "driver_cancelled": 63,
      "rider_cancelled": 34,
      "timeout": 12,
      "gross_fare": 0,
      "avg_wait": null,
      "total_km": 0
    },
    {
      "city": "Mumbai",
      "vehicle_category": "Bike_Taxi",
      "powertrain": "Electric",
      "total_requests": 142,
      "completed": 142,
      "driver_cancelled": 0,
      "rider_cancelled": 0,
      "timeout": 0,
      "gross_fare": 39342.26,
      "avg_wait": 8.371126760563381,
      "total_km": 2289.4
    },
    {
      "city": "Mumbai",
      "vehicle_category": "Bike_Taxi",
      "powertrain": "Petrol",
      "total_requests": 165,
      "completed": 165,
      "driver_cancelled": 0,
      "rider_cancelled": 0,
      "timeout": 0,
      "gross_fare": 46395.26,
      "avg_wait": 7.851515151515152,
      "total_km": 2694.8
    },
    {
      "city": "Mumbai",
      "vehicle_category": "EV_Sedan",
      "powertrain": null,
      "total_requests": 154,
      "completed": 0,
      "driver_cancelled": 82,
      "rider_cancelled": 49,
      "timeout": 23,
      "gross_fare": 0,
      "avg_wait": null,
      "total_km": 0
    },
    {
      "city": "Mumbai",
      "vehicle_category": "EV_Sedan",
      "powertrain": "Electric",
      "total_requests": 406,
      "completed": 406,
      "driver_cancelled": 0,
      "rider_cancelled": 0,
      "timeout": 0,
      "gross_fare": 240320.34,
      "avg_wait": 7.852463054187192,
      "total_km": 6349.4
    },
    {
      "city": "Mumbai",
      "vehicle_category": "Prime_Sedan",
      "powertrain": null,
      "total_requests": 117,
      "completed": 0,
      "driver_cancelled": 58,
      "rider_cancelled": 40,
      "timeout": 19,
      "gross_fare": 0,
      "avg_wait": null,
      "total_km": 0
    },
    {
      "city": "Mumbai",
      "vehicle_category": "Prime_Sedan",
      "powertrain": "CNG",
      "total_requests": 137,
      "completed": 137,
      "driver_cancelled": 0,
      "rider_cancelled": 0,
      "timeout": 0,
      "gross_fare": 92756.72,
      "avg_wait": 7.632116788321167,
      "total_km": 2259.5
    },
    {
      "city": "Mumbai",
      "vehicle_category": "Prime_Sedan",
      "powertrain": "Petrol",
      "total_requests": 159,
      "completed": 159,
      "driver_cancelled": 0,
      "rider_cancelled": 0,
      "timeout": 0,
      "gross_fare": 104833.68000000001,
      "avg_wait": 7.845911949685535,
      "total_km": 2430.6
    }
  ],
  "hourly_data": [
    {
      "hour": 0,
      "requests": 275,
      "completed": 204
    },
    {
      "hour": 1,
      "requests": 265,
      "completed": 201
    },
    {
      "hour": 2,
      "requests": 282,
      "completed": 205
    },
    {
      "hour": 3,
      "requests": 291,
      "completed": 224
    },
    {
      "hour": 4,
      "requests": 268,
      "completed": 208
    },
    {
      "hour": 5,
      "requests": 295,
      "completed": 224
    },
    {
      "hour": 6,
      "requests": 289,
      "completed": 210
    },
    {
      "hour": 7,
      "requests": 288,
      "completed": 215
    },
    {
      "hour": 8,
      "requests": 299,
      "completed": 215
    },
    {
      "hour": 9,
      "requests": 249,
      "completed": 164
    },
    {
      "hour": 10,
      "requests": 276,
      "completed": 194
    },
    {
      "hour": 11,
      "requests": 293,
      "completed": 192
    },
    {
      "hour": 12,
      "requests": 298,
      "completed": 229
    },
    {
      "hour": 13,
      "requests": 274,
      "completed": 209
    },
    {
      "hour": 14,
      "requests": 259,
      "completed": 193
    },
    {
      "hour": 15,
      "requests": 297,
      "completed": 215
    },
    {
      "hour": 16,
      "requests": 284,
      "completed": 220
    },
    {
      "hour": 17,
      "requests": 275,
      "completed": 187
    },
    {
      "hour": 18,
      "requests": 269,
      "completed": 191
    },
    {
      "hour": 19,
      "requests": 278,
      "completed": 205
    },
    {
      "hour": 20,
      "requests": 292,
      "completed": 214
    },
    {
      "hour": 21,
      "requests": 307,
      "completed": 211
    },
    {
      "hour": 22,
      "requests": 302,
      "completed": 221
    },
    {
      "hour": 23,
      "requests": 295,
      "completed": 209
    }
  ],
  "cancel_data": [
    {
      "cancelled_by": "System",
      "cancellation_reason": "Driver_Assignment_Timeout_Exceeded",
      "count": 225,
      "lost_gbv": 124618.7
    },
    {
      "cancelled_by": "Driver",
      "cancellation_reason": "Driver_Refused_Drop_Location",
      "count": 247,
      "lost_gbv": 123871.1
    },
    {
      "cancelled_by": "Driver",
      "cancellation_reason": "Driver_Demanded_Cash_Offline",
      "count": 221,
      "lost_gbv": 116251.34
    },
    {
      "cancelled_by": "Driver",
      "cancellation_reason": "Traffic_Gridlock_En_Route",
      "count": 226,
      "lost_gbv": 114152.42
    },
    {
      "cancelled_by": "Driver",
      "cancellation_reason": "Vehicle_Mechanical_Issue",
      "count": 218,
      "lost_gbv": 108672.36
    },
    {
      "cancelled_by": "Rider",
      "cancellation_reason": "High_ETA_Long_Wait_Time",
      "count": 194,
      "lost_gbv": 102322.42
    },
    {
      "cancelled_by": "Rider",
      "cancellation_reason": "Driver_Not_Moving",
      "count": 169,
      "lost_gbv": 91437.42
    },
    {
      "cancelled_by": "Rider",
      "cancellation_reason": "Booked_Alternative_Ride",
      "count": 168,
      "lost_gbv": 87675.72
    },
    {
      "cancelled_by": "Rider",
      "cancellation_reason": "Change_of_Plans",
      "count": 172,
      "lost_gbv": 87334.26
    }
  ],
  "surge_data": [
    {
      "surge_tier": "Base (1.0x)",
      "requests": 2558,
      "completed": 1898,
      "rider_dropoff": 255,
      "gross_fare": 725331.2
    },
    {
      "surge_tier": "Extreme (1.8x+)",
      "requests": 1282,
      "completed": 837,
      "rider_dropoff": 185,
      "gross_fare": 657494.58
    },
    {
      "surge_tier": "High (1.4-1.7x)",
      "requests": 839,
      "completed": 631,
      "rider_dropoff": 75,
      "gross_fare": 358150.84
    },
    {
      "surge_tier": "Mild (1.1-1.3x)",
      "requests": 2121,
      "completed": 1594,
      "rider_dropoff": 188,
      "gross_fare": 695541.12
    }
  ],
  "powertrain_data": [
    {
      "powertrain": "CNG",
      "trips": 1227,
      "km": 19600.2,
      "fare": 638253.46,
      "petrol_liters_saved": 0.0
    },
    {
      "powertrain": "Electric",
      "trips": 2597,
      "km": 40718.7,
      "fare": 1270771.3,
      "petrol_liters_saved": 1916.2
    },
    {
      "powertrain": "Petrol",
      "trips": 1134,
      "km": 17814.2,
      "fare": 526356.26,
      "petrol_liters_saved": 0.0
    }
  ]
};
const SQL_QUERIES = {
  "02_supply_demand": "-- ==============================================================================\n-- File: 02_supply_demand_kpis.sql\n-- Project: UrbanPulse Mobility Operations Analytics\n-- Business Purpose: Evaluates supply-demand fulfillment across cities and operational time slots.\n-- Demonstrates: CTEs, CASE statements, aggregation, percentage calculation.\n-- ==============================================================================\n\nWITH TimeSlotAggregations AS (\n    SELECT \n        r.booking_id,\n        z.city,\n        z.zone_name AS pickup_zone,\n        r.booking_status,\n        r.total_quoted_fare_inr,\n        CAST(SUBSTR(r.request_timestamp, 12, 2) AS INTEGER) AS request_hour,\n        CASE \n            WHEN CAST(SUBSTR(r.request_timestamp, 12, 2) AS INTEGER) BETWEEN 8 AND 11 THEN 'Morning Peak (08:00 - 11:59)'\n            WHEN CAST(SUBSTR(r.request_timestamp, 12, 2) AS INTEGER) BETWEEN 12 AND 16 THEN 'Afternoon Normal (12:00 - 16:59)'\n            WHEN CAST(SUBSTR(r.request_timestamp, 12, 2) AS INTEGER) BETWEEN 17 AND 21 THEN 'Evening Rush (17:00 - 21:59)'\n            ELSE 'Late Night / Early Morning (22:00 - 07:59)'\n        END AS time_window\n    FROM ride_requests r\n    JOIN urban_zones z ON r.pickup_zone_id = z.zone_id\n)\nSELECT \n    city,\n    time_window,\n    COUNT(booking_id) AS total_requests,\n    SUM(CASE WHEN booking_status = 'Completed' THEN 1 ELSE 0 END) AS completed_trips,\n    ROUND(SUM(CASE WHEN booking_status = 'Completed' THEN 1.0 ELSE 0.0 END) / COUNT(booking_id) * 100, 2) AS completion_rate_pct,\n    SUM(CASE WHEN booking_status = 'Driver_Cancelled' THEN 1 ELSE 0 END) AS driver_cancelled,\n    ROUND(SUM(CASE WHEN booking_status = 'Driver_Cancelled' THEN 1.0 ELSE 0.0 END) / COUNT(booking_id) * 100, 2) AS driver_cancel_rate_pct,\n    SUM(CASE WHEN booking_status = 'Rider_Cancelled' THEN 1 ELSE 0 END) AS rider_cancelled,\n    ROUND(SUM(CASE WHEN booking_status = 'Rider_Cancelled' THEN 1.0 ELSE 0.0 END) / COUNT(booking_id) * 100, 2) AS rider_cancel_rate_pct,\n    SUM(CASE WHEN booking_status = 'ETA_Timeout' THEN 1 ELSE 0 END) AS timeout_unfulfilled,\n    ROUND(SUM(CASE WHEN booking_status = 'Completed' THEN total_quoted_fare_inr ELSE 0 END), 2) AS gross_completed_value_inr\nFROM TimeSlotAggregations\nGROUP BY city, time_window\nORDER BY city, completion_rate_pct ASC;\n",
  "03_cancellations": "-- ==============================================================================\n-- File: 03_cancellation_diagnostics.sql\n-- Project: UrbanPulse Mobility Operations Analytics\n-- Business Purpose: Diagnoses root causes of ride cancellations, stage bottlenecks,\n-- and quantifies lost Gross Booking Value (GBV) and fee dispute rates.\n-- Demonstrates: Window functions (DENSE_RANK, SUM OVER), Multi-table joins, CTEs.\n-- ==============================================================================\n\nWITH CancellationDetails AS (\n    SELECT \n        c.cancellation_id,\n        c.booking_id,\n        c.cancelled_by,\n        c.cancellation_stage,\n        c.cancellation_reason,\n        c.cancellation_fee_charged_inr,\n        c.dispute_flag,\n        r.total_quoted_fare_inr AS lost_fare_inr,\n        z.city,\n        z.zone_name\n    FROM cancellation_discrepancy_logs c\n    JOIN ride_requests r ON c.booking_id = r.booking_id\n    JOIN urban_zones z ON r.pickup_zone_id = z.zone_id\n),\nReasonRankings AS (\n    SELECT \n        cancelled_by,\n        cancellation_reason,\n        COUNT(cancellation_id) AS total_incidents,\n        ROUND(SUM(lost_fare_inr), 2) AS total_lost_gbv_inr,\n        ROUND(AVG(lost_fare_inr), 2) AS avg_fare_per_cancelled_ride,\n        SUM(CASE WHEN cancellation_fee_charged_inr > 0 THEN 1 ELSE 0 END) AS fees_charged_count,\n        SUM(CASE WHEN dispute_flag = 'Y' THEN 1 ELSE 0 END) AS disputed_fees_count\n    FROM CancellationDetails\n    GROUP BY cancelled_by, cancellation_reason\n)\nSELECT \n    cancelled_by,\n    cancellation_reason,\n    total_incidents,\n    DENSE_RANK() OVER (PARTITION BY cancelled_by ORDER BY total_incidents DESC) AS reason_rank,\n    total_lost_gbv_inr,\n    ROUND(total_lost_gbv_inr * 100.0 / SUM(total_lost_gbv_inr) OVER (), 2) AS pct_of_total_revenue_leakage,\n    fees_charged_count,\n    disputed_fees_count,\n    ROUND(\n        CASE WHEN fees_charged_count > 0 \n             THEN (disputed_fees_count * 100.0 / fees_charged_count) \n             ELSE 0.0 \n        END, 2\n    ) AS dispute_rate_pct\nFROM ReasonRankings\nORDER BY cancelled_by, total_incidents DESC;\n",
  "04_surge": "-- ==============================================================================\n-- File: 04_surge_pricing_efficiency.sql\n-- Project: UrbanPulse Mobility Operations Analytics\n-- Business Purpose: Evaluates price elasticity, conversion rate, and revenue impact\n-- across dynamic surge pricing multipliers.\n-- Demonstrates: Numerical bucketing, conversion metrics, elasticity analysis.\n-- ==============================================================================\n\nWITH SurgeBuckets AS (\n    SELECT \n        booking_id,\n        surge_multiplier,\n        total_quoted_fare_inr,\n        booking_status,\n        CASE \n            WHEN surge_multiplier = 1.0 THEN '1. Base Pricing (1.0x)'\n            WHEN surge_multiplier BETWEEN 1.1 AND 1.3 THEN '2. Mild Surge (1.1x - 1.3x)'\n            WHEN surge_multiplier BETWEEN 1.4 AND 1.7 THEN '3. High Surge (1.4x - 1.7x)'\n            ELSE '4. Extreme Surge (1.8x+)'\n        END AS surge_tier\n    FROM ride_requests\n)\nSELECT \n    surge_tier,\n    COUNT(booking_id) AS total_requests_generated,\n    ROUND(COUNT(booking_id) * 100.0 / (SELECT COUNT(*) FROM ride_requests), 2) AS request_share_pct,\n    SUM(CASE WHEN booking_status = 'Completed' THEN 1 ELSE 0 END) AS completed_trips,\n    ROUND(SUM(CASE WHEN booking_status = 'Completed' THEN 1.0 ELSE 0.0 END) / COUNT(booking_id) * 100, 2) AS completion_conversion_rate_pct,\n    SUM(CASE WHEN booking_status = 'Rider_Cancelled' THEN 1 ELSE 0 END) AS rider_cancelled_count,\n    ROUND(SUM(CASE WHEN booking_status = 'Rider_Cancelled' THEN 1.0 ELSE 0.0 END) / COUNT(booking_id) * 100, 2) AS rider_price_dropoff_pct,\n    SUM(CASE WHEN booking_status = 'Driver_Cancelled' THEN 1 ELSE 0 END) AS driver_cancelled_count,\n    ROUND(SUM(CASE WHEN booking_status = 'Driver_Cancelled' THEN 1.0 ELSE 0.0 END) / COUNT(booking_id) * 100, 2) AS driver_cancel_rate_pct,\n    ROUND(SUM(CASE WHEN booking_status = 'Completed' THEN total_quoted_fare_inr ELSE 0 END), 2) AS realized_gross_booking_value_inr,\n    ROUND(AVG(CASE WHEN booking_status = 'Completed' THEN total_quoted_fare_inr ELSE NULL END), 2) AS avg_completed_ticket_size_inr\nFROM SurgeBuckets\nGROUP BY surge_tier\nORDER BY surge_tier ASC;\n",
  "05_fleet": "-- ==============================================================================\n-- File: 05_fleet_uptime_and_idle_time.sql\n-- Project: UrbanPulse Mobility Operations Analytics\n-- Business Purpose: Assesses fleet utilization, asset productivity, active vs idle vehicles,\n-- and identifies top & under-utilized vehicles across categories.\n-- Demonstrates: Window functions (RANK, ROW_NUMBER), Joins, Utilization % logic.\n-- ==============================================================================\n\n-- 1. Fleet Asset Availability Overview\nWITH FleetStatusSummary AS (\n    SELECT \n        vehicle_category,\n        powertrain,\n        COUNT(vehicle_id) AS total_fleet_size,\n        SUM(CASE WHEN status = 'Active' THEN 1 ELSE 0 END) AS active_vehicles,\n        SUM(CASE WHEN status = 'Idle' THEN 1 ELSE 0 END) AS idle_vehicles,\n        SUM(CASE WHEN status = 'Grounded_Maintenance' THEN 1 ELSE 0 END) AS grounded_maintenance_vehicles,\n        ROUND(AVG(current_odometer_km), 1) AS avg_odometer_km\n    FROM fleet_vehicles\n    GROUP BY vehicle_category, powertrain\n)\nSELECT \n    vehicle_category,\n    powertrain,\n    total_fleet_size,\n    active_vehicles,\n    ROUND(active_vehicles * 100.0 / total_fleet_size, 2) AS fleet_utilization_rate_pct,\n    idle_vehicles,\n    grounded_maintenance_vehicles,\n    ROUND(grounded_maintenance_vehicles * 100.0 / total_fleet_size, 2) AS downtime_maintenance_pct,\n    avg_odometer_km\nFROM FleetStatusSummary\nORDER BY vehicle_category, powertrain;\n\n-- 2. Vehicle Operational Utilization Leaderboard (Top 10 High-Mileage Workhorses)\nWITH VehicleTrips AS (\n    SELECT \n        v.vehicle_id,\n        v.model_name,\n        v.vehicle_category,\n        v.powertrain,\n        COUNT(f.fulfillment_id) AS completed_trips_count,\n        ROUND(COALESCE(SUM(f.actual_distance_km), 0), 2) AS total_operational_km,\n        ROUND(COALESCE(SUM(f.trip_duration_mins) / 60.0, 0), 2) AS total_active_trip_hours,\n        ROUND(COALESCE(SUM(f.gross_fare_inr), 0), 2) AS total_revenue_generated_inr\n    FROM fleet_vehicles v\n    LEFT JOIN trip_fulfillment_logs f ON v.vehicle_id = f.vehicle_id \n        AND f.actual_distance_km < 200 AND f.driver_payout_inr > 0\n    GROUP BY v.vehicle_id, v.model_name, v.vehicle_category, v.powertrain\n)\nSELECT \n    vehicle_id,\n    model_name,\n    vehicle_category,\n    powertrain,\n    completed_trips_count,\n    total_operational_km,\n    total_active_trip_hours,\n    total_revenue_generated_inr,\n    RANK() OVER (ORDER BY total_operational_km DESC) AS utilization_rank\nFROM VehicleTrips\nORDER BY total_operational_km DESC\nLIMIT 10;\n",
  "06_drivers": "-- ==============================================================================\n-- File: 06_driver_earnings_and_retention.sql\n-- Project: UrbanPulse Mobility Operations Analytics\n-- Business Purpose: Analyzes driver partner earnings, inter-trip turnaround time (downtime),\n-- shift productivity, and performance tiers.\n-- Demonstrates: Advanced Window Functions (LAG, DENSE_RANK, PARTITION BY).\n-- ==============================================================================\n\n-- 1. Driver Inter-Trip Idle Time & Turnaround Analysis using LAG()\nWITH OrderedTrips AS (\n    SELECT \n        f.driver_id,\n        d.driver_name,\n        d.shift_type,\n        f.fulfillment_id,\n        f.trip_started_at,\n        f.trip_ended_at,\n        f.driver_payout_inr,\n        LAG(f.trip_ended_at) OVER (\n            PARTITION BY f.driver_id \n            ORDER BY f.trip_started_at\n        ) AS previous_trip_end_time\n    FROM trip_fulfillment_logs f\n    JOIN driver_partners d ON f.driver_id = d.driver_id\n    WHERE f.driver_payout_inr > 0\n),\nTripGaps AS (\n    SELECT \n        driver_id,\n        driver_name,\n        shift_type,\n        fulfillment_id,\n        trip_started_at,\n        previous_trip_end_time,\n        ROUND(\n            (JULIANDIARM_MINS(trip_started_at, previous_trip_end_time)), \n            1\n        ) AS idle_minutes_between_trips,\n        driver_payout_inr\n    FROM (\n        SELECT \n            *,\n            -- SQLite date diff in minutes: (julianday(trip_started_at) - julianday(previous_trip_end_time)) * 1440.0\n            ROUND((JULIANDAY(trip_started_at) - JULIANDAY(previous_trip_end_time)) * 1440.0, 1) AS JULIANDIARM_MINS_CALC\n        FROM OrderedTrips\n    )\n)\n-- 2. Driver Performance & Earnings Summary\nSELECT \n    d.driver_id,\n    d.driver_name,\n    d.city,\n    d.shift_type,\n    d.rating,\n    COUNT(f.fulfillment_id) AS trips_completed,\n    ROUND(SUM(f.driver_payout_inr), 2) AS total_takehome_earnings_inr,\n    ROUND(AVG(f.driver_payout_inr), 2) AS avg_earnings_per_trip_inr,\n    ROUND(SUM(f.actual_distance_km), 1) AS total_driving_km,\n    DENSE_RANK() OVER (PARTITION BY d.city ORDER BY SUM(f.driver_payout_inr) DESC) AS city_earning_rank\nFROM driver_partners d\nLEFT JOIN trip_fulfillment_logs f ON d.driver_id = f.driver_id \n    AND f.driver_payout_inr > 0 AND f.actual_distance_km < 200\nGROUP BY d.driver_id, d.driver_name, d.city, d.shift_type, d.rating\nORDER BY d.city, total_takehome_earnings_inr DESC;\n",
  "07_esg": "-- ==============================================================================\n-- File: 07_ev_sustainability_unit_economics.sql\n-- Project: UrbanPulse Mobility Operations Analytics\n-- Business Purpose: Compares unit economics and ESG sustainability impact across\n-- Electric Vehicles (EV) vs Internal Combustion Engine (ICE - Petrol/CNG) fleets.\n-- Demonstrates: Unit economics modeling, ESG Carbon Avoidance calculations, CTEs.\n-- ==============================================================================\n\nWITH PowertrainTrips AS (\n    SELECT \n        v.powertrain,\n        v.vehicle_category,\n        f.fulfillment_id,\n        f.actual_distance_km,\n        f.gross_fare_inr,\n        f.driver_payout_inr,\n        (f.gross_fare_inr - f.driver_payout_inr) AS net_platform_revenue_inr,\n        -- Energy / Fuel cost per KM assumption based on Indian market benchmarks:\n        -- Electric: \u20b91.20/km | CNG: \u20b92.80/km | Petrol: \u20b94.80/km\n        CASE \n            WHEN v.powertrain = 'Electric' THEN f.actual_distance_km * 1.20\n            WHEN v.powertrain = 'CNG' THEN f.actual_distance_km * 2.80\n            ELSE f.actual_distance_km * 4.80\n        END AS estimated_energy_cost_inr,\n        -- ICE Equivalent fuel consumption (liters): ~16 km/l for 4W, ~40 km/l for 2W\n        CASE \n            WHEN v.powertrain = 'Electric' AND v.vehicle_category IN ('EV_Sedan', 'Prime_Sedan') \n                THEN f.actual_distance_km / 16.0\n            WHEN v.powertrain = 'Electric' AND v.vehicle_category IN ('Bike_Taxi', 'Auto_Rickshaw') \n                THEN f.actual_distance_km / 35.0\n            ELSE 0.0\n        END AS petrol_liters_displaced\n    FROM trip_fulfillment_logs f\n    JOIN fleet_vehicles v ON f.vehicle_id = v.vehicle_id\n    WHERE f.actual_distance_km > 0 AND f.actual_distance_km < 200 AND f.driver_payout_inr > 0\n)\nSELECT \n    powertrain,\n    COUNT(fulfillment_id) AS total_trips_completed,\n    ROUND(SUM(actual_distance_km), 1) AS total_km_traveled,\n    ROUND(SUM(gross_fare_inr), 2) AS total_gross_fare_inr,\n    ROUND(SUM(gross_fare_inr) / SUM(actual_distance_km), 2) AS revenue_per_km_inr,\n    ROUND(SUM(estimated_energy_cost_inr), 2) AS total_fuel_energy_cost_inr,\n    ROUND(SUM(estimated_energy_cost_inr) / SUM(actual_distance_km), 2) AS operating_energy_cost_per_km_inr,\n    ROUND(SUM(net_platform_revenue_inr), 2) AS net_platform_margin_inr,\n    -- ESG Green Impact metrics for Electric fleet:\n    ROUND(SUM(petrol_liters_displaced), 1) AS fossil_fuel_liters_saved,\n    -- Carbon avoidance: 1 liter petrol \u2248 2.31 kg CO2\n    ROUND(SUM(petrol_liters_displaced) * 2.31, 1) AS co2_emissions_averted_kg,\n    ROUND((SUM(petrol_liters_displaced) * 2.31) / 1000.0, 2) AS co2_emissions_averted_metric_tonnes\nFROM PowertrainTrips\nGROUP BY powertrain\nORDER BY total_km_traveled DESC;\n",
  "01_schema": "-- ==============================================================================\n-- File: 01_schema_and_views.sql\n-- Project: UrbanPulse Mobility Operations Analytics\n-- Description: DDL table schemas, indexes, and reusable reporting views.\n-- Compatible with SQLite and PostgreSQL.\n-- ==============================================================================\n\n-- 1. Master Table: Urban Zones\nCREATE TABLE IF NOT EXISTS urban_zones (\n    zone_id VARCHAR(10) PRIMARY KEY,\n    zone_name VARCHAR(100) NOT NULL,\n    city VARCHAR(50) NOT NULL,\n    zone_category VARCHAR(50) NOT NULL,\n    active_fleet_target INT NOT NULL,\n    base_surge_factor DECIMAL(3, 2) NOT NULL\n);\n\n-- 2. Master Table: Fleet Vehicles\nCREATE TABLE IF NOT EXISTS fleet_vehicles (\n    vehicle_id VARCHAR(15) PRIMARY KEY,\n    model_name VARCHAR(50) NOT NULL,\n    vehicle_category VARCHAR(30) NOT NULL,\n    powertrain VARCHAR(20) NOT NULL,\n    battery_or_tank_capacity DECIMAL(5, 2) NOT NULL,\n    status VARCHAR(30) NOT NULL,\n    current_odometer_km DECIMAL(8, 2) NOT NULL,\n    acquisition_date DATE NOT NULL\n);\n\n-- 3. Master Table: Driver Partners\nCREATE TABLE IF NOT EXISTS driver_partners (\n    driver_id VARCHAR(15) PRIMARY KEY,\n    driver_name VARCHAR(100) NOT NULL,\n    city VARCHAR(50) NOT NULL,\n    primary_zone_id VARCHAR(10) REFERENCES urban_zones(zone_id),\n    vehicle_id VARCHAR(15) REFERENCES fleet_vehicles(vehicle_id),\n    rating DECIMAL(3, 2) NOT NULL,\n    onboarding_date DATE NOT NULL,\n    shift_type VARCHAR(30) NOT NULL,\n    status VARCHAR(20) NOT NULL,\n    lifetime_trips INT NOT NULL\n);\n\n-- 4. Transaction Table: Ride Requests (Bookings)\nCREATE TABLE IF NOT EXISTS ride_requests (\n    booking_id VARCHAR(20) PRIMARY KEY,\n    customer_id VARCHAR(20) NOT NULL,\n    pickup_zone_id VARCHAR(10) REFERENCES urban_zones(zone_id),\n    drop_zone_id VARCHAR(10) REFERENCES urban_zones(zone_id),\n    vehicle_category VARCHAR(30) NOT NULL,\n    request_timestamp TIMESTAMP NOT NULL,\n    estimated_distance_km DECIMAL(6, 2) NOT NULL,\n    base_fare_inr DECIMAL(8, 2) NOT NULL,\n    surge_multiplier DECIMAL(3, 2) NOT NULL,\n    total_quoted_fare_inr DECIMAL(8, 2) NOT NULL,\n    booking_status VARCHAR(30) NOT NULL\n);\n\n-- 5. Transaction Table: Trip Fulfillment Logs\nCREATE TABLE IF NOT EXISTS trip_fulfillment_logs (\n    fulfillment_id VARCHAR(20) PRIMARY KEY,\n    booking_id VARCHAR(20) REFERENCES ride_requests(booking_id),\n    driver_id VARCHAR(15),\n    vehicle_id VARCHAR(15),\n    driver_assigned_at TIMESTAMP,\n    arrived_at_pickup_at TIMESTAMP,\n    trip_started_at TIMESTAMP,\n    trip_ended_at TIMESTAMP,\n    pickup_wait_mins DECIMAL(5, 2),\n    trip_duration_mins DECIMAL(6, 2),\n    actual_distance_km DECIMAL(6, 2),\n    gross_fare_inr DECIMAL(8, 2),\n    platform_commission_pct DECIMAL(5, 2),\n    driver_payout_inr DECIMAL(8, 2),\n    rider_rating DECIMAL(2, 1),\n    toll_or_tips_inr DECIMAL(6, 2)\n);\n\n-- 6. Log Table: Cancellation & Discrepancy Logs\nCREATE TABLE IF NOT EXISTS cancellation_discrepancy_logs (\n    cancellation_id VARCHAR(20) PRIMARY KEY,\n    booking_id VARCHAR(20) REFERENCES ride_requests(booking_id),\n    driver_id VARCHAR(15),\n    cancelled_by VARCHAR(20) NOT NULL,\n    cancellation_stage VARCHAR(30) NOT NULL,\n    cancellation_reason VARCHAR(100) NOT NULL,\n    cancellation_fee_charged_inr DECIMAL(6, 2) NOT NULL,\n    dispute_flag CHAR(1) NOT NULL\n);\n\n-- Performance Indexes\nCREATE INDEX IF NOT EXISTS idx_requests_pickup ON ride_requests(pickup_zone_id, booking_status);\nCREATE INDEX IF NOT EXISTS idx_requests_timestamp ON ride_requests(request_timestamp);\nCREATE INDEX IF NOT EXISTS idx_fulfillment_driver ON trip_fulfillment_logs(driver_id);\nCREATE INDEX IF NOT EXISTS idx_fulfillment_booking ON trip_fulfillment_logs(booking_id);\n\n-- ==============================================================================\n-- REUSABLE ANALYTIC VIEWS\n-- ==============================================================================\n\n-- View 1: Enriched Completed Rides View\nCREATE VIEW IF NOT EXISTS vw_completed_trips_enriched AS\nSELECT \n    f.fulfillment_id,\n    f.booking_id,\n    r.customer_id,\n    f.driver_id,\n    d.driver_name,\n    f.vehicle_id,\n    v.model_name,\n    v.vehicle_category,\n    v.powertrain,\n    pz.city,\n    pz.zone_name AS pickup_zone,\n    dz.zone_name AS drop_zone,\n    r.request_timestamp,\n    f.trip_started_at,\n    f.trip_ended_at,\n    f.pickup_wait_mins,\n    f.trip_duration_mins,\n    f.actual_distance_km,\n    r.surge_multiplier,\n    f.gross_fare_inr,\n    f.driver_payout_inr,\n    (f.gross_fare_inr - f.driver_payout_inr) AS net_platform_revenue_inr,\n    f.rider_rating\nFROM trip_fulfillment_logs f\nJOIN ride_requests r ON f.booking_id = r.booking_id\nLEFT JOIN driver_partners d ON f.driver_id = d.driver_id\nLEFT JOIN fleet_vehicles v ON f.vehicle_id = v.vehicle_id\nLEFT JOIN urban_zones pz ON r.pickup_zone_id = pz.zone_id\nLEFT JOIN urban_zones dz ON r.drop_zone_id = dz.zone_id\nWHERE f.pickup_wait_mins >= 0 AND f.actual_distance_km < 200 AND f.driver_payout_inr > 0;\n"
};
const MIS_SAMPLE = [
  {
    "report_date": "2026-02-01",
    "city": "Bengaluru",
    "total_requests": "36",
    "completed_trips": "22",
    "completion_rate_pct": "61.11",
    "driver_cancelled_trips": "5",
    "driver_cancel_rate_pct": "13.89",
    "rider_cancelled_trips": "9",
    "rider_cancel_rate_pct": "25.0",
    "eta_timeout_trips": "0",
    "gross_booking_value_inr": "8640.16",
    "driver_payouts_inr": "6912.12",
    "platform_net_revenue_inr": "1728.04",
    "avg_revenue_per_trip_inr": "392.73",
    "avg_surge_multiplier": "1.3",
    "avg_trip_distance_km": "13.04",
    "avg_pickup_wait_mins": "7.69",
    "active_drivers_on_road": "20",
    "active_vehicles_deployed": "20"
  },
  {
    "report_date": "2026-02-01",
    "city": "Delhi-NCR",
    "total_requests": "54",
    "completed_trips": "46",
    "completion_rate_pct": "85.19",
    "driver_cancelled_trips": "2",
    "driver_cancel_rate_pct": "3.7",
    "rider_cancelled_trips": "5",
    "rider_cancel_rate_pct": "9.26",
    "eta_timeout_trips": "1",
    "gross_booking_value_inr": "23007.1",
    "driver_payouts_inr": "18405.68",
    "platform_net_revenue_inr": "4601.42",
    "avg_revenue_per_trip_inr": "500.15",
    "avg_surge_multiplier": "1.47",
    "avg_trip_distance_km": "15.35",
    "avg_pickup_wait_mins": "7.96",
    "active_drivers_on_road": "38",
    "active_vehicles_deployed": "38"
  },
  {
    "report_date": "2026-02-01",
    "city": "Mumbai",
    "total_requests": "34",
    "completed_trips": "21",
    "completion_rate_pct": "61.76",
    "driver_cancelled_trips": "7",
    "driver_cancel_rate_pct": "20.59",
    "rider_cancelled_trips": "5",
    "rider_cancel_rate_pct": "14.71",
    "eta_timeout_trips": "1",
    "gross_booking_value_inr": "10302.5",
    "driver_payouts_inr": "8242.01",
    "platform_net_revenue_inr": "2060.49",
    "avg_revenue_per_trip_inr": "490.6",
    "avg_surge_multiplier": "1.33",
    "avg_trip_distance_km": "14.67",
    "avg_pickup_wait_mins": "7.83",
    "active_drivers_on_road": "21",
    "active_vehicles_deployed": "21"
  },
  {
    "report_date": "2026-02-02",
    "city": "Bengaluru",
    "total_requests": "40",
    "completed_trips": "31",
    "completion_rate_pct": "77.5",
    "driver_cancelled_trips": "5",
    "driver_cancel_rate_pct": "12.5",
    "rider_cancelled_trips": "3",
    "rider_cancel_rate_pct": "7.5",
    "eta_timeout_trips": "1",
    "gross_booking_value_inr": "14887.82",
    "driver_payouts_inr": "11910.27",
    "platform_net_revenue_inr": "2977.55",
    "avg_revenue_per_trip_inr": "480.25",
    "avg_surge_multiplier": "1.12",
    "avg_trip_distance_km": "16.6",
    "avg_pickup_wait_mins": "7.64",
    "active_drivers_on_road": "30",
    "active_vehicles_deployed": "30"
  },
  {
    "report_date": "2026-02-02",
    "city": "Delhi-NCR",
    "total_requests": "54",
    "completed_trips": "40",
    "completion_rate_pct": "74.07",
    "driver_cancelled_trips": "5",
    "driver_cancel_rate_pct": "9.26",
    "rider_cancelled_trips": "5",
    "rider_cancel_rate_pct": "9.26",
    "eta_timeout_trips": "4",
    "gross_booking_value_inr": "19163.5",
    "driver_payouts_inr": "15330.8",
    "platform_net_revenue_inr": "3832.7",
    "avg_revenue_per_trip_inr": "479.09",
    "avg_surge_multiplier": "1.25",
    "avg_trip_distance_km": "14.72",
    "avg_pickup_wait_mins": "9.09",
    "active_drivers_on_road": "39",
    "active_vehicles_deployed": "39"
  },
  {
    "report_date": "2026-02-02",
    "city": "Mumbai",
    "total_requests": "58",
    "completed_trips": "46",
    "completion_rate_pct": "79.31",
    "driver_cancelled_trips": "9",
    "driver_cancel_rate_pct": "15.52",
    "rider_cancelled_trips": "2",
    "rider_cancel_rate_pct": "3.45",
    "eta_timeout_trips": "1",
    "gross_booking_value_inr": "22578.8",
    "driver_payouts_inr": "18063.03",
    "platform_net_revenue_inr": "4515.77",
    "avg_revenue_per_trip_inr": "490.84",
    "avg_surge_multiplier": "1.33",
    "avg_trip_distance_km": "15.44",
    "avg_pickup_wait_mins": "7.63",
    "active_drivers_on_road": "42",
    "active_vehicles_deployed": "42"
  },
  {
    "report_date": "2026-02-03",
    "city": "Bengaluru",
    "total_requests": "62",
    "completed_trips": "47",
    "completion_rate_pct": "75.81",
    "driver_cancelled_trips": "10",
    "driver_cancel_rate_pct": "16.13",
    "rider_cancelled_trips": "4",
    "rider_cancel_rate_pct": "6.45",
    "eta_timeout_trips": "1",
    "gross_booking_value_inr": "21328.88",
    "driver_payouts_inr": "17063.11",
    "platform_net_revenue_inr": "4265.77",
    "avg_revenue_per_trip_inr": "453.81",
    "avg_surge_multiplier": "1.24",
    "avg_trip_distance_km": "15.45",
    "avg_pickup_wait_mins": "8.4",
    "active_drivers_on_road": "43",
    "active_vehicles_deployed": "43"
  },
  {
    "report_date": "2026-02-03",
    "city": "Delhi-NCR",
    "total_requests": "58",
    "completed_trips": "41",
    "completion_rate_pct": "70.69",
    "driver_cancelled_trips": "6",
    "driver_cancel_rate_pct": "10.34",
    "rider_cancelled_trips": "7",
    "rider_cancel_rate_pct": "12.07",
    "eta_timeout_trips": "4",
    "gross_booking_value_inr": "20573.22",
    "driver_payouts_inr": "16458.57",
    "platform_net_revenue_inr": "4114.65",
    "avg_revenue_per_trip_inr": "501.79",
    "avg_surge_multiplier": "1.34",
    "avg_trip_distance_km": "15.32",
    "avg_pickup_wait_mins": "8.03",
    "active_drivers_on_road": "35",
    "active_vehicles_deployed": "35"
  },
  {
    "report_date": "2026-02-03",
    "city": "Mumbai",
    "total_requests": "51",
    "completed_trips": "39",
    "completion_rate_pct": "76.47",
    "driver_cancelled_trips": "4",
    "driver_cancel_rate_pct": "7.84",
    "rider_cancelled_trips": "2",
    "rider_cancel_rate_pct": "3.92",
    "eta_timeout_trips": "6",
    "gross_booking_value_inr": "17662.3",
    "driver_payouts_inr": "14129.83",
    "platform_net_revenue_inr": "3532.47",
    "avg_revenue_per_trip_inr": "452.88",
    "avg_surge_multiplier": "1.39",
    "avg_trip_distance_km": "14.9",
    "avg_pickup_wait_mins": "9.31",
    "active_drivers_on_road": "35",
    "active_vehicles_deployed": "35"
  },
  {
    "report_date": "2026-02-04",
    "city": "Bengaluru",
    "total_requests": "65",
    "completed_trips": "46",
    "completion_rate_pct": "70.77",
    "driver_cancelled_trips": "8",
    "driver_cancel_rate_pct": "12.31",
    "rider_cancelled_trips": "8",
    "rider_cancel_rate_pct": "12.31",
    "eta_timeout_trips": "3",
    "gross_booking_value_inr": "22905.56",
    "driver_payouts_inr": "18324.47",
    "platform_net_revenue_inr": "4581.09",
    "avg_revenue_per_trip_inr": "497.95",
    "avg_surge_multiplier": "1.32",
    "avg_trip_distance_km": "15.68",
    "avg_pickup_wait_mins": "7.46",
    "active_drivers_on_road": "42",
    "active_vehicles_deployed": "42"
  },
  {
    "report_date": "2026-02-04",
    "city": "Delhi-NCR",
    "total_requests": "60",
    "completed_trips": "42",
    "completion_rate_pct": "70.0",
    "driver_cancelled_trips": "6",
    "driver_cancel_rate_pct": "10.0",
    "rider_cancelled_trips": "8",
    "rider_cancel_rate_pct": "13.33",
    "eta_timeout_trips": "4",
    "gross_booking_value_inr": "20216.84",
    "driver_payouts_inr": "16173.48",
    "platform_net_revenue_inr": "4043.36",
    "avg_revenue_per_trip_inr": "481.35",
    "avg_surge_multiplier": "1.34",
    "avg_trip_distance_km": "15.95",
    "avg_pickup_wait_mins": "7.77",
    "active_drivers_on_road": "39",
    "active_vehicles_deployed": "39"
  },
  {
    "report_date": "2026-02-04",
    "city": "Mumbai",
    "total_requests": "54",
    "completed_trips": "40",
    "completion_rate_pct": "74.07",
    "driver_cancelled_trips": "8",
    "driver_cancel_rate_pct": "14.81",
    "rider_cancelled_trips": "5",
    "rider_cancel_rate_pct": "9.26",
    "eta_timeout_trips": "1",
    "gross_booking_value_inr": "19226.16",
    "driver_payouts_inr": "15380.93",
    "platform_net_revenue_inr": "3845.23",
    "avg_revenue_per_trip_inr": "480.65",
    "avg_surge_multiplier": "1.27",
    "avg_trip_distance_km": "15.72",
    "avg_pickup_wait_mins": "9.1",
    "active_drivers_on_road": "35",
    "active_vehicles_deployed": "35"
  },
  {
    "report_date": "2026-02-05",
    "city": "Bengaluru",
    "total_requests": "46",
    "completed_trips": "34",
    "completion_rate_pct": "73.91",
    "driver_cancelled_trips": "5",
    "driver_cancel_rate_pct": "10.87",
    "rider_cancelled_trips": "6",
    "rider_cancel_rate_pct": "13.04",
    "eta_timeout_trips": "1",
    "gross_booking_value_inr": "16167.56",
    "driver_payouts_inr": "12934.02",
    "platform_net_revenue_inr": "3233.54",
    "avg_revenue_per_trip_inr": "475.52",
    "avg_surge_multiplier": "1.27",
    "avg_trip_distance_km": "13.9",
    "avg_pickup_wait_mins": "8.13",
    "active_drivers_on_road": "33",
    "active_vehicles_deployed": "33"
  },
  {
    "report_date": "2026-02-05",
    "city": "Delhi-NCR",
    "total_requests": "61",
    "completed_trips": "44",
    "completion_rate_pct": "72.13",
    "driver_cancelled_trips": "11",
    "driver_cancel_rate_pct": "18.03",
    "rider_cancelled_trips": "4",
    "rider_cancel_rate_pct": "6.56",
    "eta_timeout_trips": "2",
    "gross_booking_value_inr": "24804.14",
    "driver_payouts_inr": "19843.32",
    "platform_net_revenue_inr": "4960.82",
    "avg_revenue_per_trip_inr": "563.73",
    "avg_surge_multiplier": "1.4",
    "avg_trip_distance_km": "15.63",
    "avg_pickup_wait_mins": "7.78",
    "active_drivers_on_road": "40",
    "active_vehicles_deployed": "40"
  },
  {
    "report_date": "2026-02-05",
    "city": "Mumbai",
    "total_requests": "39",
    "completed_trips": "29",
    "completion_rate_pct": "74.36",
    "driver_cancelled_trips": "5",
    "driver_cancel_rate_pct": "12.82",
    "rider_cancelled_trips": "4",
    "rider_cancel_rate_pct": "10.26",
    "eta_timeout_trips": "1",
    "gross_booking_value_inr": "13105.66",
    "driver_payouts_inr": "10484.52",
    "platform_net_revenue_inr": "2621.14",
    "avg_revenue_per_trip_inr": "451.92",
    "avg_surge_multiplier": "1.3",
    "avg_trip_distance_km": "16.07",
    "avg_pickup_wait_mins": "8.3",
    "active_drivers_on_road": "27",
    "active_vehicles_deployed": "27"
  },
  {
    "report_date": "2026-02-06",
    "city": "Bengaluru",
    "total_requests": "57",
    "completed_trips": "45",
    "completion_rate_pct": "78.95",
    "driver_cancelled_trips": "6",
    "driver_cancel_rate_pct": "10.53",
    "rider_cancelled_trips": "4",
    "rider_cancel_rate_pct": "7.02",
    "eta_timeout_trips": "2",
    "gross_booking_value_inr": "22140.0",
    "driver_payouts_inr": "17711.99",
    "platform_net_revenue_inr": "4428.01",
    "avg_revenue_per_trip_inr": "492.0",
    "avg_surge_multiplier": "1.33",
    "avg_trip_distance_km": "15.33",
    "avg_pickup_wait_mins": "7.49",
    "active_drivers_on_road": "42",
    "active_vehicles_deployed": "42"
  },
  {
    "report_date": "2026-02-06",
    "city": "Delhi-NCR",
    "total_requests": "67",
    "completed_trips": "51",
    "completion_rate_pct": "76.12",
    "driver_cancelled_trips": "8",
    "driver_cancel_rate_pct": "11.94",
    "rider_cancelled_trips": "8",
    "rider_cancel_rate_pct": "11.94",
    "eta_timeout_trips": "0",
    "gross_booking_value_inr": "27874.46",
    "driver_payouts_inr": "22299.57",
    "platform_net_revenue_inr": "5574.89",
    "avg_revenue_per_trip_inr": "546.56",
    "avg_surge_multiplier": "1.3",
    "avg_trip_distance_km": "17.61",
    "avg_pickup_wait_mins": "8.03",
    "active_drivers_on_road": "48",
    "active_vehicles_deployed": "48"
  },
  {
    "report_date": "2026-02-06",
    "city": "Mumbai",
    "total_requests": "47",
    "completed_trips": "37",
    "completion_rate_pct": "78.72",
    "driver_cancelled_trips": "4",
    "driver_cancel_rate_pct": "8.51",
    "rider_cancelled_trips": "5",
    "rider_cancel_rate_pct": "10.64",
    "eta_timeout_trips": "1",
    "gross_booking_value_inr": "19485.68",
    "driver_payouts_inr": "15588.55",
    "platform_net_revenue_inr": "3897.13",
    "avg_revenue_per_trip_inr": "526.64",
    "avg_surge_multiplier": "1.32",
    "avg_trip_distance_km": "16.69",
    "avg_pickup_wait_mins": "7.24",
    "active_drivers_on_road": "33",
    "active_vehicles_deployed": "33"
  },
  {
    "report_date": "2026-02-07",
    "city": "Bengaluru",
    "total_requests": "46",
    "completed_trips": "33",
    "completion_rate_pct": "71.74",
    "driver_cancelled_trips": "6",
    "driver_cancel_rate_pct": "13.04",
    "rider_cancelled_trips": "5",
    "rider_cancel_rate_pct": "10.87",
    "eta_timeout_trips": "2",
    "gross_booking_value_inr": "16949.2",
    "driver_payouts_inr": "13559.33",
    "platform_net_revenue_inr": "3389.87",
    "avg_revenue_per_trip_inr": "513.61",
    "avg_surge_multiplier": "1.28",
    "avg_trip_distance_km": "15.66",
    "avg_pickup_wait_mins": "8.28",
    "active_drivers_on_road": "32",
    "active_vehicles_deployed": "32"
  },
  {
    "report_date": "2026-02-07",
    "city": "Delhi-NCR",
    "total_requests": "53",
    "completed_trips": "35",
    "completion_rate_pct": "66.04",
    "driver_cancelled_trips": "6",
    "driver_cancel_rate_pct": "11.32",
    "rider_cancelled_trips": "9",
    "rider_cancel_rate_pct": "16.98",
    "eta_timeout_trips": "3",
    "gross_booking_value_inr": "16190.74",
    "driver_payouts_inr": "12952.58",
    "platform_net_revenue_inr": "3238.16",
    "avg_revenue_per_trip_inr": "462.59",
    "avg_surge_multiplier": "1.29",
    "avg_trip_distance_km": "16.18",
    "avg_pickup_wait_mins": "8.76",
    "active_drivers_on_road": "30",
    "active_vehicles_deployed": "30"
  }
];

let charts = {};

function switchTab(tabId) {
  document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.remove('text-emerald-400', 'bg-slate-800');
    btn.classList.add('text-slate-400');
  });

  const activeTab = document.getElementById('tab-' + tabId);
  const activeBtn = document.getElementById('tab-btn-' + tabId);
  if (activeTab) activeTab.classList.remove('hidden');
  if (activeBtn) {
    activeBtn.classList.add('text-emerald-400', 'bg-slate-800');
    activeBtn.classList.remove('text-slate-400');
  }

  if (tabId === 'sql') renderSqlQuery();
  if (tabId === 'mis') renderMisTable();
}

window.addEventListener('DOMContentLoaded', () => {
  initCharts();
  applyFilters();
  renderSqlQuery();
  renderMisTable();
});

function initCharts() {
  // 1. Hourly Chart
  const ctxHourly = document.getElementById('chart-hourly').getContext('2d');
  charts.hourly = new Chart(ctxHourly, {
    type: 'bar',
    data: {
      labels: DASHBOARD_DATA.hourly_data.map(d => String(d.hour).padStart(2, '0') + ':00'),
      datasets: [
        {
          label: 'Requests Volume',
          data: DASHBOARD_DATA.hourly_data.map(d => d.requests),
          backgroundColor: 'rgba(16, 185, 129, 0.4)',
          borderColor: '#10b981',
          borderWidth: 1.5,
          borderRadius: 4,
          yAxisID: 'y'
        },
        {
          label: 'Fulfillment Rate %',
          data: DASHBOARD_DATA.hourly_data.map(d => Math.round(d.completed / d.requests * 100)),
          type: 'line',
          borderColor: '#38bdf8',
          backgroundColor: '#38bdf8',
          borderWidth: 2,
          pointRadius: 3,
          tension: 0.3,
          yAxisID: 'y1'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      scales: {
        x: { grid: { color: 'rgba(51, 65, 85, 0.3)' }, ticks: { color: '#94a3b8', font: { size: 10 } } },
        y: { grid: { color: 'rgba(51, 65, 85, 0.3)' }, ticks: { color: '#94a3b8' }, title: { display: true, text: 'Requests', color: '#94a3b8' } },
        y1: { position: 'right', min: 0, max: 100, grid: { display: false }, ticks: { color: '#38bdf8', callback: v => v + '%' }, title: { display: true, text: 'Completion %', color: '#38bdf8' } }
      },
      plugins: { legend: { labels: { color: '#cbd5e1', font: { size: 11 } } } }
    }
  });

  // 2. Cancellations Chart
  const ctxCancel = document.getElementById('chart-cancellations').getContext('2d');
  const cancelLabels = DASHBOARD_DATA.cancel_data.slice(0, 6).map(d => d.cancellation_reason.replace(/_/g, ' '));
  const cancelLostGBV = DASHBOARD_DATA.cancel_data.slice(0, 6).map(d => d.lost_gbv);
  charts.cancel = new Chart(ctxCancel, {
    type: 'bar',
    data: {
      labels: cancelLabels,
      datasets: [{
        label: 'Lost GBV (₹)',
        data: cancelLostGBV,
        backgroundColor: [
          '#f59e0b', '#fbbf24', '#f97316', '#ef4444', '#ec4899', '#a855f7'
        ],
        borderRadius: 4
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: { grid: { color: 'rgba(51, 65, 85, 0.3)' }, ticks: { color: '#94a3b8', callback: v => '₹' + (v/1000) + 'k' } },
        y: { grid: { display: false }, ticks: { color: '#e2e8f0', font: { size: 10 } } }
      },
      plugins: { legend: { display: false } }
    }
  });

  // 3. Surge Pricing Chart
  const ctxSurge = document.getElementById('chart-surge').getContext('2d');
  charts.surge = new Chart(ctxSurge, {
    type: 'bar',
    data: {
      labels: DASHBOARD_DATA.surge_data.map(d => d.surge_tier),
      datasets: [
        {
          label: 'Completion %',
          data: DASHBOARD_DATA.surge_data.map(d => Math.round(d.completed / d.requests * 100)),
          backgroundColor: '#38bdf8',
          borderRadius: 4
        },
        {
          label: 'Rider Drop-off %',
          data: DASHBOARD_DATA.surge_data.map(d => Math.round(d.rider_dropoff / d.requests * 100)),
          backgroundColor: '#f87171',
          borderRadius: 4
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: { grid: { color: 'rgba(51, 65, 85, 0.3)' }, ticks: { color: '#94a3b8', font: { size: 11 } } },
        y: { max: 100, grid: { color: 'rgba(51, 65, 85, 0.3)' }, ticks: { color: '#94a3b8', callback: v => v + '%' } }
      },
      plugins: { legend: { labels: { color: '#cbd5e1' } } }
    }
  });

  // 4. Powertrain Chart
  const ctxPower = document.getElementById('chart-powertrain').getContext('2d');
  charts.power = new Chart(ctxPower, {
    type: 'doughnut',
    data: {
      labels: DASHBOARD_DATA.powertrain_data.map(d => d.powertrain + ' (' + Math.round(d.km).toLocaleString() + ' km)'),
      datasets: [{
        data: DASHBOARD_DATA.powertrain_data.map(d => d.km),
        backgroundColor: ['#10b981', '#38bdf8', '#f59e0b'],
        borderWidth: 2,
        borderColor: '#0f172a'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'bottom', labels: { color: '#cbd5e1', font: { size: 11 } } }
      }
    }
  });
}

function applyFilters() {
  const selectedCity = document.getElementById('filter-city').value;
  const selectedCategory = document.getElementById('filter-category').value;

  const rows = DASHBOARD_DATA.city_cat_data.filter(r => {
    const cityMatch = (selectedCity === 'ALL' || r.city === selectedCity);
    const catMatch = (selectedCategory === 'ALL' || r.vehicle_category === selectedCategory);
    return cityMatch && catMatch;
  });

  let totalRequests = 0;
  let completed = 0;
  let driverCancel = 0;
  let grossFare = 0;
  let totalKm = 0;
  let weightedWaitSum = 0;
  let waitCount = 0;

  rows.forEach(r => {
    totalRequests += r.total_requests;
    completed += r.completed;
    driverCancel += r.driver_cancelled;
    grossFare += r.gross_fare;
    totalKm += r.total_km;
    if (r.avg_wait !== null && r.completed > 0) {
      weightedWaitSum += (r.avg_wait * r.completed);
      waitCount += r.completed;
    }
  });

  const fulfillmentRate = totalRequests > 0 ? ((completed / totalRequests) * 100).toFixed(1) : 0;
  const driverCancelRate = totalRequests > 0 ? ((driverCancel / totalRequests) * 100).toFixed(1) : 0;
  const netRevenue = (grossFare * 0.20);
  const avgWait = waitCount > 0 ? (weightedWaitSum / waitCount).toFixed(1) : '8.1';
  const co2AvoidedTonnes = ((totalKm * 0.52 / 20.0) * 2.31 / 1000).toFixed(2);

  document.getElementById('kpi-requests').innerText = totalRequests.toLocaleString();
  document.getElementById('kpi-fulfillment').innerText = fulfillmentRate + '%';
  document.getElementById('kpi-driver-cancel').innerText = driverCancelRate + '%';
  document.getElementById('kpi-revenue').innerText = '₹' + (netRevenue >= 100000 ? (netRevenue / 100000).toFixed(2) + ' L' : Math.round(netRevenue).toLocaleString());
  document.getElementById('kpi-wait').innerText = avgWait + ' min';
  document.getElementById('kpi-co2').innerText = co2AvoidedTonnes + ' T';
}

function resetFilters() {
  document.getElementById('filter-city').value = 'ALL';
  document.getElementById('filter-category').value = 'ALL';
  applyFilters();
}

function renderSqlQuery() {
  const select = document.getElementById('sql-query-select');
  const codeDisplay = document.getElementById('sql-code-display');
  const title = document.getElementById('sql-query-title');

  if (select && codeDisplay) {
    const key = select.value;
    codeDisplay.textContent = SQL_QUERIES[key] || '-- Query not found';
    title.textContent = select.options[select.selectedIndex].text;
  }
}

function copySqlQuery() {
  const code = document.getElementById('sql-code-display').textContent;
  navigator.clipboard.writeText(code).then(() => {
    alert('SQL query copied to clipboard!');
  });
}

function renderMisTable() {
  const tbody = document.getElementById('mis-table-body');
  if (!tbody) return;
  tbody.innerHTML = '';
  MIS_SAMPLE.forEach(r => {
    const tr = document.createElement('tr');
    tr.className = 'hover:bg-slate-800/40 transition';
    const compPct = parseFloat(r.completion_rate_pct);
    tr.innerHTML = `
      <td class="p-3 font-mono text-slate-300">${r.report_date}</td>
      <td class="p-3 font-semibold text-white">${r.city}</td>
      <td class="p-3 font-mono">${r.total_requests}</td>
      <td class="p-3 font-mono text-emerald-400">${r.completed_trips}</td>
      <td class="p-3 font-mono font-bold ${compPct >= 70 ? 'text-emerald-400' : 'text-amber-400'}">${r.completion_rate_pct}%</td>
      <td class="p-3 font-mono text-amber-400">${r.driver_cancelled_trips}</td>
      <td class="p-3 font-mono text-rose-400">${r.rider_cancelled_trips}</td>
      <td class="p-3 font-mono text-white font-medium">₹${parseFloat(r.platform_net_revenue_inr).toLocaleString()}</td>
      <td class="p-3 font-mono text-sky-400">${r.avg_surge_multiplier}x</td>
      <td class="p-3 font-mono">${r.avg_pickup_wait_mins}m</td>
    `;
    tbody.appendChild(tr);
  });
}
