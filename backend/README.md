# Backend (Firebase) for FlexiRide

**Project ID:** `flexiride-4e206`  
**Storage Bucket:** `flexiride-4e206.firebasestorage.app`

This folder contains server-side helper modules to interact with Firebase (Authentication, Firestore, Storage) using the Firebase Admin SDK.

Files:
- `config.js` - Initializes Firebase Admin SDK (requires service account)
- `helpers.js` - Helper functions: `calculatePrice`, `checkAvailability`, `uploadImageToFirebaseStorage`
- `auth.js` - Signup (create user + Firestore user doc) and login helper (uses Identity Toolkit REST API)
- `vehicles.js` - Admin vehicle CRUD (image upload, delete)
- `bookings.js` - Booking logic (prevent double booking, create bookings, update status)

## 🚀 Quick Setup

### 1. Install Dependencies

```bash
cd backend
npm install
```

Dependencies installed:
- `firebase-admin` - Firebase Admin SDK for server-side operations
- `node-fetch` - For REST API calls (built-in on Node 18+)

### 2. Get Service Account Key

**Important:** You need a service account key to use Firebase Admin SDK.

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **flexiride-4e206**
3. Go to **Project Settings** (⚙️ icon) → **Service accounts** tab
4. Click **"Generate new private key"**
5. Save the downloaded JSON file as `backend/serviceAccountKey.json`

**⚠️ NEVER commit `serviceAccountKey.json` to git!** (Already in `.gitignore`)

### 3. Environment Variables (Optional)

Create `.env` file in `backend/` folder:

```bash
GOOGLE_APPLICATION_CREDENTIALS=./serviceAccountKey.json
FIREBASE_API_KEY=AIzaSyAQHfpgv5E7QFacGZI3_cIkcfp1PB7SM5c
FIREBASE_STORAGE_BUCKET=flexiride-4e206.firebasestorage.app
```

Or set via PowerShell:

```powershell
$env:GOOGLE_APPLICATION_CREDENTIALS = "C:\path\to\backend\serviceAccountKey.json"
$env:FIREBASE_API_KEY = "AIzaSyAQHfpgv5E7QFacGZI3_cIkcfp1PB7SM5c"
```

## Usage examples

Add vehicle (server-side example):

```js
const { addVehicle } = require('./backend/vehicles');

// Add vehicle using a local image path
addVehicle({ name: 'Honda City', type: 'car', pricePerDay: 2500 }, 'path/to/image.jpg')
  .then(console.log)
  .catch(console.error);
```

Create booking:

```js
const { createBooking } = require('./backend/bookings');

createBooking({ userId: 'uid', vehicleId: 'vehicleId', pickupDate: '2025-11-20', returnDate: '2025-11-22' })
  .then(console.log)
  .catch(console.error);
```

Signup user (server-side admin create):

```js
const { signup } = require('./backend/auth');

signup({ email: 'user@test.com', password: 'password123', name: 'John' })
  .then(console.log)
  .catch(console.error);
```

## Notes & Security
- This backend code uses the Admin SDK and must run in a trusted server environment (not in the mobile client).
- For client authentication (login), it's recommended to use the Firebase Client SDK inside the app; the `login` helper uses Identity Toolkit REST API as a convenience.
- Always protect your service account key. Do NOT commit it to source control.

