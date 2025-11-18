// backend/vehicles.js
// Vehicle management: add, edit, delete, fetch vehicles (admin operations)

const { db, bucket } = require('./config');
const { uploadImageToFirebaseStorage } = require('./helpers');

/**
 * Add a new vehicle with optional image
 * @param {{name:string, type:string, pricePerDay:number, fuel?:string, gear?:string, description?:string}} data
 * @param {string|Buffer|object} imageInput - local file path / Buffer / multer file object
 * @returns {Promise<Object>} standardized JSON response
 */
async function addVehicle(data, imageInput) {
  try {
    let imageUrl = '';
    let imagePath = '';

    if (imageInput) {
      const timestamp = Date.now();
      const ext = '.jpg';
      const safeName = (data.name || 'vehicle').toString().replace(/[^a-z0-9\-]/gi, '_').toLowerCase();
      const dest = `vehicles/${safeName}_${timestamp}${ext}`;
      const uploadResult = await uploadImageToFirebaseStorage(imageInput, dest);
      if (!uploadResult.success) {
        return { success: false, message: 'Image upload failed', error: uploadResult.error };
      }
      imageUrl = uploadResult.url;
      imagePath = uploadResult.path;
    }

    const vehicleDoc = {
      name: data.name || '',
      type: data.type || 'car',
      pricePerDay: data.pricePerDay || 0,
      fuel: data.fuel || '',
      gear: data.gear || '',
      description: data.description || '',
      imageUrl,
      imagePath,
      createdAt: new Date().toISOString(),
    };

    const docRef = await db.collection('vehicles').add(vehicleDoc);
    return { success: true, message: 'Vehicle added successfully', vehicleId: docRef.id };
  } catch (err) {
    return { success: false, message: err.message || err };
  }
}

/**
 * Edit vehicle
 */
async function editVehicle(vehicleId, updates, newImageInput) {
  try {
    const ref = db.collection('vehicles').doc(vehicleId);
    const snap = await ref.get();
    if (!snap.exists) return { success: false, message: 'Vehicle not found' };

    const data = snap.data();

    // If new image provided, upload and delete old image
    if (newImageInput) {
      const timestamp = Date.now();
      const ext = '.jpg';
      const safeName = (updates.name || data.name || 'vehicle').toString().replace(/[^a-z0-9\-]/gi, '_').toLowerCase();
      const dest = `vehicles/${safeName}_${timestamp}${ext}`;
      const uploadResult = await uploadImageToFirebaseStorage(newImageInput, dest);
      if (!uploadResult.success) return { success: false, message: 'Image upload failed', error: uploadResult.error };

      // Delete old image if exists
      if (data.imagePath) {
        try { await bucket.file(data.imagePath).delete(); } catch (e) { /* ignore */ }
      }

      updates.imageUrl = uploadResult.url;
      updates.imagePath = uploadResult.path;
    }

    updates.updatedAt = new Date().toISOString();
    await ref.update(updates);
    return { success: true, message: 'Vehicle updated successfully' };
  } catch (err) {
    return { success: false, message: err.message || err };
  }
}

/**
 * Delete vehicle
 */
async function deleteVehicle(vehicleId) {
  try {
    const ref = db.collection('vehicles').doc(vehicleId);
    const snap = await ref.get();
    if (!snap.exists) return { success: false, message: 'Vehicle not found' };
    const data = snap.data();

    // Delete storage file if present
    if (data.imagePath) {
      try { await bucket.file(data.imagePath).delete(); } catch (e) { /* ignore */ }
    }

    await ref.delete();
    return { success: true, message: 'Vehicle deleted successfully' };
  } catch (err) {
    return { success: false, message: err.message || err };
  }
}

/**
 * Fetch all vehicles
 */
async function fetchAllVehicles() {
  try {
    const snapshot = await db.collection('vehicles').orderBy('createdAt', 'desc').get();
    const vehicles = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return { success: true, vehicles };
  } catch (err) {
    return { success: false, message: err.message || err };
  }
}

module.exports = { addVehicle, editVehicle, deleteVehicle, fetchAllVehicles };
