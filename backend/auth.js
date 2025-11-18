// backend/auth.js
// Authentication helper functions for server-side operations
// NOTE: For traditional sign-in with email/password, clients should use Firebase Client SDK.
// This server provides signup (create user + Firestore user doc) and login via REST (signInWithPassword).

const { auth, db } = require('./config');
const fetch = global.fetch || require('node-fetch');

// Your Firebase Web API Key from Firebase Console
const FIREBASE_API_KEY = process.env.FIREBASE_API_KEY ;

/**
 * Create a new user (admin SDK) and add a Firestore user document
 * @param {{email:string, password:string, name?:string, role?:string}}
 * @returns {Promise<Object>} standardized JSON response
 */
async function signup({ email, password, name = '', role = 'user' }) {
  try {
    // Create auth user
    const userRecord = await auth.createUser({
      email,
      password,
      displayName: name || undefined,
    });

    // Add user doc to Firestore
    const userDoc = {
      uid: userRecord.uid,
      email: userRecord.email,
      name: name || userRecord.displayName || '',
      role: role || 'user',
      createdAt: new Date().toISOString(),
    };

    await db.collection('users').doc(userRecord.uid).set(userDoc);

    return { success: true, message: 'User created', userId: userRecord.uid };
  } catch (err) {
    return { success: false, message: err.message || err };
  }
}

/**
 * Login using Firebase Auth REST API (email/password) - returns idToken on success
 * Note: This is a server-side convenience; clients normally sign in directly.
 */
async function login({ email, password }) {
  if (!FIREBASE_API_KEY) return { success: false, message: 'FIREBASE_API_KEY not set in env' };

  try {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, returnSecureToken: true }),
    });

    const data = await res.json();
    if (data && data.error) {
      return { success: false, message: data.error.message, error: data.error };
    }

    // data contains idToken, refreshToken, expiresIn, localId
    return { success: true, message: 'Login successful', data };
  } catch (err) {
    return { success: false, message: err.message || err };
  }
}

/**
 * Get user by uid
 */
async function getUserById(uid) {
  try {
    const doc = await db.collection('users').doc(uid).get();
    if (!doc.exists) return { success: false, message: 'User not found' };
    return { success: true, user: { id: doc.id, ...doc.data() } };
  } catch (err) {
    return { success: false, message: err.message || err };
  }
}

module.exports = { signup, login, getUserById };
