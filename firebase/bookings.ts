/**
 * BOOKING MANAGEMENT (Client SDK)
 * =================================
 * 
 * PURPOSE: Handle all booking-related operations for the mobile app.
 * This includes creating bookings, checking availability, and managing booking status.
 * 
 * ┌─────────────────────────────────────────────────────────────────────────────┐
 * │                           BOOKING FLOW                                     │
 * ├─────────────────────────────────────────────────────────────────────────────┤
 * │                                                                             │
 * │   USER CREATES BOOKING:                                                     │
 * │   1. User selects vehicle and dates                                        │
 * │   2. checkAvailability() verifies no conflicts                             │
 * │   3. calculatePrice() computes total cost                                  │
 * │   4. createBooking() saves to Firestore with status: 'pending'             │
 * │   5. User sees booking confirmation                                        │
 * │                                                                             │
 * │   ADMIN MANAGES BOOKING:                                                   │
 * │   1. Admin views all bookings in admin panel                               │
 * │   2. Admin approves → status: 'active', vehicle.availability: false        │
 * │   3. When rental ends → status: 'completed', vehicle.availability: true    │
 * │   4. Or admin/user cancels → status: 'cancelled'                           │
 * │                                                                             │
 * └─────────────────────────────────────────────────────────────────────────────┘
 * 
 * ┌─────────────────────────────────────────────────────────────────────────────┐
 * │                        BOOKING STATUS FLOW                                 │
 * ├─────────────────────────────────────────────────────────────────────────────┤
 * │                                                                             │
 * │   pending ──────┬─────────> active ────────────> completed                  │
 * │                 │              │                                            │
 * │                 └──────────────┴──────────────> cancelled                   │
 * │                                                                             │
 * │   pending:   User created booking, waiting for admin approval              │
 * │   active:    Admin approved, vehicle is currently rented                   │
 * │   completed: Rental period ended, vehicle returned                         │
 * │   cancelled: Booking was cancelled by user or admin                        │
 * │                                                                             │
 * └─────────────────────────────────────────────────────────────────────────────┘
 */

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

/**
 * Booking Interface
 * Defines the structure of a booking document in Firestore
 */
export interface Booking {
  id?: string;                    // Firestore document ID
  userId: string;                 // User who made the booking
  vehicleId: string;              // Vehicle being booked
  vehicleName?: string;           // Vehicle name (for display)
  pickupDate: string;             // Start date (ISO string)
  returnDate: string;             // End date (ISO string)
  totalPrice: number;             // Total cost in rupees
  status: 'pending' | 'active' | 'completed' | 'cancelled';  // Current status
  createdAt?: string;             // When booking was created
  updatedAt?: string;             // When booking was last updated
}

/**
 * Calculate total price for a rental
 * 
 * Formula: pricePerDay × numberOfDays
 * Minimum 1 day (same-day pickup and return counts as 1 day)
 * 
 * @param pricePerDay - Vehicle's daily rental rate
 * @param pickupDate - Rental start date (ISO string)
 * @param returnDate - Rental end date (ISO string)
 * @returns Total price in rupees
 */
export const calculatePrice = (pricePerDay: number, pickupDate: string, returnDate: string): number => {
  const pickup = new Date(pickupDate);
  const returnD = new Date(returnDate);
  
  // Validate dates
  if (isNaN(pickup.getTime()) || isNaN(returnD.getTime()) || returnD < pickup) {
    return 0;
  }
  
  // Calculate number of days (minimum 1 day)
  const msPerDay = 24 * 60 * 60 * 1000;
  const days = Math.max(1, Math.ceil((returnD.getTime() - pickup.getTime() + msPerDay) / msPerDay));
  
  return pricePerDay * days;
};

/**
 * Check if vehicle is available for booking dates
 * 
 * Prevents double-booking by checking for overlapping reservations
 * Only considers 'active' and 'pending' bookings (not completed/cancelled)
 * 
 * @param vehicleId - Vehicle to check
 * @param pickupDate - Desired start date
 * @param returnDate - Desired end date
 * @returns Whether vehicle is available, and any conflicting bookings
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
    
    // Validate date range
    if (isNaN(pickup.getTime()) || isNaN(returnD.getTime()) || returnD < pickup) {
      return { available: false, error: 'Invalid date range' };
    }
    
    // Query existing bookings for this vehicle that are active or pending
    const q = query(
      collection(db, 'bookings'),
      where('vehicleId', '==', vehicleId),
      where('status', 'in', ['active', 'pending'])  // Only check non-finished bookings
    );
    
    const querySnapshot = await getDocs(q);
    const conflicts: Booking[] = [];
    
    // Check each existing booking for date overlap
    querySnapshot.forEach(doc => {
      const booking = { id: doc.id, ...doc.data() } as Booking;
      const existingPickup = new Date(booking.pickupDate);
      const existingReturn = new Date(booking.returnDate);
      
      // Date overlap formula: (StartA <= EndB) && (StartB <= EndA)
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
 * 
 * Called when user confirms a booking on the booking screen
 * 1. First checks if vehicle is available for the dates
 * 2. If available, creates booking with 'pending' status
 * 3. User is redirected to success page
 * 
 * @param bookingData - Booking details (user, vehicle, dates, price)
 * @returns Success status and new booking ID
 */
export const createBooking = async (bookingData: Omit<Booking, 'id' | 'createdAt' | 'status'>): Promise<{
  success: boolean;
  bookingId?: string;
  error?: string;
}> => {
  try {
    // Step 1: Verify vehicle is available for requested dates
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
    
    // Step 2: Create the booking document
    const docRef = await addDoc(collection(db, 'bookings'), {
      ...bookingData,
      status: 'pending',  // New bookings start as pending
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
 * 
 * Fetches all bookings for a specific user
 * Used on "My Bookings" screen to show booking history
 * 
 * @param userId - The user's Firebase Auth UID
 * @returns Array of user's bookings, sorted by date (newest first)
 */
export const getUserBookings = async (userId: string): Promise<{
  success: boolean;
  bookings?: Booking[];
  error?: string;
}> => {
  try {
    // Query bookings where userId matches
    const q = query(
      collection(db, 'bookings'),
      where('userId', '==', userId)
    );
    
    const querySnapshot = await getDocs(q);
    let bookings: Booking[] = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Booking));
    
    // Sort in JavaScript instead of Firestore to avoid composite index requirement
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
 * 
 * Fetches all bookings in the system
 * Used in admin panel to view and manage all reservations
 * 
 * @returns Array of all bookings, sorted by date (newest first)
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
 * 
 * Used by admin to approve, complete, or cancel bookings
 * Status changes:
 * - pending → active: Admin approves booking
 * - active → completed: Rental period ended
 * - any → cancelled: Booking cancelled
 * 
 * Note: When updating to 'active' or 'cancelled', also update vehicle availability
 * 
 * @param bookingId - Booking document ID
 * @param status - New status to set
 * @returns Success status
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
