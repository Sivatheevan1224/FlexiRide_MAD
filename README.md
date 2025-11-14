# FlexiRide - Car & Bike Rental System# FlexiRide - Car & Bike Rental System# FlexiRide - Car & Bike Rental System



A modern, clean, and minimal mobile application for car and bike rentals built with React Native, Expo, and NativeWind (TailwindCSS).



## 🚀 FeaturesA modern, clean, and minimal mobile application for car and bike rentals built with React Native, Expo, and NativeWind (TailwindCSS).A modern, clean, and minimal mobile application for car and bike rentals built with React Native, Expo, and NativeWind (TailwindCSS).



### User Features

- **Welcome Screen** - Landing page with auto-sliding image carousel

- **Authentication** - Signup and Login screens with demo credentials## 🚀 Features## 🚀 Features

- **Home Screen** - Browse vehicles with search and filter (All/Cars/Bikes)

- **Vehicle Details** - View detailed specs, select dates, and book

- **Booking System** - Easy booking flow with price calculation

- **My Bookings** - Track bookings with status indicators### User Features### User Features

- **User Profile** - Manage account and settings

- **Welcome Screen** - Landing page with features and "Get Started" button- **Splash Screen** - Clean animated splash screen with app logo

### Admin Features

- **Admin Dashboard** - Statistics overview with quick actions- **Authentication** - Signup and Login screens with demo credentials- **Authentication** - Signup and Login screens with form validation

- **Add Vehicle** - Add new vehicles with image upload

- **Manage Vehicles** - View, edit, and delete vehicles (with local images)- **Home Screen** - Browse vehicles with search and filter (All/Cars/Bikes)- **Home Screen** - Browse available vehicles with search and filter options

- **View Bookings** - Manage all bookings with approve/reject

- **Vehicle Details** - View detailed specs, select dates, and book- **Vehicle Details** - View detailed information about vehicles with specs

## 🎨 Design Features

- **Booking System** - Easy booking flow with price calculation- **Booking System** - Easy booking flow with date selection and price calculation

- ✅ Clean & Modern UI with TailwindCSS

- ✅ Rounded components (rounded-xl, rounded-full)- **My Bookings** - Track bookings with status indicators- **My Bookings** - Track all your bookings with status indicators

- ✅ Proper spacing (p-4, space-y-3, gap-4)

- ✅ Card layouts with shadows- **User Profile** - Manage account and settings- **User Profile** - Manage account information and settings

- ✅ Blue theme (#2563eb) with neutral accents

- ✅ Auto-sliding image carousel on welcome screen

- ✅ Mobile-first responsive design

- ✅ Web-optimized with device frame simulation### Admin Features### Admin Features

- ✅ Ionicons throughout

- **Admin Dashboard** - Statistics overview with quick actions- **Admin Dashboard** - Overview of all system statistics

## 📱 Quick Start

- **Add Vehicle** - Add new vehicles with image upload- **Add Vehicle** - Add new vehicles with image upload

### Installation

```bash- **Manage Vehicles** - View, edit, and delete vehicles- **Manage Vehicles** - View, edit, and delete vehicles

npm install

```- **View Bookings** - Manage all bookings with approve/reject- **View Bookings** - Manage all user bookings with approval system



### Run on Mobile (Recommended)

```bash

npm start## 🎨 Design Features## 🎨 Design Features

# Then scan QR code with Expo Go app

# Or press 'a' for Android, 'i' for iOS

```

- ✅ Clean & Modern UI with TailwindCSS- **Clean & Modern UI** - Minimal design with TailwindCSS styling

### Run on Web (Desktop Preview)

```bash- ✅ Rounded components (rounded-xl, rounded-full)- **Rounded Components** - Smooth rounded corners throughout

npm start

# Press 'w' to open in browser- ✅ Proper spacing (p-4, space-y-3, gap-4)- **Proper Spacing** - Consistent padding and margins using Tailwind spacing

# App displays in mobile-centered view with device frame

```- ✅ Card layouts with shadows- **Card Layouts** - Beautiful card-based designs with shadows



### Platform Support- ✅ Blue theme (#2563eb) with neutral accents- **Color Scheme** - Blue primary color (#2563eb) with neutral accents

- ✅ **iOS** - Optimized for iPhone & iPad

- ✅ **Android** - Optimized for all Android devices  - ✅ Mobile-first responsive design- **Responsive** - Mobile-first design optimized for all screen sizes

- ✅ **Web** - Desktop preview with mobile simulation

- ✅ Ionicons throughout- **Icons** - Ionicons for clean, consistent iconography

**Best experience:** Physical mobile devices or emulators



### Test Credentials

**User Login:**## 📱 Quick Start## 📱 Screens

- Email: `user@test.com`

- Password: `password123`



**Admin Login:**### Installation### Authentication

- Email: `admin@test.com`

- Password: `admin123````bash- ✅ Splash Screen (`app/index.tsx`)



## 📱 Screens (13 Total)npm install- ✅ Signup Screen (`app/signup.tsx`)



### Authentication (3)npm start- ✅ Login Screen (`app/login.tsx`)

- Welcome Screen with Image Slider (`app/index.tsx`)

- Login (`app/login.tsx`)```

- Signup (`app/signup.tsx`)

### User Screens

### User Screens (6)

- Home (`app/home.tsx`)### Test Credentials- ✅ Home Screen (`app/home.tsx`)

- Vehicle Details (`app/vehicle-details.tsx`)

- Booking (`app/booking.tsx`)**User Login:**- ✅ Vehicle Details (`app/vehicle-details.tsx`)

- Booking Success (`app/booking-success.tsx`)

- My Bookings (`app/my-bookings.tsx`)- Email: `user@test.com`- ✅ Booking Screen (`app/booking.tsx`)

- Profile (`app/profile.tsx`)

- Password: `password123`- ✅ Booking Success (`app/booking-success.tsx`)

### Admin Screens (4)

- Dashboard (`app/admin/home.tsx`)- ✅ My Bookings (`app/my-bookings.tsx`)

- Add Vehicle (`app/admin/add-vehicle.tsx`)

- Manage Vehicles (`app/admin/manage-vehicles.tsx`)**Admin Login:**- ✅ Profile Screen (`app/profile.tsx`)

- View Bookings (`app/admin/view-bookings.tsx`)

- Email: `admin@test.com`

## 🧩 UI Components

- Password: `admin123`### Admin Screens

Located in `components/ui/`:

- ✅ Admin Home (`app/admin/home.tsx`)

- **Button** - 3 variants (primary, secondary, outline), 3 sizes, loading state

- **Input** - Icons, validation, password toggle, multiline support## 📱 Screens (13 Total)- ✅ Add Vehicle (`app/admin/add-vehicle.tsx`)

- **Card** - Flexible padding (sm, md, lg) with shadows

- **VehicleCard** - Vehicle display with image, specs, and price- ✅ Manage Vehicles (`app/admin/manage-vehicles.tsx`)

- **BookingCard** - Booking info with status badges

- **PlatformImage** - Smart image loading for web and mobile### Authentication (3)- ✅ View Bookings (`app/admin/view-bookings.tsx`)



## 🛠️ Tech Stack- Welcome Screen (`app/index.tsx`)



- React Native 0.81.5- Login (`app/login.tsx`)## 🧩 Reusable Components

- Expo ~54.0.23

- Expo Router ~6.0.14 (File-based routing)- Signup (`app/signup.tsx`)

- NativeWind v2.0.11 (TailwindCSS for RN)

- TypeScript ~5.9.2All components are located in `components/ui/`:

- Expo Image Picker

- React Native DateTime Picker### User Screens (6)



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
