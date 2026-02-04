# FlexiRide - Mobile App Setup Guidelines

Follow these instructions to set up and run the FlexiRide Vehicle Rental application on your local development environment.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or later)
- **npm** (comes with Node.js)
- **Git**
- **Expo Go App** (on your iOS or Android device for testing)

---

## 🚀 Getting Started

### 1. Extract the Source Code
Unzip the `FlexiRide.zip` file to your preferred directory.

### 2. Install Dependencies
Open your terminal (Command Prompt, PowerShell, or Terminal) in the root directory of the project and run:
```bash
npm install
```

### 3. Configure Environment Variables (Firebase)
The app uses environment variables to securely connect to Firebase.
1. Create a new file named `.env` in the root directory (or rename `.env.example` to `.env`).
2. Open the `.env` file and replace the placeholder values with your Firebase project credentials:

```bash
EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.firebasestorage.app
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id
EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

> **Note:** You can find these values in the **Firebase Console** -> **Project Settings** -> **Your Apps** -> **Web App** configuration section.

### 4. Start the Application
Run the following command to start the Expo development server:
```bash
npm start
```

---

## 📱 Running on Devices

After running `npm start`, you will see a QR code in your terminal.

### Option A: Mobile Device (Recommended)
1. Install the **Expo Go** app from the App Store (iOS) or Play Store (Android).
2. Open the Expo Go app and:
   - **Android**: Tap "Scan QR Code" and scan the code in your terminal.
   - **iOS**: Use your camera app to scan the QR code, then tap the "Open in Expo Go" notification.

### Option B: Android Emulator
1. Open Android Studio and start an AVD (Android Virtual Device).
2. Press `a` in your terminal to open the app on the emulator.

### Option C: Web Browser
1. Press `w` in your terminal to open the app in your default web browser.

---

## 🔐 Login Credentials for Testing

To explore the different roles in the application, use the following credentials:

### Customer Role
- **Email**: `testuser@gmail.com`
- **Password**: `password123`

### Administrator Role
- **Email**: `admin@flexiride.com`
- **Password**: `admin123`
*(Note: Any email containing "admin" will be redirected to the Admin Dashboard upon login)*

---

## 🛠️ Troubleshooting

- **Dependencies Error**: If you face issues with packages, try `npm install --force`.
- **Firebase Connection**: Ensure you have a stable internet connection for Firebase features to work.
- **Network Issues**: If the QR code doesn't load on Expo Go, ensure your mobile device and computer are on the same Wi-Fi network.

---
*Created for the Mobile Application Development (MAD) Mini Project - Group L*
