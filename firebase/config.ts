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
 * - firebaseConfig contains project credentials from Firebase Console
 * - initializeApp() creates the Firebase app instance
 * - getAuth/getFirestore/getStorage initialize specific services
 * - We export these services to use throughout the app
 * 
 * SECURITY NOTE:
 * - These config values are safe to include in client code
 * - Security is enforced by Firebase Security Rules (in Firebase Console)
 * - Never include service account keys in client code
 */

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

/**
 * Firebase Configuration Object
 * These values come from: Firebase Console → Project Settings → Your apps → Web app
 * Project: flexiride-4e206
 */
const firebaseConfig = {
  apiKey: "AIzaSyAQHfpgv5E7QFacGZI3_cIkcfp1PB7SM5c",  // API key for Firebase services
  authDomain: "flexiride-4e206.firebaseapp.com",       // Auth popup/redirect domain
  projectId: "flexiride-4e206",                        // Unique project identifier
  storageBucket: "flexiride-4e206.firebasestorage.app", // Cloud Storage bucket
  messagingSenderId: "703281396640",                   // Cloud Messaging sender ID
  appId: "1:703281396640:web:ba10d02242a1ae71e7c2c5",  // Web app identifier
  measurementId: "G-2KXW2HDK1X"                        // Google Analytics ID
};

// Initialize the Firebase app with our configuration
const app = initializeApp(firebaseConfig);

/**
 * Initialize and export Firebase services
 * These are imported in other files like:
 * - firebase/auth.ts (for login/signup)
 * - firebase/vehicles.ts (for vehicle CRUD)
 * - firebase/bookings.ts (for booking operations)
 */
export const auth = getAuth(app);       // Authentication service
export const db = getFirestore(app);    // Firestore database
export const storage = getStorage(app); // File storage

export default app;
