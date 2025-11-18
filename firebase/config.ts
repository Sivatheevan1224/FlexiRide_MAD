// firebase/config.ts
// Firebase Client SDK Configuration (for mobile app)
// Project: flexiride-4e206

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQHfpgv5E7QFacGZI3_cIkcfp1PB7SM5c",
  authDomain: "flexiride-4e206.firebaseapp.com",
  projectId: "flexiride-4e206",
  storageBucket: "flexiride-4e206.firebasestorage.app",
  messagingSenderId: "703281396640",
  appId: "1:703281396640:web:ba10d02242a1ae71e7c2c5",
  measurementId: "G-2KXW2HDK1X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
