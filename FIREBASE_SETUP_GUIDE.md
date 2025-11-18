# Firebase Setup Guide for FlexiRide

This guide will help you set up Firebase for the FlexiRide vehicle rental application.

## Prerequisites

- Node.js installed (v16 or higher)
- npm or yarn package manager
- A Google account for Firebase Console

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add Project"
3. Enter project name: `flexiride` (or your preferred name)
4. Disable Google Analytics (optional)
5. Click "Create Project"

## Step 2: Enable Firestore Database

1. In Firebase Console, go to **Build → Firestore Database**
2. Click "Create database"
3. Choose **Production mode** or **Test mode**
   - For development, use **Test mode** (expires after 30 days)
   - For production, use **Production mode** with security rules
4. Select database location (e.g., `nam5` for United States)
5. Click "Enable"

### Firestore Security Rules (Production)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection - users can only read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Vehicles collection - anyone can read, only admins can write
    match /vehicles/{vehicleId} {
      allow read: if true;
      allow write: if request.auth != null && 
                     get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Bookings collection - users can read/write their own bookings, admins can read/write all
    match /bookings/{bookingId} {
      allow read: if request.auth != null && 
                    (resource.data.userId == request.auth.uid || 
                     get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin');
      allow create: if request.auth != null && request.resource.data.userId == request.auth.uid;
      allow update, delete: if request.auth != null && 
                              get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
  }
}
```

## Step 3: Enable Authentication

1. Go to **Build → Authentication**
2. Click "Get started"
3. Enable **Email/Password** sign-in method
4. Click "Save"

## Step 4: Enable Firebase Storage

1. Go to **Build → Storage**
2. Click "Get started"
3. Choose **Production mode** or **Test mode**
4. Select storage location (same as Firestore)
5. Click "Done"

### Storage Security Rules (Production)

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Vehicle images - anyone can read, only admins can write
    match /vehicles/{imageId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## Step 5: Get Firebase Configuration

### For Frontend (Web/Mobile App)

1. In Firebase Console, click the **Web icon** (</>) to add a web app
2. Register app name: `FlexiRide`
3. Copy the configuration object:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

4. Update `firebase/config.ts` with your configuration

### For Backend (Admin SDK)

1. Go to **Project Settings** (gear icon) → **Service accounts**
2. Click "Generate new private key"
3. Save the JSON file as `serviceAccountKey.json`
4. Place it in the `backend/` folder
5. **IMPORTANT**: Add to `.gitignore` to keep it secure

## Step 6: Configure Frontend

1. Update `firebase/config.ts`:

```typescript
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
```

## Step 7: Configure Backend

1. Place `serviceAccountKey.json` in `backend/` folder
2. Install Firebase Admin SDK:

```bash
cd backend
npm install firebase-admin
```

3. Update `backend/config.js`:

```javascript
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'your-project-id.appspot.com'
});

const db = admin.firestore();
const bucket = admin.storage().bucket();

module.exports = { db, bucket, admin };
```

## Step 8: Create Initial Data

### Create Admin User

1. Go to **Authentication** in Firebase Console
2. Click "Add user"
3. Email: `admin@flexiride.com`
4. Password: Create a strong password
5. Add user to Firestore `users` collection:

```json
{
  "email": "admin@flexiride.com",
  "role": "admin",
  "displayName": "Admin User",
  "createdAt": "2025-11-19T00:00:00.000Z"
}
```

### Add Sample Vehicles

Run the backend script:

```bash
cd backend
node add-more-vehicles.js
```

This will create 13 sample vehicles (7 cars, 6 bikes) in your database.

## Step 9: Environment Variables (Optional)

For better security, use environment variables:

1. Create `.env` file in root directory:

```env
FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_auth_domain
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_storage_bucket
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id
```

2. Update `firebase/config.ts` to use environment variables:

```typescript
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};
```

## Database Collections Structure

### Users Collection
```json
{
  "userId": {
    "email": "user@example.com",
    "displayName": "John Doe",
    "role": "customer",
    "phoneNumber": "+1234567890",
    "createdAt": "ISO timestamp"
  }
}
```

### Vehicles Collection
```json
{
  "vehicleId": {
    "name": "Honda City",
    "type": "car",
    "pricePerDay": 1500,
    "fuelType": "Petrol",
    "transmission": "Automatic",
    "seats": 5,
    "availability": true,
    "description": "Comfortable sedan for city rides",
    "imageUrl": "https://...",
    "createdAt": "ISO timestamp"
  }
}
```

### Bookings Collection
```json
{
  "bookingId": {
    "userId": "user123",
    "userEmail": "user@example.com",
    "vehicleId": "vehicle123",
    "vehicleName": "Honda City",
    "pickupDate": "2025-11-20",
    "returnDate": "2025-11-22",
    "totalPrice": 3000,
    "status": "pending",
    "createdAt": "ISO timestamp"
  }
}
```

## Booking Status Flow

1. **pending** - Initial state when customer creates booking
2. **active** - Admin approves booking, vehicle becomes rented
3. **completed** - Booking finished, customer returned vehicle
4. **cancelled** - Booking rejected or cancelled

## Troubleshooting

### Connection Issues

- Check if Firebase project is active
- Verify API keys and configuration
- Check internet connectivity
- Ensure Firestore indexes are created

### Authentication Issues

- Verify Email/Password is enabled
- Check user exists in Authentication tab
- Verify user role in Firestore users collection

### Permission Errors

- Update Firestore security rules
- Ensure user has correct role (admin/customer)
- Check authentication token is valid

## Testing Credentials

### Admin Account
- Email: `admin@flexiride.com`
- Password: Set during user creation

### Test Customer Account
- Email: `user@flexiride.com`
- Password: Set during user creation

## Production Checklist

- [ ] Update Firestore security rules to production mode
- [ ] Update Storage security rules to production mode
- [ ] Add `serviceAccountKey.json` to `.gitignore`
- [ ] Use environment variables for sensitive data
- [ ] Enable email verification for new users
- [ ] Set up Firebase billing alerts
- [ ] Configure custom domain (optional)
- [ ] Enable Firebase Performance Monitoring
- [ ] Set up Firebase Crashlytics for error tracking

## Useful Commands

```bash
# Install dependencies
cd backend && npm install

# Add sample vehicles
node backend/add-more-vehicles.js

# Start development server
npm start

# Build for production
npm run build
```

## Support

For issues or questions:
- Firebase Documentation: https://firebase.google.com/docs
- Firebase Console: https://console.firebase.google.com
- GitHub Issues: Create issue in repository

## License

This project is part of the FlexiRide application.
