// backend/config.js
// Firebase Admin SDK initialization for server-side backend
// Project: flexiride-4e206

const admin = require('firebase-admin');
const path = require('path');

// Your Firebase project configuration
const FIREBASE_PROJECT_ID = 'flexiride-4e206';
const FIREBASE_STORAGE_BUCKET = 'flexiride-4e206.firebasestorage.app';

// Use service account specified by env var or fallback to local serviceAccountKey.json
const serviceAccountPath = process.env.GOOGLE_APPLICATION_CREDENTIALS || path.join(__dirname, 'serviceAccountKey.json');

let serviceAccount;
try {
  serviceAccount = require(serviceAccountPath);
  console.log('✅ Service account loaded successfully');
} catch (err) {
  console.warn('⚠️  Service account not found. Place serviceAccountKey.json in backend/ folder.');
  console.warn('   Download from: Firebase Console → Project Settings → Service Accounts → Generate new private key');
  serviceAccount = null;
}

// Allow overriding via env vars
const storageBucket = process.env.FIREBASE_STORAGE_BUCKET || FIREBASE_STORAGE_BUCKET;

if (admin.apps.length === 0) {
  try {
    if (serviceAccount) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        storageBucket,
      });
      console.log('✅ Firebase Admin SDK initialized with service account');
    } else if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
      // When running on GCP or with credentials provided via env var
      admin.initializeApp({
        storageBucket,
      });
      console.log('✅ Firebase Admin SDK initialized with env credentials');
    } else {
      // Last resort: initialize with default credentials (may fail locally)
      admin.initializeApp({
        projectId: FIREBASE_PROJECT_ID,
        storageBucket,
      });
      console.log('⚠️  Firebase Admin SDK initialized with default credentials (may fail)');
    }
  } catch (e) {
    console.error('❌ Failed to initialize Firebase Admin SDK:', e.message || e);
    throw e;
  }
}

const db = admin.firestore();
const auth = admin.auth();
const bucket = admin.storage().bucket();

module.exports = { admin, db, auth, bucket };
