# FlexiRide - Car & Bike Rental System

A modern, clean, and minimal mobile application for car and bike rentals built with React Native, Expo, and NativeWind (TailwindCSS).

## 🚀 Features

### User Features
- **Splash Screen** - Clean animated splash screen with app logo
- **Authentication** - Signup and Login screens with form validation
- **Home Screen** - Browse available vehicles with search and filter options
- **Vehicle Details** - View detailed information about vehicles with specs
- **Booking System** - Easy booking flow with date selection and price calculation
- **My Bookings** - Track all your bookings with status indicators
- **User Profile** - Manage account information and settings

### Admin Features
- **Admin Dashboard** - Overview of all system statistics
- **Add Vehicle** - Add new vehicles with image upload
- **Manage Vehicles** - View, edit, and delete vehicles
- **View Bookings** - Manage all user bookings with approval system

## 🎨 Design Features

- **Clean & Modern UI** - Minimal design with TailwindCSS styling
- **Rounded Components** - Smooth rounded corners throughout
- **Proper Spacing** - Consistent padding and margins using Tailwind spacing
- **Card Layouts** - Beautiful card-based designs with shadows
- **Color Scheme** - Blue primary color (#2563eb) with neutral accents
- **Responsive** - Mobile-first design optimized for all screen sizes
- **Icons** - Ionicons for clean, consistent iconography

## 📱 Screens

### Authentication
- ✅ Splash Screen (`app/index.tsx`)
- ✅ Signup Screen (`app/signup.tsx`)
- ✅ Login Screen (`app/login.tsx`)

### User Screens
- ✅ Home Screen (`app/home.tsx`)
- ✅ Vehicle Details (`app/vehicle-details.tsx`)
- ✅ Booking Screen (`app/booking.tsx`)
- ✅ Booking Success (`app/booking-success.tsx`)
- ✅ My Bookings (`app/my-bookings.tsx`)
- ✅ Profile Screen (`app/profile.tsx`)

### Admin Screens
- ✅ Admin Home (`app/admin/home.tsx`)
- ✅ Add Vehicle (`app/admin/add-vehicle.tsx`)
- ✅ Manage Vehicles (`app/admin/manage-vehicles.tsx`)
- ✅ View Bookings (`app/admin/view-bookings.tsx`)

## 🧩 Reusable Components

All components are located in `components/ui/`:

- **Button** (`button.tsx`) - Customizable button with variants (primary, secondary, outline)
- **Input** (`input.tsx`) - Form input with icons, validation, and password toggle
- **Card** (`card.tsx`) - Container component with shadow and padding options
- **VehicleCard** (`vehicle-card.tsx`) - Display vehicle information with image
- **BookingCard** (`booking-card.tsx`) - Show booking details with status badges

## 🛠️ Tech Stack

- **React Native** - Mobile app framework
- **Expo** - Development platform
- **Expo Router** - File-based routing
- **NativeWind** - TailwindCSS for React Native
- **TypeScript** - Type safety
- **Expo Image Picker** - Image selection for admin panel
- **React Native DateTime Picker** - Date selection for bookings

## 📦 Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd FlexiRide
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm start
```

4. **Run on your device**
- Scan QR code with Expo Go app (iOS/Android)
- Press `a` for Android emulator
- Press `i` for iOS simulator

## 🎯 Usage

### For Users
1. Launch the app and see the splash screen
2. Sign up or login to your account
3. Browse available cars and bikes
4. Select a vehicle to view details
5. Choose dates and confirm booking
6. Track your bookings in "My Bookings"
7. Manage your profile

### For Admins
1. Login with admin credentials (email containing "admin")
2. Access admin dashboard
3. Add new vehicles with images
4. Manage existing vehicles (edit/delete)
5. View and approve/reject bookings
6. Monitor system statistics

## 🎨 Color Palette

- **Primary Blue**: `#2563eb` (bg-blue-600)
- **Secondary**: `#64748b` (bg-slate-500)
- **Success**: `#22c55e` (bg-green-500)
- **Warning**: `#fbbf24` (bg-yellow-500)
- **Danger**: `#ef4444` (bg-red-500)
- **Background**: `#f8fafc` (bg-slate-50)
- **Text**: `#1f2937` (text-neutral-800)

## 📁 Project Structure

```
FlexiRide/
├── app/                        # Screen files (Expo Router)
│   ├── index.tsx              # Splash screen
│   ├── login.tsx              # Login screen
│   ├── signup.tsx             # Signup screen
│   ├── home.tsx               # Home screen
│   ├── vehicle-details.tsx    # Vehicle details
│   ├── booking.tsx            # Booking screen
│   ├── booking-success.tsx    # Success screen
│   ├── my-bookings.tsx        # User bookings
│   ├── profile.tsx            # User profile
│   ├── _layout.tsx            # Root layout
│   └── admin/                 # Admin screens
│       ├── home.tsx
│       ├── add-vehicle.tsx
│       ├── manage-vehicles.tsx
│       └── view-bookings.tsx
├── components/                 # Reusable components
│   └── ui/
│       ├── button.tsx
│       ├── input.tsx
│       ├── card.tsx
│       ├── vehicle-card.tsx
│       └── booking-card.tsx
├── assets/                     # Images and fonts
├── constants/                  # App constants
├── hooks/                      # Custom hooks
├── tailwind.config.js         # Tailwind configuration
├── babel.config.js            # Babel configuration
├── global.css                 # Global styles
├── nativewind-env.d.ts        # TypeScript types
├── package.json               # Dependencies
└── README.md                  # This file
```

## 🔧 Configuration

### TailwindCSS (tailwind.config.js)
The project uses custom colors and extends Tailwind's default theme:
- Primary: `#2563eb`
- Secondary: `#64748b`

### Babel (babel.config.js)
Configured with NativeWind preset for TailwindCSS support in React Native.

### Expo Router
File-based routing with typed routes enabled for better TypeScript support.

## 📝 Development Guidelines

### Code Style
- Use TypeScript for type safety
- Follow React functional component patterns
- Use Tailwind utility classes for styling
- Keep components small and reusable
- Add comments for complex logic

### Component Patterns
```tsx
// Example of a clean component
import { View, Text } from 'react-native';

interface MyComponentProps {
  title: string;
  onPress: () => void;
}

export default function MyComponent({ title, onPress }: MyComponentProps) {
  return (
    <View className="p-4 bg-white rounded-xl">
      <Text className="text-neutral-800 font-semibold">{title}</Text>
    </View>
  );
}
```

## 🚧 Future Enhancements

- [ ] Backend API integration
- [ ] Real-time booking updates
- [ ] Payment gateway integration
- [ ] Push notifications
- [ ] Maps integration for location
- [ ] Reviews and ratings system
- [ ] Advanced search filters
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
