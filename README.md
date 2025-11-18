# 🚗 FlexiRide - Vehicle Rental System

A modern, full-featured mobile application for car and bike rentals built with **React Native**, **Expo**, and **Firebase**. FlexiRide provides a seamless rental experience with real-time booking management, admin controls, and a beautiful, responsive interface powered by NativeWind (TailwindCSS).

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



## 🚀 Features

### 👤 Customer Features

- **🔐 Authentication System**
  - Secure signup and login with Firebase Authentication
  - Form validation and error handling
  - Session management with persistent login

- **🏠 Home Dashboard**
  - Browse all available vehicles
  - Filter by category (All/Cars/Bikes)
  - Search functionality
  - Real-time availability status

- **📋 Vehicle Details**
  - Comprehensive vehicle information
  - Specifications (fuel type, transmission, seats)
  - High-quality images
  - Pricing per day
  - Availability calendar

- **📅 Booking System**
  - Interactive date picker for pickup/return dates
  - Automatic price calculation
  - Payment form integration
  - Booking confirmation
  - Real-time availability check

- **📱 My Bookings**
  - View all personal bookings
  - Track booking status (Pending, Confirmed, Completed, Cancelled)
  - Booking history
  - Vehicle details for each booking

- **👤 User Profile**
  - Account information management
  - Profile editing
  - Logout functionality

### 🛡️ Admin Features

- **📊 Admin Dashboard**
  - Real-time statistics overview
  - Total vehicles count
  - Active bookings
  - Total users
  - Revenue tracking

- **➕ Add Vehicle**
  - Image upload with Firebase Storage
  - Vehicle details form (name, type, price, specs)
  - Automatic availability management

- **🚗 Manage Vehicles**
  - View all vehicles with tabs (All/Available/Rented)
  - Edit vehicle details
  - Delete vehicles
  - Track rental status
  - Real-time availability updates

- **📋 View Bookings**
  - Manage all customer bookings
  - Approve pending bookings (marks vehicle as rented)
  - Reject bookings (keeps vehicle available)
  - Filter by status (All/Pending/Confirmed/Completed)
  - Automatic vehicle availability sync

- **💰 Revenue Dashboard**
  - Total revenue from completed and active bookings
  - Booking statistics (completed, active, pending, cancelled)
  - Monthly revenue breakdown
  - Average booking value
  - Visual analytics

### 🎨 Design Features

- **Clean Modern UI** - Minimalist design with TailwindCSS
- **Rounded Components** - Smooth rounded corners (rounded-xl, rounded-full)
- **Consistent Spacing** - Professional padding and margins
- **Card Layouts** - Beautiful card-based designs with shadows
- **Color Scheme** - Blue primary (#2563eb) with neutral accents
- **Responsive Design** - Optimized for all mobile screen sizes
- **Icon System** - Ionicons throughout for consistent iconography
- **Status Badges** - Color-coded status indicators
- **Loading States** - Smooth loading animations
- **Empty States** - Informative empty state messages



## 📁 Project Structure- Home (`app/home.tsx`)- **Button** (`button.tsx`) - Customizable button with variants (primary, secondary, outline)



```- Vehicle Details (`app/vehicle-details.tsx`)- **Input** (`input.tsx`) - Form input with icons, validation, and password toggle

FlexiRide/

├── app/                        # All screens- Booking (`app/booking.tsx`)- **Card** (`card.tsx`) - Container component with shadow and padding options

│   ├── index.tsx              # Welcome with image slider ✨

│   ├── login.tsx              # Login- Booking Success (`app/booking-success.tsx`)- **VehicleCard** (`vehicle-card.tsx`) - Display vehicle information with image

│   ├── signup.tsx             # Signup

│   ├── home.tsx               # Browse vehicles- My Bookings (`app/my-bookings.tsx`)- **BookingCard** (`booking-card.tsx`) - Show booking details with status badges

│   ├── vehicle-details.tsx    # Vehicle info

│   ├── booking.tsx            # Booking flow- Profile (`app/profile.tsx`)

│   ├── booking-success.tsx    # Success message

│   ├── my-bookings.tsx        # User bookings## 🛠️ Tech Stack

│   ├── profile.tsx            # User profile

│   ├── _layout.tsx            # Navigation (web-optimized)### Admin Screens (4)

│   └── admin/                 # Admin screens

│       ├── _layout.tsx        # Admin layout- Dashboard (`app/admin/home.tsx`)- **React Native** - Mobile app framework

│       ├── home.tsx           # Dashboard

│       ├── add-vehicle.tsx    # Add vehicle- Add Vehicle (`app/admin/add-vehicle.tsx`)- **Expo** - Development platform

│       ├── manage-vehicles.tsx # Manage vehicles

│       └── view-bookings.tsx  # View bookings- Manage Vehicles (`app/admin/manage-vehicles.tsx`)- **Expo Router** - File-based routing

├── components/ui/             # Reusable components

│   ├── button.tsx- View Bookings (`app/admin/view-bookings.tsx`)- **NativeWind** - TailwindCSS for React Native

│   ├── input.tsx

│   ├── card.tsx- **TypeScript** - Type safety

│   ├── vehicle-card.tsx

│   ├── booking-card.tsx## 🧩 UI Components- **Expo Image Picker** - Image selection for admin panel

│   ├── platform-image.tsx     # Web/mobile image handler

│   └── index.tsx- **React Native DateTime Picker** - Date selection for bookings

├── assets/images/             # Local images

│   ├── car/                   # Car images (22 files)Located in `components/ui/`:

│   └── bike/                  # Bike images (14 files)

├── web/                       # Web-specific files## 📦 Installation

│   └── index.html             # Custom web template

├── tailwind.config.js         # Tailwind config (web-safe)- **Button** - 3 variants (primary, secondary, outline), 3 sizes, loading state

├── babel.config.js            # Babel with NativeWind

├── metro.config.js            # Metro bundler- **Input** - Icons, validation, password toggle, multiline support1. **Clone the repository**

├── global.css                 # Global styles + web responsive

└── package.json               # Dependencies- **Card** - Flexible padding (sm, md, lg) with shadows```bash

```

- **VehicleCard** - Vehicle display with image, specs, and pricegit clone <your-repo-url>

## 🎯 Usage

- **BookingCard** - Booking info with status badgescd FlexiRide

### Testing User Flow

1. Run `npm start````

2. Scan QR with Expo Go (or press 'w' for web)

3. See welcome screen with auto-sliding images## 🛠️ Tech Stack

4. Click "Get Started" → Login

5. Use `user@test.com` / `password123`2. **Install dependencies**

6. Browse vehicles → View details → Book

7. Check "My Bookings" and "Profile"- React Native 0.81.5```bash

8. Logout returns to welcome screen

- Expo ~54.0.23npm install

### Testing Admin Flow

1. Login with `admin@test.com` / `admin123`- Expo Router ~6.0.14 (File-based routing)```

2. View dashboard with statistics

3. Add new vehicle (with image picker)- NativeWind v2.0.11 (TailwindCSS for RN)

4. Manage vehicles - see local images loaded

5. View and approve/reject bookings- TypeScript ~5.9.23. **Start the development server**

6. Logout returns to welcome screen

- Expo Image Picker```bash

## 🎨 Color Scheme

- React Native DateTime Pickernpm start

- **Primary**: `#2563eb` (Blue-600)

- **Success**: `#22c55e` (Green-500)```

- **Warning**: `#fbbf24` (Yellow-500)

- **Danger**: `#ef4444` (Red-500)## 📁 Project Structure

- **Background**: `#f8fafc` (Slate-50)

- **Text**: `#1f2937` (Neutral-800)4. **Run on your device**



## 🔧 Key Features```- Scan QR code with Expo Go app (iOS/Android)



### Platform-Specific OptimizationsFlexiRide/- Press `a` for Android emulator

- **Mobile**: Native touch gestures, optimized performance

- **Web**: Centered mobile view (480px max width) with device frame├── app/                        # All screens- Press `i` for iOS simulator

- **Images**: Smart loading for both platforms via PlatformImage component

- **Styling**: CSS media queries for web-only enhancements│   ├── index.tsx              # Welcome screen



### NativeWind Styling│   ├── login.tsx              # Login## 🎯 Usage

- Uses Tailwind utility classes

- Responsive spacing system│   ├── signup.tsx             # Signup

- Consistent design tokens

- Mobile-optimized with web support│   ├── home.tsx               # Browse vehicles### For Users

- No preflight conflicts

│   ├── vehicle-details.tsx    # Vehicle info1. Launch the app and see the splash screen

### Navigation

- Expo Router file-based routing│   ├── booking.tsx            # Booking flow2. Sign up or login to your account

- TypeScript typed routes

- Stack navigation for screens│   ├── booking-success.tsx    # Success message3. Browse available cars and bikes

- Bottom tab navigation for users

- Web-responsive layouts│   ├── my-bookings.tsx        # User bookings4. Select a vehicle to view details



### Image Handling│   ├── profile.tsx            # User profile5. Choose dates and confirm booking

- Local images in `assets/images/`

- Support for both local and remote images│   ├── _layout.tsx            # Navigation6. Track your bookings in "My Bookings"

- Image picker for admin uploads

- Platform-aware image component│   └── admin/                 # Admin screens7. Manage your profile

- Auto-sliding carousel on welcome screen

│       ├── _layout.tsx        # Admin layout

## 📝 Development Notes

│       ├── home.tsx           # Dashboard### For Admins

### Important Files

- `babel.config.js` - Includes `nativewind/babel` plugin│       ├── add-vehicle.tsx    # Add vehicle1. Login with admin credentials (email containing "admin")

- `metro.config.js` - Metro bundler configuration

- `tailwind.config.js` - Custom Tailwind setup (preflight disabled)│       ├── manage-vehicles.tsx # Manage vehicles2. Access admin dashboard

- `global.css` - Tailwind directives + web responsive styles

- `app/_layout.tsx` - Platform-aware navigation config│       └── view-bookings.tsx  # View bookings3. Add new vehicles with images

- `web/index.html` - Custom web template with splash screen

├── components/ui/             # Reusable components4. Manage existing vehicles (edit/delete)

### Running the App

```bash│   ├── button.tsx5. View and approve/reject bookings

npm start           # Start Metro bundler

npm run android     # Run on Android│   ├── input.tsx6. Monitor system statistics

npm run ios         # Run on iOS

npm start -c        # Clear cache and restart│   ├── card.tsx

```

│   ├── vehicle-card.tsx## 🎨 Color Palette

Press 'w' in terminal for web preview (mobile-centered view)

│   └── booking-card.tsx

### Web Features

- Mobile-centered viewport (480px max width)├── assets/images/             # Local images- **Primary Blue**: `#2563eb` (bg-blue-600)

- Device frame simulation with notch

- Gradient background on desktop│   ├── car/                   # Car images (22 files)- **Secondary**: `#64748b` (bg-slate-500)

- Custom scrollbar styling

- Animated splash screen│   └── bike/                  # Bike images (14 files)- **Success**: `#22c55e` (bg-green-500)

- Responsive at all breakpoints

├── tailwind.config.js         # Tailwind config- **Warning**: `#fbbf24` (bg-yellow-500)

### Troubleshooting

- **Images not loading on web?** Use PlatformImage component├── babel.config.js            # Babel with NativeWind- **Danger**: `#ef4444` (bg-red-500)

- **Styles different on web?** Check global.css media queries

- **Layout broken?** Clear cache: `npm start -c`├── metro.config.js            # Metro bundler- **Background**: `#f8fafc` (bg-slate-50)

- **Admin navigation?** Console logs show routing path

├── global.css                 # Global styles- **Text**: `#1f2937` (text-neutral-800)

## 🚧 Next Steps (Production)

└── package.json               # Dependencies

- [ ] Backend API integration

- [ ] Authentication (JWT/Firebase)```## 📁 Project Structure

- [ ] Database (MongoDB/PostgreSQL)

- [ ] Payment gateway (Stripe/Razorpay)

- [ ] Push notifications

- [ ] Google Maps integration## 🎯 Usage```

- [ ] Image optimization & caching

- [ ] Offline supportFlexiRide/

- [ ] Unit & E2E tests

- [ ] Progressive Web App (PWA) features### Testing User Flow├── app/                        # Screen files (Expo Router)



## ✨ What's New1. Run `npm start`│   ├── index.tsx              # Splash screen



### Latest Updates2. Scan QR with Expo Go│   ├── login.tsx              # Login screen

- ✅ Auto-sliding image carousel on welcome screen

- ✅ Web-responsive design (works beautifully on desktop)3. See welcome screen → Click "Get Started"│   ├── signup.tsx             # Signup screen

- ✅ Device frame simulation for web preview

- ✅ Platform-aware image loading4. Login with `user@test.com` / `password123`│   ├── home.tsx               # Home screen

- ✅ Local images in admin vehicle management

- ✅ Clean logout to welcome screen5. Browse vehicles → View details → Book│   ├── vehicle-details.tsx    # Vehicle details

- ✅ Removed all unused template files

- ✅ Custom web splash screen6. Check "My Bookings" and "Profile"│   ├── booking.tsx            # Booking screen



## 📄 License│   ├── booking-success.tsx    # Success screen



Educational project for Mobile Application Development.### Testing Admin Flow│   ├── my-bookings.tsx        # User bookings



---1. Login with `admin@test.com` / `admin123`│   ├── profile.tsx            # User profile



**Built with React Native + Expo + NativeWind 🚗🏍️**2. View dashboard statistics│   ├── _layout.tsx            # Root layout



**Works perfectly on iOS, Android, and Web! 📱💻**3. Add new vehicle (with image)│   └── admin/                 # Admin screens


4. Manage vehicles (edit/delete)│       ├── home.tsx

5. View and approve bookings│       ├── add-vehicle.tsx

│       ├── manage-vehicles.tsx

## 🎨 Color Scheme│       └── view-bookings.tsx

├── components/                 # Reusable components

- **Primary**: `#2563eb` (Blue-600)│   └── ui/

- **Success**: `#22c55e` (Green-500)│       ├── button.tsx

- **Warning**: `#fbbf24` (Yellow-500)│       ├── input.tsx

- **Danger**: `#ef4444` (Red-500)│       ├── card.tsx

- **Background**: `#f8fafc` (Slate-50)│       ├── vehicle-card.tsx

- **Text**: `#1f2937` (Neutral-800)│       └── booking-card.tsx

├── assets/                     # Images and fonts

## 🔧 Key Features├── constants/                  # App constants

├── hooks/                      # Custom hooks

### NativeWind Styling├── tailwind.config.js         # Tailwind configuration

- Uses Tailwind utility classes├── babel.config.js            # Babel configuration

- Responsive spacing system├── global.css                 # Global styles

- Consistent design tokens├── nativewind-env.d.ts        # TypeScript types

- Mobile-optimized├── package.json               # Dependencies

└── README.md                  # This file

### Navigation```

- Expo Router file-based routing

- TypeScript typed routes## 🔧 Configuration

- Stack navigation for screens

- Bottom tab navigation for users### TailwindCSS (tailwind.config.js)

The project uses custom colors and extends Tailwind's default theme:

### Image Handling- Primary: `#2563eb`

- Local images in `assets/images/`- Secondary: `#64748b`

- Support for both local and remote images

- Image picker for admin uploads### Babel (babel.config.js)

Configured with NativeWind preset for TailwindCSS support in React Native.

## 📝 Development Notes

### Expo Router

### Important FilesFile-based routing with typed routes enabled for better TypeScript support.

- `babel.config.js` - Includes `nativewind/babel` plugin

- `metro.config.js` - Metro bundler configuration## 📝 Development Guidelines

- `tailwind.config.js` - Custom Tailwind setup

- `global.css` - Tailwind directives (@tailwind base, components, utilities)### Code Style

- Use TypeScript for type safety

### Running the App- Follow React functional component patterns

```bash- Use Tailwind utility classes for styling

npm start           # Start Metro bundler- Keep components small and reusable

npm run android     # Run on Android- Add comments for complex logic

npm run ios         # Run on iOS

npm start -c        # Clear cache and restart### Component Patterns

``````tsx

// Example of a clean component

### Troubleshootingimport { View, Text } from 'react-native';

- Red dot errors fixed (contentContainerClassName → className)

- Admin navigation configured with proper routinginterface MyComponentProps {

- Console logs added for debugging navigation  title: string;

- Case-insensitive email matching for admin  onPress: () => void;

}

## 🚧 Next Steps (Production)

export default function MyComponent({ title, onPress }: MyComponentProps) {

- [ ] Backend API integration  return (

- [ ] Authentication (JWT/Firebase)    <View className="p-4 bg-white rounded-xl">

- [ ] Database (MongoDB/PostgreSQL)      <Text className="text-neutral-800 font-semibold">{title}</Text>

- [ ] Payment gateway (Stripe/Razorpay)    </View>

- [ ] Push notifications  );

- [ ] Google Maps integration}

- [ ] Image optimization & caching```

- [ ] Offline support

- [ ] Unit & E2E tests## 🚧 Future Enhancements



## 📄 License- [ ] Backend API integration

- [ ] Real-time booking updates

Educational project for Mobile Application Development.- [ ] Payment gateway integration

- [ ] Push notifications

---- [ ] Maps integration for location

- [ ] Reviews and ratings system

**Built with React Native + Expo + NativeWind 🚗🏍️**- [ ] Advanced search filters

- [ ] Dark mode support
- [ ] Multi-language support
- [ ] Analytics dashboard

## 📄 License

This project is created for educational purposes.

## 👥 Credits

Created with ❤️ using React Native, Expo, and NativeWind.

## 📞 Support

For any queries or support, please contact the development team.

---

**Happy Coding! 🚗🏍️**
