/**
 * BACKEND FIREBASE CONFIGURATION (Admin SDK)
 * ===========================================
 * 
 * PURPOSE: This file initializes Firebase Admin SDK for SERVER-SIDE operations.
 * 
 * ┌─────────────────────────────────────────────────────────────────────────────┐
 * │                    WHY DO WE HAVE TWO CONFIG FILES?                        │
 * ├─────────────────────────────────────────────────────────────────────────────┤
 * │                                                                             │
 * │   firebase/config.ts (Client SDK)      vs      backend/config.js (Admin SDK)│
 * │   ─────────────────────────────────           ─────────────────────────────│
 * │   • Runs on USER'S PHONE/BROWSER              • Runs on YOUR SERVER        │
 * │   • Limited permissions                       • FULL ACCESS to all data    │
 * │   • Uses API key (public)                     • Uses Service Account (secret)│
 * │   • For: Login, view vehicles, book           • For: Admin operations, bulk │
 * │   • Security Rules apply                      • Bypasses Security Rules     │
 * │                                                                             │
 * └─────────────────────────────────────────────────────────────────────────────┘
 * 
 * WHEN TO USE ADMIN SDK:
 * - Creating admin accounts
 * - Bulk data operations
 * - Scheduled tasks (cron jobs)
 * - Operations that need to bypass security rules
 * - Server-to-server communication
 * 
 * SECURITY NOTE:
 * - serviceAccountKey.json gives FULL ACCESS to your Firebase project
 * - NEVER commit it to git (it's in .gitignore)
 * - NEVER share it publicly
 * - Store it securely on your server
 */

const admin = require('firebase-admin');
const path = require('path');

// Your Firebase project configuration
const FIREBASE_PROJECT_ID = 'flexiride-4e206';
const FIREBASE_STORAGE_BUCKET = 'flexiride-4e206.firebasestorage.app';

// Service Account: The "master key" for Firebase Admin SDK
// Download from: Firebase Console → Project Settings → Service Accounts → Generate new private key
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

// Allow overriding via env vars (for production deployment)
const storageBucket = process.env.FIREBASE_STORAGE_BUCKET || FIREBASE_STORAGE_BUCKET;

// Initialize Firebase Admin SDK (only once)
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

// Export Firebase Admin services for use in other backend files
const db = admin.firestore();    // Firestore database (full access)
const auth = admin.auth();       // Authentication (can create/delete any user)
const bucket = admin.storage().bucket(); // Cloud Storage (can upload/delete any file)

module.exports = { admin, db, auth, bucket };
