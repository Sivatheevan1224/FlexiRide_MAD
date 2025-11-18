// backend/helpers.js
// Helper functions: calculatePrice, checkAvailability, uploadImageToFirebaseStorage

const { db, bucket } = require('./config');

/**
 * Calculate total price between two ISO date strings (inclusive days)
 * @param {number} pricePerDay
 * @param {string} pickupISO - ISO date string
 * @param {string} returnISO - ISO date string
 * @returns {number} totalPrice
 */
function calculatePrice(pricePerDay, pickupISO, returnISO) {
  const pickup = new Date(pickupISO);
  const ret = new Date(returnISO);
  // Ensure pickup <= return
  if (isNaN(pickup) || isNaN(ret) || ret < pickup) return 0;
  // Calculate inclusive days (at least 1)
  const msPerDay = 24 * 60 * 60 * 1000;
  const days = Math.max(1, Math.ceil((ret - pickup + 1) / msPerDay));
  return pricePerDay * days;
}

/**
 * Check vehicle availability for a date range
 * Prevent overlapping bookings with status 'active' or 'pending'
 * @param {string} vehicleId
 * @param {string} pickupISO
 * @param {string} returnISO
 * @returns {Promise<{available: boolean, conflicts: Array}>}
 */
async function checkAvailability(vehicleId, pickupISO, returnISO) {
  const pickup = new Date(pickupISO);
  const ret = new Date(returnISO);
  if (isNaN(pickup) || isNaN(ret) || ret < pickup) {
    return { available: false, conflicts: [], error: 'Invalid date range' };
  }

  try {
    const q = db.collection('bookings')
      .where('vehicleId', '==', vehicleId)
      .where('status', 'in', ['active', 'pending']);

    const snapshot = await q.get();
    const conflicts = [];

    snapshot.forEach(doc => {
      const data = doc.data();
      const existingPickup = new Date(data.pickupDate);
      const existingReturn = new Date(data.returnDate);
      // Check overlap: (A_start <= B_end) && (B_start <= A_end)
      if ((pickup <= existingReturn) && (existingPickup <= ret)) {
        conflicts.push({ bookingId: doc.id, ...data });
      }
    });

    return { available: conflicts.length === 0, conflicts };
  } catch (err) {
    return { available: false, conflicts: [], error: err.message || err };
  }
}

/**
 * Upload image to Firebase Storage
 * Accepts either a local file path (string) or a Buffer
 * Returns { success, url, path }
 */
async function uploadImageToFirebaseStorage(input, destinationPath) {
  try {
    const file = bucket.file(destinationPath);

    if (typeof input === 'string') {
      // Treat as local file path
      await bucket.upload(input, { destination: destinationPath });
    } else if (Buffer.isBuffer(input)) {
      await file.save(input, { resumable: false });
    } else if (input && input.path) {
      // If input is an object with path (like multer file)
      await bucket.upload(input.path, { destination: destinationPath });
    } else {
      throw new Error('Unsupported input type for uploadImageToFirebaseStorage');
    }

    // Make the file publicly readable (optional). Alternatively, use signed URLs.
    await file.makePublic();

    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${file.name}`;

    return { success: true, url: publicUrl, path: file.name };
  } catch (err) {
    return { success: false, error: err.message || err };
  }
}

module.exports = { calculatePrice, checkAvailability, uploadImageToFirebaseStorage };
