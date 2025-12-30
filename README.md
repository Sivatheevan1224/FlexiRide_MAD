

[![React Native](https://img.shields.io/badge/React%20Native-0.81.5-61dafb?logo=react)](https://reactnative.dev)
[![Expo](https://img.shields.io/badge/Expo-54.0.30-000020?logo=expo)](https://expo.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-3178c6?logo=typescript)](https://www.typescriptlang.org)
[![Firebase](https://img.shields.io/badge/Firebase-12.6.0-ffca28?logo=firebase)](https://firebase.google.com)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.19-38bdf8?logo=tailwindcss)](https://tailwindcss.com)

# 🚗 FlexiRide - Vehicle Rental System

A modern, full-featured mobile application for car and bike rentals built with **React Native**, **Expo**, and **Firebase**. FlexiRide provides a seamless rental experience with real-time booking management, admin controls, and a beautiful, responsive interface powered by NativeWind (TailwindCSS).

---

## 📖 About The Project

FlexiRide is a comprehensive vehicle rental platform designed to connect customers with a wide range of cars and bikes. The application offers an intuitive booking system, real-time availability tracking, and robust admin management tools.

### Key Highlights

- **Full-Stack Solution**: Complete mobile app with Firebase backend integration
- **Real-Time Data**: Live updates on vehicle availability and booking status
- **Role-Based Access**: Separate interfaces for customers and administrators
- **Secure Authentication**: Firebase Authentication with email/password
- **Cloud Storage**: Vehicle images stored in Firebase Storage
- **Payment Integration**: Dummy payment gateway for demonstration
- **Date Management**: Advanced date picker for booking periods
- **Revenue Tracking**: Comprehensive analytics dashboard for admins

### Built For

This project was developed as part of a **Mobile Application Development (MAD)** course, demonstrating modern app development practices, cloud integration, and professional UI/UX design principles.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **React Native** | Cross-platform mobile framework |
| **Expo SDK 54** | Development platform & tools |
| **Expo Router** | File-based navigation |
| **NativeWind** | TailwindCSS for React Native |
| **TypeScript** | Type safety & better DX |
| **Firebase Auth** | User authentication |
| **Cloud Firestore** | NoSQL database |
| **Firebase Storage** | Image storage |

---

## 🚀 Features

### 👤 Customer Features

| Feature | Description |
|---------|-------------|
| 🔐 **Authentication** | Secure signup/login with Firebase, form validation, persistent sessions |
| 🏠 **Home Dashboard** | Browse vehicles, filter by category (All/Cars/Bikes), search functionality |
| 📋 **Vehicle Details** | View specs (fuel, transmission, seats), images, pricing, availability |
| 📅 **Booking System** | Date picker, auto price calculation, payment form, confirmation |
| 📱 **My Bookings** | Track all bookings with status (Pending/Confirmed/Completed/Cancelled) |
| 👤 **User Profile** | Manage account info, edit profile, logout |
| 💬 **Support** | Contact support for help |

### 🛡️ Admin Features

| Feature | Description |
|---------|-------------|
| 📊 **Dashboard** | Statistics overview - vehicles, bookings, users, revenue |
| ➕ **Add Vehicle** | Image upload to Firebase Storage, vehicle details form |
| 🚗 **Manage Vehicles** | View/Edit/Delete vehicles, tabs (All/Available/Rented) |
| 📋 **View Bookings** | Approve/Reject bookings, filter by status, auto vehicle sync |
| 💰 **Revenue** | Total revenue, booking stats, monthly breakdown, analytics |
| 👥 **Manage Users** | View all registered users |

---

## 📁 Project Structure

```
FlexiRide/
├── app/                          # Screen files (Expo Router)
│   ├── index.tsx                 # Welcome/Splash screen
│   ├── login.tsx                 # Login screen
│   ├── signup.tsx                # Signup screen
│   ├── home.tsx                  # Browse vehicles
│   ├── vehicle-details.tsx       # Vehicle information
│   ├── booking.tsx               # Booking flow
│   ├── booking-success.tsx       # Booking confirmation
│   ├── my-bookings.tsx           # User's bookings
│   ├── profile.tsx               # User profile
│   ├── edit-profile.tsx          # Edit profile
│   ├── support.tsx               # Support screen
│   ├── _layout.tsx               # Root navigation layout
│   └── admin/                    # Admin screens
│       ├── _layout.tsx           # Admin navigation layout
│       ├── home.tsx              # Admin dashboard
│       ├── add-vehicle.tsx       # Add new vehicle
│       ├── manage-vehicles.tsx   # Manage all vehicles
│       ├── view-bookings.tsx     # View all bookings
│       ├── manage-users.tsx      # Manage users
│       └── revenue.tsx           # Revenue analytics
│
├── components/ui/                # Reusable UI components
│   ├── button.tsx                # Custom button component
│   ├── input.tsx                 # Form input component
│   ├── card.tsx                  # Card container component
│   ├── vehicle-card.tsx          # Vehicle display card
│   ├── booking-card.tsx          # Booking display card
│   ├── platform-image.tsx        # Cross-platform image
│   └── index.tsx                 # Component exports
│
├── firebase/                     # Firebase Client SDK (for app)
│   ├── config.ts                 # Firebase configuration
│   ├── auth.ts                   # Authentication functions
│   ├── vehicles.ts               # Vehicle CRUD operations
│   └── bookings.ts               # Booking CRUD operations
│
├── backend/                      # Firebase Admin SDK (for server)
│   ├── config.js                 # Admin SDK configuration
│   ├── server.js                 # Express server
│   ├── auth.js                   # Auth management
│   ├── vehicles.js               # Vehicle management
│   ├── bookings.js               # Booking management
│   └── helpers.js                # Utility functions
│
├── assets/images/                # Local images
│   ├── car/                      # Car images
│   └── bike/                     # Bike images
│
├── web/                          # Web-specific files
│   └── index.html                # Custom web template
│
├── tailwind.config.js            # Tailwind configuration
├── babel.config.js               # Babel configuration
├── metro.config.js               # Metro bundler config
├── global.css                    # Global styles
├── package.json                  # Dependencies
└── README.md                     # This file
```

---

## 🧩 UI Components

Located in `components/ui/`:

| Component | Description |
|-----------|-------------|
| **Button** | 3 variants (primary, secondary, outline), loading state |
| **Input** | Icons, validation, password toggle, multiline support |
| **Card** | Flexible padding (sm, md, lg) with shadows |
| **VehicleCard** | Vehicle display with image, specs, and price |
| **BookingCard** | Booking info with color-coded status badges |
| **PlatformImage** | Cross-platform image handling (web/mobile) |

---

## 📦 Installation

### 1. Clone the repository

```bash
git clone https://github.com/Sivatheevan1224/FlexiRide_MAD.git
cd FlexiRide
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm start
```

### 4. Run on your device

- **Expo Go**: Scan QR code with Expo Go app (iOS/Android)
- **Android**: Press `a` for Android emulator
- **iOS**: Press `i` for iOS simulator
- **Web**: Press `w` for web browser

---

## 🎯 Usage

### For Customers

1. Launch the app and see the welcome screen
2. Sign up or login to your account
3. Browse available cars and bikes
4. Select a vehicle to view details
5. Choose pickup/return dates and confirm booking
6. Track your bookings in "My Bookings"
7. Manage your profile

### For Admins

1. Login with admin credentials (email containing "admin")
2. Access admin dashboard with statistics
3. Add new vehicles with images
4. Manage existing vehicles (edit/delete)
5. View and approve/reject bookings
6. Monitor revenue analytics

---

## 🎨 Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| **Primary Blue** | `#2563eb` | Buttons, links, accents |
| **Secondary** | `#64748b` | Muted text, borders |
| **Success** | `#22c55e` | Confirmed, available |
| **Warning** | `#fbbf24` | Pending status |
| **Danger** | `#ef4444` | Cancelled, errors |
| **Background** | `#f8fafc` | Screen backgrounds |
| **Text** | `#1f2937` | Primary text |

---

## 🔧 Configuration Files

| File | Purpose |
|------|---------|
| `babel.config.js` | Babel with NativeWind preset |
| `metro.config.js` | Metro bundler configuration |
| `tailwind.config.js` | TailwindCSS customization |
| `global.css` | Global styles & Tailwind directives |
| `tsconfig.json` | TypeScript configuration |
| `app.json` | Expo app configuration |

---

## 🔥 Firebase Setup

See [FIREBASE_SETUP_GUIDE.md](./FIREBASE_SETUP_GUIDE.md) for detailed Firebase configuration instructions.

### Quick Overview:

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable Authentication (Email/Password)
3. Create Firestore Database
4. Enable Firebase Storage
5. Copy config to `firebase/config.ts`
6. For backend, download service account key to `backend/serviceAccountKey.json`

---

## 📚 Additional Documentation

- [DEPENDENCIES_GUIDE.md](./DEPENDENCIES_GUIDE.md) - Explanation of all npm packages
- [FIREBASE_SETUP_GUIDE.md](./FIREBASE_SETUP_GUIDE.md) - Firebase configuration guide
- [SECURITY.md](./SECURITY.md) - Security best practices

---

## 🚧 Future Enhancements

- [ ] Real payment gateway integration (Stripe/Razorpay)
- [ ] Push notifications for booking updates
- [ ] Google Maps integration for locations
- [ ] Reviews and ratings system
- [ ] Advanced search filters
- [ ] Dark mode support
- [ ] Multi-language support
- [ ] Offline mode support

---

## 📄 License

This project is created for educational purposes as part of the Mobile Application Development (MAD) course.

---

## 👥 Credits

Created with ❤️ using:
- React Native & Expo
- Firebase
- NativeWind (TailwindCSS)

---

**Happy Coding! 🚗🏍️**
