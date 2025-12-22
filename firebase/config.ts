/**
 * FIREBASE CONFIGURATION FILE
 * ============================
 * 
 * PURPOSE: This file initializes Firebase services for the mobile app.
 * Firebase is our Backend-as-a-Service (BaaS) that provides:
 * 
 * SERVICES WE USE:
 * 
 * 1. FIREBASE AUTHENTICATION (auth)
 *    - User signup and login (email/password)
 *    - Session management (keeps users logged in)
 *    - Secure password handling
 * 
 * 2. CLOUD FIRESTORE (db)
 *    - NoSQL database for storing data
 *    - Collections: users, vehicles, bookings
 *    - Real-time data synchronization
 *    - Offline support (works without internet)
 * 
 * 3. FIREBASE STORAGE (storage)
 *    - File storage for images (vehicle photos, profile pictures)
 *    - CDN for fast image loading
 * 
 * HOW IT WORKS:

 * - firebaseConfig contains project credentials from environment variables
 
 * - initializeApp() creates the Firebase app instance
 * - getAuth/getFirestore/getStorage initialize specific services
 * - We export these services to use throughout the app
 * 
 * SECURITY NOTE:


 * - API keys are loaded from .env file (not committed to git)
 * - Copy .env.example to .env and fill in your values

 * - Security is enforced by Firebase Security Rules (in Firebase Console)
 * - Never include service account keys in client code
 */

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

/**
 * Firebase Configuration Object
 main
 * These values come from environment variables (.env file)
 * Project: flexiride-4e206
 * 
 * ⚠️ SECURITY: API keys are loaded from .env file (not committed to git)
 * Copy .env.example to .env and fill in your values
 */
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,              // API key for Firebase services
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,      // Auth popup/redirect domain
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,        // Unique project identifier
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET, // Cloud Storage bucket
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID, // Cloud Messaging sender ID
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,                // Web app identifier
  measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID, // Google Analytics ID
};

// Initialize the Firebase app with our configuration
const app = initializeApp(firebaseConfig);

/**
 * Initialize and export Firebase services
 * These are imported in other files like:
 * - firebase/auth.ts (for login/signup)
 * - firebase/vehicles.ts (for vehicle CRUD)
 * - firebase/bookings.ts (for booking operations)
 * 
 * Note: Session persistence is handled by AuthContext using AsyncStorage
 */
export const auth = getAuth(app);
export const db = getFirestore(app);    // Firestore database
export const storage = getStorage(app); // File storage

export default app;
