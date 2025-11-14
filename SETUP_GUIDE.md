# 🚀 FlexiRide - Quick Setup Guide

## Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo Go app on your mobile device (for testing)
- Android Studio / Xcode (optional, for emulators)

## Step-by-Step Setup

### 1. Install Dependencies
```bash
npm install
```

This installs:
- React Native & Expo
- NativeWind & TailwindCSS
- Expo Router
- Expo Image Picker
- React Native DateTime Picker
- All other required packages

### 2. Start the Development Server
```bash
npm start
```

Or use specific commands:
```bash
npm run android   # Run on Android
npm run ios       # Run on iOS
npm run web       # Run on web browser
```

### 3. Scan QR Code
- Open Expo Go app on your mobile
- Scan the QR code from the terminal
- App will load on your device

## 📱 Testing the App

### User Flow
1. **Splash Screen** → Auto-redirects after 2 seconds
2. **Login Screen** → Enter any email and password
3. **Home Screen** → Browse vehicles, use search, switch tabs
4. **Vehicle Details** → Tap any vehicle card
5. **Booking** → Select dates and confirm
6. **Success** → View confirmation
7. **My Bookings** → See all bookings
8. **Profile** → View user information

### Admin Flow
1. **Login** → Use email with "admin" (e.g., admin@test.com)
2. **Admin Dashboard** → View statistics
3. **Add Vehicle** → Upload image and fill form
4. **Manage Vehicles** → Edit/delete vehicles
5. **View Bookings** → Approve/reject bookings

## 🎨 Key Features Implemented

### ✅ Authentication
- Clean login/signup screens
- Password visibility toggle
- Social login buttons (UI only)
- Forgot password link

### ✅ User Screens
- Vehicle browsing with filters (All/Cars/Bikes)
- Search functionality
- Detailed vehicle information
- Date selection for bookings
- Price calculation
- Booking history with status
- User profile management

### ✅ Admin Panel
- Statistics dashboard
- Vehicle management (CRUD)
- Booking approval system
- Activity feed

### ✅ UI Components
- **Button** - 3 variants (primary, secondary, outline), 3 sizes
- **Input** - Icons, validation, password toggle, multiline
- **Card** - Flexible container with shadow
- **VehicleCard** - Vehicle display with image, specs, price
- **BookingCard** - Booking info with status badges

## 🎯 Styling Guidelines Used

### TailwindCSS Classes
- **Spacing**: `p-4`, `px-6`, `py-3`, `space-y-4`, `gap-4`
- **Rounded**: `rounded-xl`, `rounded-full`, `rounded-lg`
- **Colors**: `bg-blue-600`, `text-white`, `text-neutral-700`
- **Shadows**: `shadow-md`, `shadow-lg`
- **Flex**: `flex-row`, `items-center`, `justify-between`

### Design Tokens
- Primary: Blue (#2563eb)
- Background: Slate-50 (#f8fafc)
- Text: Neutral-800 (#1f2937)
- Border radius: 12px (rounded-xl)
- Card shadow: md

## 📂 File Structure Overview

```
app/
├── index.tsx              ← Splash (entry point)
├── login.tsx              ← Login screen
├── signup.tsx             ← Signup screen
├── home.tsx               ← Main dashboard
├── vehicle-details.tsx    ← Vehicle info
├── booking.tsx            ← Booking flow
├── booking-success.tsx    ← Success message
├── my-bookings.tsx        ← User bookings
├── profile.tsx            ← User profile
├── _layout.tsx            ← Navigation config
└── admin/
    ├── home.tsx           ← Admin dashboard
    ├── add-vehicle.tsx    ← Add new vehicle
    ├── manage-vehicles.tsx ← Vehicle management
    └── view-bookings.tsx  ← Booking management

components/ui/
├── button.tsx             ← Reusable button
├── input.tsx              ← Form input
├── card.tsx               ← Card container
├── vehicle-card.tsx       ← Vehicle display
└── booking-card.tsx       ← Booking display
```

## 🔧 Troubleshooting

### Issue: NativeWind styles not working
**Solution**: Make sure `global.css` is imported in `_layout.tsx` and restart the dev server.

### Issue: Navigation errors
**Solution**: The TypeScript errors for routes are expected during development. They'll resolve as you navigate through the app.

### Issue: Images not loading
**Solution**: Using placeholder URLs from Unsplash. Replace with your own images for production.

### Issue: Date picker not working
**Solution**: DateTime picker implementation is basic. For production, use a proper date picker library.

## 🎨 Customization

### Change Primary Color
Edit `tailwind.config.js`:
```js
theme: {
  extend: {
    colors: {
      primary: '#your-color-here',
    },
  },
}
```

### Modify Button Styles
Edit `components/ui/button.tsx` and adjust the variant styles.

### Update Vehicle Data
Currently using mock data. Replace with API calls:
```tsx
// In home.tsx
const fetchVehicles = async () => {
  const response = await fetch('your-api-url/vehicles');
  const data = await response.json();
  setVehicles(data);
};
```

## 📱 Building for Production

### Android APK
```bash
expo build:android
```

### iOS IPA
```bash
expo build:ios
```

### Web
```bash
npm run web
```

## 🚀 Next Steps

1. **Backend Integration**: Connect to a real API
2. **Authentication**: Implement JWT or Firebase Auth
3. **Database**: Set up vehicle and booking storage
4. **Payment**: Integrate payment gateway
5. **Testing**: Add unit and integration tests
6. **Deployment**: Deploy to App Store / Play Store

## 💡 Tips

- Use TypeScript interfaces for type safety
- Keep components small and focused
- Reuse UI components wherever possible
- Test on both iOS and Android
- Follow the existing design patterns
- Add loading states for async operations
- Handle errors gracefully

## 📞 Need Help?

Check the main README for detailed documentation or:
- Review component examples in `/components/ui/`
- Look at screen implementations in `/app/`
- Check Expo docs: https://docs.expo.dev/
- NativeWind docs: https://www.nativewind.dev/

---

**Everything is ready to go! Just run `npm start` and start building! 🎉**
