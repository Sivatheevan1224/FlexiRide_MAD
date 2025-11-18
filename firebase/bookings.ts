// firebase/bookings.ts
// Booking management functions using Firestore

import {
    addDoc,
    collection,
    doc,
    getDocs,
    orderBy,
    query,
    updateDoc,
    where
} from 'firebase/firestore';
import { db } from './config';

export interface Booking {
  id?: string;
  userId: string;
  vehicleId: string;
  vehicleName?: string;
  pickupDate: string;
  returnDate: string;
  totalPrice: number;
  status: 'pending' | 'active' | 'completed' | 'cancelled';
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Calculate total price
 */
export const calculatePrice = (pricePerDay: number, pickupDate: string, returnDate: string): number => {
  const pickup = new Date(pickupDate);
  const returnD = new Date(returnDate);
  
  if (isNaN(pickup.getTime()) || isNaN(returnD.getTime()) || returnD < pickup) {
    return 0;
  }
  
  const msPerDay = 24 * 60 * 60 * 1000;
  const days = Math.max(1, Math.ceil((returnD.getTime() - pickup.getTime() + msPerDay) / msPerDay));
  
  return pricePerDay * days;
};

/**
 * Check if vehicle is available for booking dates
 */
export const checkAvailability = async (
  vehicleId: string, 
  pickupDate: string, 
  returnDate: string
): Promise<{
  available: boolean;
  conflicts?: Booking[];
  error?: string;
}> => {
  try {
    const pickup = new Date(pickupDate);
    const returnD = new Date(returnDate);
    
    if (isNaN(pickup.getTime()) || isNaN(returnD.getTime()) || returnD < pickup) {
      return { available: false, error: 'Invalid date range' };
    }
    
    // Query bookings for this vehicle with active or pending status
    const q = query(
      collection(db, 'bookings'),
      where('vehicleId', '==', vehicleId),
      where('status', 'in', ['active', 'pending'])
    );
    
    const querySnapshot = await getDocs(q);
    const conflicts: Booking[] = [];
    
    querySnapshot.forEach(doc => {
      const booking = { id: doc.id, ...doc.data() } as Booking;
      const existingPickup = new Date(booking.pickupDate);
      const existingReturn = new Date(booking.returnDate);
      
      // Check for date overlap
      if ((pickup <= existingReturn) && (existingPickup <= returnD)) {
        conflicts.push(booking);
      }
    });
    
    return { available: conflicts.length === 0, conflicts };
  } catch (error: any) {
    console.error('Check availability error:', error);
    return { available: false, error: error.message || 'Failed to check availability' };
  }
};

/**
 * Create a new booking
 */
export const createBooking = async (bookingData: Omit<Booking, 'id' | 'createdAt' | 'status'>): Promise<{
  success: boolean;
  bookingId?: string;
  error?: string;
}> => {
  try {
    // Check availability first
    const availability = await checkAvailability(
      bookingData.vehicleId,
      bookingData.pickupDate,
      bookingData.returnDate
    );
    
    if (!availability.available) {
      return { 
        success: false, 
        error: 'Vehicle not available for selected dates' 
      };
    }
    
    const docRef = await addDoc(collection(db, 'bookings'), {
      ...bookingData,
      status: 'pending',
      createdAt: new Date().toISOString(),
    });
    
    return { success: true, bookingId: docRef.id };
  } catch (error: any) {
    console.error('Create booking error:', error);
    return { success: false, error: error.message || 'Failed to create booking' };
  }
};

/**
 * Get user bookings
 */
export const getUserBookings = async (userId: string): Promise<{
  success: boolean;
  bookings?: Booking[];
  error?: string;
}> => {
  try {
    const q = query(
      collection(db, 'bookings'),
      where('userId', '==', userId)
    );
    
    const querySnapshot = await getDocs(q);
    let bookings: Booking[] = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Booking));
    
    // Sort in JavaScript instead of Firestore to avoid index requirement
    bookings = bookings.sort((a, b) => {
      const dateA = new Date(a.createdAt || 0).getTime();
      const dateB = new Date(b.createdAt || 0).getTime();
      return dateB - dateA; // Newest first
    });
    
    return { success: true, bookings };
  } catch (error: any) {
    console.error('Get user bookings error:', error);
    return { success: false, error: error.message || 'Failed to get bookings' };
  }
};

/**
 * Get all bookings (Admin only)
 */
export const getAllBookings = async (): Promise<{
  success: boolean;
  bookings?: Booking[];
  error?: string;
}> => {
  try {
    const q = query(collection(db, 'bookings'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    const bookings: Booking[] = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Booking));
    
    return { success: true, bookings };
  } catch (error: any) {
    console.error('Get all bookings error:', error);
    return { success: false, error: error.message || 'Failed to get bookings' };
  }
};

/**
 * Update booking status
 */
export const updateBookingStatus = async (
  bookingId: string, 
  status: Booking['status']
): Promise<{
  success: boolean;
  error?: string;
}> => {
  try {
    const docRef = doc(db, 'bookings', bookingId);
    await updateDoc(docRef, {
      status,
      updatedAt: new Date().toISOString(),
    });
    
    return { success: true };
  } catch (error: any) {
    console.error('Update booking status error:', error);
    return { success: false, error: error.message || 'Failed to update booking' };
  }
};
