/**
 * VEHICLE MANAGEMENT (Client SDK)
 * =================================
 * 
 * PURPOSE: Handle all vehicle-related operations for the mobile app.
 * This includes listing vehicles, adding new ones, editing, and deleting.
 * 
 * ┌─────────────────────────────────────────────────────────────────────────────┐
 * │                         VEHICLE DATA STRUCTURE                             │
 * ├─────────────────────────────────────────────────────────────────────────────┤
 * │                                                                             │
 * │   Firestore Collection: 'vehicles'                                         │
 * │                                                                             │
 * │   Each document contains:                                                   │
 * │   {                                                                         │
 * │     name: "Toyota Corolla",           // Vehicle name                       │
 * │     type: "car" | "bike",             // Vehicle type                       │
 * │     pricePerDay: 1500,                // Price in rupees                    │
 * │     fuelType: "Petrol",               // Fuel type                          │
 * │     transmission: "Automatic",        // Manual or Automatic                │
 * │     seats: 5,                         // Number of seats                    │
 * │     availability: true,               // true = available, false = rented  │
 * │     imageUrl: "https://...",          // Vehicle image URL                  │
 * │     description: "Comfortable...",    // Optional description               │
 * │     createdAt: "2024-01-15T..."       // When vehicle was added            │
 * │   }                                                                         │
 * │                                                                             │
 * └─────────────────────────────────────────────────────────────────────────────┘
 * 
 * FIELD MAPPING NOTE:
 * - Database uses: fuelType, transmission (proper names)
 * - Some code uses: fuel, gear (shorter display names)
 * - getVehicleById() maps between these for compatibility
 * 
 * AVAILABILITY TRACKING:
 * - When admin approves a booking → vehicle.availability = false
 * - When booking completes/cancels → vehicle.availability = true
 */

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from 'firebase/firestore';
import { db } from './config';

/**
 * Vehicle Interface
 * Defines the structure of a vehicle document in Firestore
 */
export interface Vehicle {
  id?: string;              // Firestore document ID (auto-generated)
  name: string;             // Vehicle name (e.g., "Honda City")
  type: 'car' | 'bike';     // Vehicle category
  pricePerDay: number;      // Rental price per day in rupees
  fuel: string;             // Display field, maps to fuelType in database
  gear: string;             // Display field, maps to transmission in database
  fuelType?: string;        // Actual database field for fuel type
  transmission?: string;    // Actual database field for gear type
  seats?: number;           // Number of seats (cars: 4-7, bikes: 2)
  availability?: boolean;   // true = available for booking, false = currently rented
  description?: string;     // Optional vehicle description
  imageUrl: string;         // URL to vehicle image
  createdAt?: string;       // ISO timestamp when vehicle was added
  updatedAt?: string;       // ISO timestamp when vehicle was last updated
}

/**
 * Add a new vehicle (Admin only)
 * 
 * Called when admin fills out the "Add Vehicle" form
 * addDoc auto-generates a unique document ID
 * 
 * @param vehicleData - Vehicle data without id and createdAt
 * @returns Success status and new vehicle ID
 */
export const addVehicle = async (vehicleData: Omit<Vehicle, 'id' | 'createdAt'>): Promise<{
  success: boolean;
  vehicleId?: string;
  error?: string;
}> => {
  try {
    // addDoc creates a new document with auto-generated ID
    const docRef = await addDoc(collection(db, 'vehicles'), {
      ...vehicleData,
      createdAt: new Date().toISOString(), // Add timestamp
    });
    
    return { success: true, vehicleId: docRef.id };
  } catch (error: any) {
    console.error('Add vehicle error:', error);
    return { success: false, error: error.message || 'Failed to add vehicle' };
  }
};

/**
 * Get all vehicles
 * 
 * Used on home screen to display available vehicles
 * Orders by createdAt descending (newest first)
 * 
 * @returns Array of all vehicles
 */
export const getAllVehicles = async (): Promise<{
  success: boolean;
  vehicles?: Vehicle[];
  error?: string;
}> => {
  try {
    // Query all vehicles, ordered by creation date (newest first)
    const q = query(collection(db, 'vehicles'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    // Map Firestore documents to Vehicle objects
    const vehicles: Vehicle[] = querySnapshot.docs.map(doc => ({
      id: doc.id,        // Include the document ID
      ...doc.data()      // Spread all document fields
    } as Vehicle));
    
    return { success: true, vehicles };
  } catch (error: any) {
    console.error('Get vehicles error:', error);
    return { success: false, error: error.message || 'Failed to get vehicles' };
  }
};

/**
 * Get vehicle by ID
 * 
 * Used when user taps on a vehicle to view details
 * Also handles field mapping (fuelType → fuel, transmission → gear)
 * 
 * @param id - Firestore document ID of the vehicle
 * @returns Vehicle data if found
 */
export const getVehicleById = async (id: string): Promise<{
  success: boolean;
  vehicle?: Vehicle;
  error?: string;
}> => {
  try {
    const docRef = doc(db, 'vehicles', id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data() as any;
      
      // Map database fields to display fields for compatibility
      const vehicle: Vehicle = { 
        id: docSnap.id, 
        ...data,
        // Handle field name mapping (database might use either name)
        fuel: data.fuelType || data.fuel || 'Petrol',
        gear: data.transmission || data.gear || 'Manual',
      } as Vehicle;
      
      return { success: true, vehicle };
    } else {
      return { success: false, error: 'Vehicle not found' };
    }
  } catch (error: any) {
    console.error('Get vehicle error:', error);
    return { success: false, error: error.message || 'Failed to get vehicle' };
  }
};

/**
 * Update vehicle (Admin only)
 * 
 * Used when admin edits vehicle details
 * Only updates the fields provided (partial update)
 * 
 * @param id - Vehicle document ID
 * @param vehicleData - Fields to update
 * @returns Success status
 */
export const updateVehicle = async (id: string, vehicleData: Partial<Vehicle>): Promise<{
  success: boolean;
  error?: string;
}> => {
  try {
    const docRef = doc(db, 'vehicles', id);
    
    // updateDoc only modifies specified fields, keeps others unchanged
    await updateDoc(docRef, {
      ...vehicleData,
      updatedAt: new Date().toISOString(), // Track when updated
    });
    
    return { success: true };
  } catch (error: any) {
    console.error('Update vehicle error:', error);
    return { success: false, error: error.message || 'Failed to update vehicle' };
  }
};

/**
 * Delete vehicle (Admin only)
 * 
 * Permanently removes vehicle from database
 * Note: This doesn't delete the vehicle image from Storage
 * 
 * @param id - Vehicle document ID to delete
 * @returns Success status
 */
export const deleteVehicle = async (id: string): Promise<{
  success: boolean;
  error?: string;
}> => {
  try {
    await deleteDoc(doc(db, 'vehicles', id));
    return { success: true };
  } catch (error: any) {
    console.error('Delete vehicle error:', error);
    return { success: false, error: error.message || 'Failed to delete vehicle' };
  }
};
