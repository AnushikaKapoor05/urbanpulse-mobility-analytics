#!/usr/bin/env python3
"""
UrbanPulse Mobility - Synthetic Operational Data Generator
Generates realistic multi-city ride-hailing and fleet operations datasets:
1. urban_zones.csv
2. fleet_vehicles.csv
3. driver_partners.csv
4. ride_requests.csv
5. trip_fulfillment_logs.csv
6. cancellation_discrepancy_logs.csv
"""

import csv
import os
import random
from datetime import datetime, timedelta

# Set fixed seed for reproducibility
random.seed(42)

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(BASE_DIR, "data")
os.makedirs(DATA_DIR, exist_ok=True)

# 1. Urban Zones Master
ZONES = [
    # Delhi-NCR
    ("Z101", "Gurugram Cyber City", "Delhi-NCR", "Tech Park", 120, 1.4),
    ("Z102", "Udyog Vihar Gurugram", "Delhi-NCR", "Commercial", 90, 1.3),
    ("Z103", "Golf Course Road", "Delhi-NCR", "Residential_Premium", 80, 1.2),
    ("Z104", "Delhi IGI Airport T3", "Delhi-NCR", "Airport", 150, 1.6),
    ("Z105", "Connaught Place", "Delhi-NCR", "Commercial", 110, 1.3),
    ("Z106", "Noida Sector 62", "Delhi-NCR", "Tech Park", 85, 1.2),
    ("Z107", "South Extension", "Delhi-NCR", "Residential", 70, 1.1),
    # Bengaluru
    ("Z201", "Koramangala", "Bengaluru", "Commercial_Startup", 140, 1.5),
    ("Z202", "Indiranagar", "Bengaluru", "Commercial_Nightlife", 130, 1.5),
    ("Z203", "Whitefield Tech Corridor", "Bengaluru", "Tech Park", 160, 1.6),
    ("Z204", "HSR Layout", "Bengaluru", "Residential_Startup", 110, 1.3),
    ("Z205", "Electronic City Phase 1", "Bengaluru", "Tech Park", 100, 1.4),
    ("Z206", "Kempegowda Airport T1", "Bengaluru", "Airport", 140, 1.7),
    # Mumbai
    ("Z301", "Bandra Kurla Complex (BKC)", "Mumbai", "Financial District", 160, 1.7),
    ("Z302", "Lower Parel", "Mumbai", "Commercial", 130, 1.5),
    ("Z303", "Andheri East MIDC", "Mumbai", "Commercial_Transit", 120, 1.4),
    ("Z304", "Powai Hiranandani", "Mumbai", "Residential_Tech", 95, 1.2),
    ("Z305", "Mumbai Airport T2", "Mumbai", "Airport", 150, 1.6),
]

def generate_zones():
    filepath = os.path.join(DATA_DIR, "urban_zones.csv")
    with open(filepath, "w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerow(["zone_id", "zone_name", "city", "zone_category", "active_fleet_target", "base_surge_factor"])
        for row in ZONES:
            writer.writerow(row)
    print(f"Generated {len(ZONES)} urban zones at {filepath}")

VEHICLE_MODELS = [
    ("EV_Sedan", "Tata Tigor EV", "Electric", 26.0),
    ("EV_Sedan", "MG ZS EV", "Electric", 50.3),
    ("Prime_Sedan", "Maruti Suzuki Dzire", "CNG", 55.0),
    ("Prime_Sedan", "Hyundai Aura", "Petrol", 37.0),
    ("Auto_Rickshaw", "Bajaj RE E-Tec 9.0", "Electric", 8.9),
    ("Auto_Rickshaw", "Piaggio Ape Auto", "CNG", 30.0),
    ("Bike_Taxi", "Ola S1 Pro EV", "Electric", 4.0),
    ("Bike_Taxi", "Hero Splendor Plus", "Petrol", 9.8),
]

def generate_vehicles(num_vehicles=300):
    filepath = os.path.join(DATA_DIR, "fleet_vehicles.csv")
    vehicles = []
    statuses = ["Active", "Active", "Active", "Active", "Idle", "Grounded_Maintenance"]
    
    start_date = datetime(2025, 1, 1)
    
    with open(filepath, "w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerow([
            "vehicle_id", "model_name", "vehicle_category", "powertrain", 
            "battery_or_tank_capacity", "status", "current_odometer_km", "acquisition_date"
        ])
        for i in range(1, num_vehicles + 1):
            vid = f"VEH_{i:04d}"
            cat, model, pwt, cap = random.choice(VEHICLE_MODELS)
            status = random.choice(statuses)
            odo = round(random.uniform(5000, 65000), 1)
            acq_days = random.randint(30, 450)
            acq_date = (start_date - timedelta(days=acq_days)).strftime("%Y-%m-%d")
            writer.writerow([vid, model, cat, pwt, cap, status, odo, acq_date])
            vehicles.append((vid, cat, pwt, status))
    print(f"Generated {num_vehicles} fleet vehicles at {filepath}")
    return vehicles

FIRST_NAMES = ["Aarav", "Rahul", "Amit", "Vikram", "Rohan", "Suresh", "Manoj", "Deepak", "Sunil", "Rajesh", 
               "Pradeep", "Sachin", "Vijay", "Anil", "Gaurav", "Pooja", "Priya", "Neha", "Kavita", "Ritu"]
LAST_NAMES = ["Sharma", "Verma", "Kumar", "Singh", "Yadav", "Patel", "Gupta", "Joshi", "Das", "Rao", 
              "Reddy", "Nair", "Mishra", "Chauhan", "Shukla"]

def generate_drivers(vehicles):
    filepath = os.path.join(DATA_DIR, "driver_partners.csv")
    drivers = []
    shifts = ["Full_Time_Day", "Full_Time_Night", "Part_Time_Peak"]
    
    with open(filepath, "w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerow([
            "driver_id", "driver_name", "city", "primary_zone_id", "vehicle_id", 
            "rating", "onboarding_date", "shift_type", "status", "lifetime_trips"
        ])
        for idx, (vid, cat, pwt, vstatus) in enumerate(vehicles, 1):
            did = f"DRV_{idx:04d}"
            name = f"{random.choice(FIRST_NAMES)} {random.choice(LAST_NAMES)}"
            zone = random.choice(ZONES)
            zone_id, _, city, _, _, _ = zone
            rating = round(random.uniform(4.3, 4.98), 2)
            onboard_date = (datetime(2025, 6, 1) + timedelta(days=random.randint(0, 240))).strftime("%Y-%m-%d")
            shift = random.choice(shifts)
            dstatus = "Active" if vstatus in ["Active", "Idle"] else "Inactive"
            lifetime_trips = random.randint(120, 2800)
            writer.writerow([did, name, city, zone_id, vid, rating, onboard_date, shift, dstatus, lifetime_trips])
            drivers.append((did, name, city, zone_id, vid, cat, pwt, dstatus))
    print(f"Generated {len(drivers)} driver partners at {filepath}")
    return drivers

def generate_operations(drivers, num_orders=6500):
    requests_file = os.path.join(DATA_DIR, "ride_requests.csv")
    fulfillment_file = os.path.join(DATA_DIR, "trip_fulfillment_logs.csv")
    cancellation_file = os.path.join(DATA_DIR, "cancellation_discrepancy_logs.csv")
    
    start_time = datetime(2026, 2, 1, 6, 0, 0)
    
    active_drivers = [d for d in drivers if d[7] == "Active"]
    
    cancellation_reasons_driver = [
        "Driver_Refused_Drop_Location", "Driver_Demanded_Cash_Offline", 
        "Vehicle_Mechanical_Issue", "Traffic_Gridlock_En_Route"
    ]
    cancellation_reasons_rider = [
        "High_ETA_Long_Wait_Time", "Driver_Not_Moving", 
        "Change_of_Plans", "Booked_Alternative_Ride"
    ]
    
    booking_rows = []
    fulfillment_rows = []
    cancellation_rows = []
    
    discrepancy_count = 0
    
    for i in range(1, num_orders + 1):
        bid = f"BK_{i:06d}"
        cid = f"CUST_{random.randint(1001, 3500):05d}"
        
        # Select pickup and drop zones
        pickup_zone = random.choice(ZONES)
        drop_zone = random.choice([z for z in ZONES if z[0] != pickup_zone[0]])
        
        # Timestamp distribution across 45 operational days
        delta_mins = random.randint(0, 45 * 24 * 60)
        req_time = start_time + timedelta(minutes=delta_mins)
        hour = req_time.hour
        
        # Peak vs off-peak surge modeling
        is_peak = (8 <= hour <= 11) or (17 <= hour <= 21)
        if is_peak:
            surge_mult = round(random.choice([1.2, 1.4, 1.6, 1.8, 2.1, 2.4]), 1)
        else:
            surge_mult = round(random.choice([1.0, 1.0, 1.0, 1.1, 1.2]), 1)
            
        driver = random.choice(active_drivers)
        did, dname, dcity, dzone, dvid, dcat, dpwt, _ = driver
        
        # Estimated distance and base fare
        base_rate_km = {"Bike_Taxi": 12.0, "Auto_Rickshaw": 18.0, "Prime_Sedan": 28.0, "EV_Sedan": 26.0}[dcat]
        base_flag_fare = {"Bike_Taxi": 25.0, "Auto_Rickshaw": 40.0, "Prime_Sedan": 70.0, "EV_Sedan": 65.0}[dcat]
        
        est_distance = round(random.uniform(2.5, 28.5), 1)
        base_fare = round(base_flag_fare + (est_distance * base_rate_km), 2)
        total_quoted_fare = round(base_fare * surge_mult, 2)
        
        # Outcome probabilities: 74% Completed, 14% Driver_Cancelled, 9% Rider_Cancelled, 3% ETA_Timeout
        # During high surge, cancellations slightly increase due to price sensitivity & high wait
        rand_val = random.random()
        if surge_mult >= 1.8:
            completed_thresh = 0.65
            driver_cancel_thresh = 0.81
            rider_cancel_thresh = 0.96
        else:
            completed_thresh = 0.76
            driver_cancel_thresh = 0.88
            rider_cancel_thresh = 0.97
            
        if rand_val < completed_thresh:
            status = "Completed"
        elif rand_val < driver_cancel_thresh:
            status = "Driver_Cancelled"
        elif rand_val < rider_cancel_thresh:
            status = "Rider_Cancelled"
        else:
            status = "ETA_Timeout"
            
        booking_rows.append([
            bid, cid, pickup_zone[0], drop_zone[0], dcat, 
            req_time.strftime("%Y-%m-%d %H:%M:%S"), est_distance, 
            base_fare, surge_mult, total_quoted_fare, status
        ])
        
        if status == "Completed":
            fid = f"FUL_{i:06d}"
            # Time progression
            driver_assigned_at = req_time + timedelta(seconds=random.randint(15, 90))
            wait_mins = round(random.uniform(2.0, 14.0), 1)
            arrived_at_pickup = driver_assigned_at + timedelta(minutes=wait_mins)
            trip_started_at = arrived_at_pickup + timedelta(minutes=random.uniform(1.0, 4.0))
            
            speed_kmh = random.uniform(22.0, 42.0)
            trip_duration = round((est_distance / speed_kmh) * 60, 1)
            trip_ended_at = trip_started_at + timedelta(minutes=trip_duration)
            
            actual_dist = round(est_distance * random.uniform(0.96, 1.08), 1)
            gross_fare = total_quoted_fare
            comm_pct = 20.0
            payout = round(gross_fare * (1 - (comm_pct / 100)), 2)
            rating = round(random.choices([5.0, 4.0, 3.0, 2.0, 1.0], weights=[72, 18, 5, 3, 2])[0], 1)
            tips = round(random.choice([0, 0, 0, 0, 10, 20, 30, 50]), 2)
            
            # Intentional Discrepancy Injection (0.2% of rows to test Data Quality Auditor)
            if discrepancy_count < 6 and random.random() < 0.003:
                discrepancy_count += 1
                if discrepancy_count == 1:
                    # Negative wait time
                    wait_mins = -5.0
                elif discrepancy_count == 2:
                    # Extreme GPS anomaly (1200 km)
                    actual_dist = 1250.0
                elif discrepancy_count == 3:
                    # Negative driver payout
                    payout = -150.0
                elif discrepancy_count == 4:
                    # Missing driver_id (orphaned key)
                    did = ""
                elif discrepancy_count == 5:
                    # Zero duration for long distance
                    trip_duration = 0.0
                    
            fulfillment_rows.append([
                fid, bid, did, dvid, 
                driver_assigned_at.strftime("%Y-%m-%d %H:%M:%S"),
                arrived_at_pickup.strftime("%Y-%m-%d %H:%M:%S"),
                trip_started_at.strftime("%Y-%m-%d %H:%M:%S"),
                trip_ended_at.strftime("%Y-%m-%d %H:%M:%S"),
                wait_mins, trip_duration, actual_dist, 
                gross_fare, comm_pct, payout, rating, tips
            ])
            
        else: # Cancelled or Timeout
            cid_log = f"CAN_{i:06d}"
            if status == "Driver_Cancelled":
                cancelled_by = "Driver"
                reason = random.choice(cancellation_reasons_driver)
                stage = random.choice(["Driver_En_Route", "Driver_En_Route", "Driver_Arrived"])
                fee = 0.0
            elif status == "Rider_Cancelled":
                cancelled_by = "Rider"
                reason = random.choice(cancellation_reasons_rider)
                stage = random.choice(["Before_Assignment", "Driver_En_Route", "Driver_Arrived"])
                fee = 50.0 if stage == "Driver_Arrived" else 0.0
            else: # ETA_Timeout
                cancelled_by = "System"
                reason = "Driver_Assignment_Timeout_Exceeded"
                stage = "Before_Assignment"
                fee = 0.0
                
            dispute = "Y" if (fee > 0 and random.random() < 0.35) else "N"
            cancellation_rows.append([
                cid_log, bid, did if status != "ETA_Timeout" else "UNASSIGNED", 
                cancelled_by, stage, reason, fee, dispute
            ])
            
    # Write ride_requests.csv
    with open(requests_file, "w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerow([
            "booking_id", "customer_id", "pickup_zone_id", "drop_zone_id", "vehicle_category", 
            "request_timestamp", "estimated_distance_km", "base_fare_inr", "surge_multiplier", 
            "total_quoted_fare_inr", "booking_status"
        ])
        writer.writerows(booking_rows)
        
    # Write trip_fulfillment_logs.csv
    with open(fulfillment_file, "w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerow([
            "fulfillment_id", "booking_id", "driver_id", "vehicle_id", 
            "driver_assigned_at", "arrived_at_pickup_at", "trip_started_at", "trip_ended_at", 
            "pickup_wait_mins", "trip_duration_mins", "actual_distance_km", 
            "gross_fare_inr", "platform_commission_pct", "driver_payout_inr", "rider_rating", "toll_or_tips_inr"
        ])
        writer.writerows(fulfillment_rows)
        
    # Write cancellation_discrepancy_logs.csv
    with open(cancellation_file, "w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerow([
            "cancellation_id", "booking_id", "driver_id", "cancelled_by", 
            "cancellation_stage", "cancellation_reason", "cancellation_fee_charged_inr", "dispute_flag"
        ])
        writer.writerows(cancellation_rows)
        
    print(f"Generated {len(booking_rows)} bookings, {len(fulfillment_rows)} fulfillments, {len(cancellation_rows)} cancellations.")
    print(f"Injected {discrepancy_count} synthetic discrepancies for data quality validation.")

if __name__ == "__main__":
    print("--- Starting UrbanPulse Synthetic Operational Data Generator ---")
    generate_zones()
    vehicles = generate_vehicles(320)
    drivers = generate_drivers(vehicles)
    generate_operations(drivers, 6800)
    print("--- Data Generation Complete Successfully ---")
