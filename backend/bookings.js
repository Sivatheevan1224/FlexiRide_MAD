// backend/bookings.js
// Booking logic: create bookings, prevent double booking, fetch user/admin bookings, update status

const { db } = require('./config');
const { calculatePrice, checkAvailability } = require('./helpers');

/**
 * Create a booking after checking availability
 * @param {{userId:string, vehicleId:string, pickupDate:string (ISO), returnDate:string (ISO)}} bookingData
 */
async function createBooking(bookingData) {
  try {
    const { userId, vehicleId, pickupDate, returnDate } = bookingData;

    // Validate
    if (!userId || !vehicleId || !pickupDate || !returnDate) return { success: false, message: 'Missing required fields' };

    // Get vehicle pricePerDay
    const vehicleSnap = await db.collection('vehicles').doc(vehicleId).get();
    if (!vehicleSnap.exists) return { success: false, message: 'Vehicle not found' };
    const vehicle = vehicleSnap.data();
    const pricePerDay = vehicle.pricePerDay || 0;

    // Check availability
    const availability = await checkAvailability(vehicleId, pickupDate, returnDate);
    if (!availability.available) {
      return { success: false, message: 'Vehicle not available for the selected dates', conflicts: availability.conflicts };
    }

    const totalPrice = calculatePrice(pricePerDay, pickupDate, returnDate);

    const bookingDoc = {
      userId,
      vehicleId,
      pickupDate,
      returnDate,
      totalPrice,
      status: 'active',
      createdAt: new Date().toISOString(),
    };

    const docRef = await db.collection('bookings').add(bookingDoc);
    return { success: true, message: 'Booking created successfully', bookingId: docRef.id };
  } catch (err) {
    return { success: false, message: err.message || err };
  }
}

/**
 * Fetch bookings for a user
 */
async function getUserBookings(userId) {
  try {
    const q = db.collection('bookings').where('userId', '==', userId).orderBy('createdAt', 'desc');
    const snapshot = await q.get();
    const bookings = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return { success: true, bookings };
  } catch (err) {
    return { success: false, message: err.message || err };
  }
}

/**
 * Admin: get all bookings
 */
async function getAllBookings() {
  try {
    const snapshot = await db.collection('bookings').orderBy('createdAt', 'desc').get();
    const bookings = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return { success: true, bookings };
  } catch (err) {
    return { success: false, message: err.message || err };
  }
}

/**
 * Update booking status (e.g., completed, cancelled)
 */
async function updateBookingStatus(bookingId, status) {
  try {
    const ref = db.collection('bookings').doc(bookingId);
    const snap = await ref.get();
    if (!snap.exists) return { success: false, message: 'Booking not found' };

    await ref.update({ status, updatedAt: new Date().toISOString() });
    return { success: true, message: 'Booking status updated' };
  } catch (err) {
    return { success: false, message: err.message || err };
  }
}

module.exports = { createBooking, getUserBookings, getAllBookings, updateBookingStatus };
