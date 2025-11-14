# FlexiRide - Car & Bike Rental System# FlexiRide - Car & Bike Rental System



A modern, clean, and minimal mobile application for car and bike rentals built with React Native, Expo, and NativeWind (TailwindCSS).A modern, clean, and minimal mobile application for car and bike rentals built with React Native, Expo, and NativeWind (TailwindCSS).



## 🚀 Features## 🚀 Features



### User Features### User Features

- **Welcome Screen** - Landing page with features and "Get Started" button- **Splash Screen** - Clean animated splash screen with app logo

- **Authentication** - Signup and Login screens with demo credentials- **Authentication** - Signup and Login screens with form validation

- **Home Screen** - Browse vehicles with search and filter (All/Cars/Bikes)- **Home Screen** - Browse available vehicles with search and filter options

- **Vehicle Details** - View detailed specs, select dates, and book- **Vehicle Details** - View detailed information about vehicles with specs

- **Booking System** - Easy booking flow with price calculation- **Booking System** - Easy booking flow with date selection and price calculation

- **My Bookings** - Track bookings with status indicators- **My Bookings** - Track all your bookings with status indicators

- **User Profile** - Manage account and settings- **User Profile** - Manage account information and settings



### Admin Features### Admin Features

- **Admin Dashboard** - Statistics overview with quick actions- **Admin Dashboard** - Overview of all system statistics

- **Add Vehicle** - Add new vehicles with image upload- **Add Vehicle** - Add new vehicles with image upload

- **Manage Vehicles** - View, edit, and delete vehicles- **Manage Vehicles** - View, edit, and delete vehicles

- **View Bookings** - Manage all bookings with approve/reject- **View Bookings** - Manage all user bookings with approval system



## 🎨 Design Features## 🎨 Design Features



- ✅ Clean & Modern UI with TailwindCSS- **Clean & Modern UI** - Minimal design with TailwindCSS styling

- ✅ Rounded components (rounded-xl, rounded-full)- **Rounded Components** - Smooth rounded corners throughout

- ✅ Proper spacing (p-4, space-y-3, gap-4)- **Proper Spacing** - Consistent padding and margins using Tailwind spacing

- ✅ Card layouts with shadows- **Card Layouts** - Beautiful card-based designs with shadows

- ✅ Blue theme (#2563eb) with neutral accents- **Color Scheme** - Blue primary color (#2563eb) with neutral accents

- ✅ Mobile-first responsive design- **Responsive** - Mobile-first design optimized for all screen sizes

- ✅ Ionicons throughout- **Icons** - Ionicons for clean, consistent iconography



## 📱 Quick Start## 📱 Screens



### Installation### Authentication

```bash- ✅ Splash Screen (`app/index.tsx`)

npm install- ✅ Signup Screen (`app/signup.tsx`)

npm start- ✅ Login Screen (`app/login.tsx`)

```

### User Screens

### Test Credentials- ✅ Home Screen (`app/home.tsx`)

**User Login:**- ✅ Vehicle Details (`app/vehicle-details.tsx`)

- Email: `user@test.com`- ✅ Booking Screen (`app/booking.tsx`)

- Password: `password123`- ✅ Booking Success (`app/booking-success.tsx`)

- ✅ My Bookings (`app/my-bookings.tsx`)

**Admin Login:**- ✅ Profile Screen (`app/profile.tsx`)

- Email: `admin@test.com`

- Password: `admin123`### Admin Screens

- ✅ Admin Home (`app/admin/home.tsx`)

## 📱 Screens (13 Total)- ✅ Add Vehicle (`app/admin/add-vehicle.tsx`)

- ✅ Manage Vehicles (`app/admin/manage-vehicles.tsx`)

### Authentication (3)- ✅ View Bookings (`app/admin/view-bookings.tsx`)

- Welcome Screen (`app/index.tsx`)

- Login (`app/login.tsx`)## 🧩 Reusable Components

- Signup (`app/signup.tsx`)

All components are located in `components/ui/`:

### User Screens (6)

- Home (`app/home.tsx`)- **Button** (`button.tsx`) - Customizable button with variants (primary, secondary, outline)

- Vehicle Details (`app/vehicle-details.tsx`)- **Input** (`input.tsx`) - Form input with icons, validation, and password toggle

- Booking (`app/booking.tsx`)- **Card** (`card.tsx`) - Container component with shadow and padding options

- Booking Success (`app/booking-success.tsx`)- **VehicleCard** (`vehicle-card.tsx`) - Display vehicle information with image

- My Bookings (`app/my-bookings.tsx`)- **BookingCard** (`booking-card.tsx`) - Show booking details with status badges

- Profile (`app/profile.tsx`)

## 🛠️ Tech Stack

### Admin Screens (4)

- Dashboard (`app/admin/home.tsx`)- **React Native** - Mobile app framework

- Add Vehicle (`app/admin/add-vehicle.tsx`)- **Expo** - Development platform

- Manage Vehicles (`app/admin/manage-vehicles.tsx`)- **Expo Router** - File-based routing

- View Bookings (`app/admin/view-bookings.tsx`)- **NativeWind** - TailwindCSS for React Native

- **TypeScript** - Type safety

## 🧩 UI Components- **Expo Image Picker** - Image selection for admin panel

- **React Native DateTime Picker** - Date selection for bookings

Located in `components/ui/`:

## 📦 Installation

- **Button** - 3 variants (primary, secondary, outline), 3 sizes, loading state

- **Input** - Icons, validation, password toggle, multiline support1. **Clone the repository**

- **Card** - Flexible padding (sm, md, lg) with shadows```bash

- **VehicleCard** - Vehicle display with image, specs, and pricegit clone <your-repo-url>

- **BookingCard** - Booking info with status badgescd FlexiRide

```

## 🛠️ Tech Stack

2. **Install dependencies**

- React Native 0.81.5```bash

- Expo ~54.0.23npm install

- Expo Router ~6.0.14 (File-based routing)```

- NativeWind v2.0.11 (TailwindCSS for RN)

- TypeScript ~5.9.23. **Start the development server**

- Expo Image Picker```bash

- React Native DateTime Pickernpm start

```

## 📁 Project Structure

4. **Run on your device**

```- Scan QR code with Expo Go app (iOS/Android)

FlexiRide/- Press `a` for Android emulator

├── app/                        # All screens- Press `i` for iOS simulator

│   ├── index.tsx              # Welcome screen

│   ├── login.tsx              # Login## 🎯 Usage

│   ├── signup.tsx             # Signup

│   ├── home.tsx               # Browse vehicles### For Users

│   ├── vehicle-details.tsx    # Vehicle info1. Launch the app and see the splash screen

│   ├── booking.tsx            # Booking flow2. Sign up or login to your account

│   ├── booking-success.tsx    # Success message3. Browse available cars and bikes

│   ├── my-bookings.tsx        # User bookings4. Select a vehicle to view details

│   ├── profile.tsx            # User profile5. Choose dates and confirm booking

│   ├── _layout.tsx            # Navigation6. Track your bookings in "My Bookings"

│   └── admin/                 # Admin screens7. Manage your profile

│       ├── _layout.tsx        # Admin layout

│       ├── home.tsx           # Dashboard### For Admins

│       ├── add-vehicle.tsx    # Add vehicle1. Login with admin credentials (email containing "admin")

│       ├── manage-vehicles.tsx # Manage vehicles2. Access admin dashboard

│       └── view-bookings.tsx  # View bookings3. Add new vehicles with images

├── components/ui/             # Reusable components4. Manage existing vehicles (edit/delete)

│   ├── button.tsx5. View and approve/reject bookings

│   ├── input.tsx6. Monitor system statistics

│   ├── card.tsx

│   ├── vehicle-card.tsx## 🎨 Color Palette

│   └── booking-card.tsx

├── assets/images/             # Local images- **Primary Blue**: `#2563eb` (bg-blue-600)

│   ├── car/                   # Car images (22 files)- **Secondary**: `#64748b` (bg-slate-500)

│   └── bike/                  # Bike images (14 files)- **Success**: `#22c55e` (bg-green-500)

├── tailwind.config.js         # Tailwind config- **Warning**: `#fbbf24` (bg-yellow-500)

├── babel.config.js            # Babel with NativeWind- **Danger**: `#ef4444` (bg-red-500)

├── metro.config.js            # Metro bundler- **Background**: `#f8fafc` (bg-slate-50)

├── global.css                 # Global styles- **Text**: `#1f2937` (text-neutral-800)

└── package.json               # Dependencies

```## 📁 Project Structure



## 🎯 Usage```

FlexiRide/

### Testing User Flow├── app/                        # Screen files (Expo Router)

1. Run `npm start`│   ├── index.tsx              # Splash screen

2. Scan QR with Expo Go│   ├── login.tsx              # Login screen

3. See welcome screen → Click "Get Started"│   ├── signup.tsx             # Signup screen

4. Login with `user@test.com` / `password123`│   ├── home.tsx               # Home screen

5. Browse vehicles → View details → Book│   ├── vehicle-details.tsx    # Vehicle details

6. Check "My Bookings" and "Profile"│   ├── booking.tsx            # Booking screen

│   ├── booking-success.tsx    # Success screen

### Testing Admin Flow│   ├── my-bookings.tsx        # User bookings

1. Login with `admin@test.com` / `admin123`│   ├── profile.tsx            # User profile

2. View dashboard statistics│   ├── _layout.tsx            # Root layout

3. Add new vehicle (with image)│   └── admin/                 # Admin screens

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
