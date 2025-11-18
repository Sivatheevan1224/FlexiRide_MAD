// firebase/vehicles.ts
// Vehicle management functions using Firestore

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

export interface Vehicle {
  id?: string;
  name: string;
  type: 'car' | 'bike';
  pricePerDay: number;
  fuel: string;  // Display field, maps to fuelType in database
  gear: string;  // Display field, maps to transmission in database
  fuelType?: string;  // Actual database field
  transmission?: string;  // Actual database field
  availability?: boolean;  // true = available, false = rented
  description?: string;
  imageUrl: string;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Add a new vehicle (Admin only)
 */
export const addVehicle = async (vehicleData: Omit<Vehicle, 'id' | 'createdAt'>): Promise<{
  success: boolean;
  vehicleId?: string;
  error?: string;
}> => {
  try {
    const docRef = await addDoc(collection(db, 'vehicles'), {
      ...vehicleData,
      createdAt: new Date().toISOString(),
    });
    
    return { success: true, vehicleId: docRef.id };
  } catch (error: any) {
    console.error('Add vehicle error:', error);
    return { success: false, error: error.message || 'Failed to add vehicle' };
  }
};

/**
 * Get all vehicles
 */
export const getAllVehicles = async (): Promise<{
  success: boolean;
  vehicles?: Vehicle[];
  error?: string;
}> => {
  try {
    const q = query(collection(db, 'vehicles'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    const vehicles: Vehicle[] = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Vehicle));
    
    return { success: true, vehicles };
  } catch (error: any) {
    console.error('Get vehicles error:', error);
    return { success: false, error: error.message || 'Failed to get vehicles' };
  }
};

/**
 * Get vehicle by ID
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
      const vehicle: Vehicle = { 
        id: docSnap.id, 
        ...data,
        // Map database fields to display fields
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
 */
export const updateVehicle = async (id: string, vehicleData: Partial<Vehicle>): Promise<{
  success: boolean;
  error?: string;
}> => {
  try {
    const docRef = doc(db, 'vehicles', id);
    await updateDoc(docRef, {
      ...vehicleData,
      updatedAt: new Date().toISOString(),
    });
    
    return { success: true };
  } catch (error: any) {
    console.error('Update vehicle error:', error);
    return { success: false, error: error.message || 'Failed to update vehicle' };
  }
};

/**
 * Delete vehicle (Admin only)
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
