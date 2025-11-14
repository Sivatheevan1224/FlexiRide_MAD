# 🧩 FlexiRide - Component Architecture

## Component Hierarchy

```
FlexiRide App
│
├── 📱 Root Layout (app/_layout.tsx)
│   └── Stack Navigator (Expo Router)
│       │
│       ├── 🎬 Splash Screen (index.tsx)
│       │
│       ├── 🔐 Authentication
│       │   ├── Login (login.tsx)
│       │   └── Signup (signup.tsx)
│       │
│       ├── 👤 User Screens
│       │   ├── Home (home.tsx)
│       │   │   ├── VehicleCard × N
│       │   │   └── Bottom Navigation
│       │   │
│       │   ├── Vehicle Details (vehicle-details.tsx)
│       │   │   ├── Card (specs)
│       │   │   ├── Card (description)
│       │   │   ├── Card (dates)
│       │   │   └── Button (book now)
│       │   │
│       │   ├── Booking (booking.tsx)
│       │   │   ├── Card (vehicle)
│       │   │   ├── Card (details)
│       │   │   ├── Card (pricing)
│       │   │   ├── Card (payment)
│       │   │   └── Button (confirm)
│       │   │
│       │   ├── Booking Success (booking-success.tsx)
│       │   │   └── Button × 2
│       │   │
│       │   ├── My Bookings (my-bookings.tsx)
│       │   │   ├── BookingCard × N
│       │   │   └── Bottom Navigation
│       │   │
│       │   └── Profile (profile.tsx)
│       │       ├── Card (stats)
│       │       ├── Card (contact)
│       │       ├── Card (menu)
│       │       ├── Button (logout)
│       │       └── Bottom Navigation
│       │
│       └── 👨‍💼 Admin Screens
│           ├── Admin Home (admin/home.tsx)
│           │   ├── Card × 4 (stats)
│           │   ├── Card × 4 (actions)
│           │   └── Card (activity)
│           │
│           ├── Add Vehicle (admin/add-vehicle.tsx)
│           │   ├── Card (image)
│           │   ├── Card (basic info)
│           │   ├── Card (specs)
│           │   ├── Card (description)
│           │   └── Button (save)
│           │
│           ├── Manage Vehicles (admin/manage-vehicles.tsx)
│           │   └── Card × N (vehicles)
│           │       ├── Button (edit)
│           │       └── Button (delete)
│           │
│           └── View Bookings (admin/view-bookings.tsx)
│               ├── Card (stats)
│               └── BookingCard × N
│                   ├── Button (approve)
│                   └── Button (reject)
```

## 🧩 Reusable Components

### 1. Button Component
```tsx
<Button
  title="Click Me"
  onPress={handlePress}
  variant="primary"    // primary | secondary | outline
  size="md"            // sm | md | lg
  loading={false}
  disabled={false}
/>
```

**Props:**
- `title` (string) - Button text
- `onPress` (function) - Click handler
- `variant` (string) - Style variant
- `size` (string) - Size option
- `loading` (boolean) - Show loading spinner
- `disabled` (boolean) - Disable button
- `className` (string) - Additional Tailwind classes

**Used in:** All screens with actions

---

### 2. Input Component
```tsx
<Input
  label="Email"
  placeholder="Enter your email"
  value={email}
  onChangeText={setEmail}
  keyboardType="email-address"
  icon="mail-outline"
  secureTextEntry={false}
  error="Invalid email"
/>
```

**Props:**
- `label` (string) - Field label
- `placeholder` (string) - Placeholder text
- `value` (string) - Input value
- `onChangeText` (function) - Change handler
- `keyboardType` (string) - Keyboard type
- `icon` (string) - Ionicons name
- `secureTextEntry` (boolean) - Password field
- `multiline` (boolean) - Multiline input
- `numberOfLines` (number) - Lines for multiline
- `error` (string) - Error message
- `className` (string) - Additional classes

**Used in:** Login, Signup, Add Vehicle, Profile

---

### 3. Card Component
```tsx
<Card padding="md" className="mb-4">
  <Text>Card Content</Text>
</Card>
```

**Props:**
- `children` (ReactNode) - Card content
- `padding` (string) - sm | md | lg
- `className` (string) - Additional classes

**Features:**
- White background
- Rounded corners (rounded-xl)
- Shadow (shadow-md)
- Flexible padding

**Used in:** All screens for content grouping

---

### 4. VehicleCard Component
```tsx
<VehicleCard
  vehicle={{
    id: '1',
    name: 'Honda City',
    type: 'car',
    price: 1500,
    image: 'url',
    fuel: 'Petrol',
    gear: 'Automatic',
    rating: 4.8
  }}
  onPress={() => navigate()}
/>
```

**Props:**
- `vehicle` (Vehicle) - Vehicle object
- `onPress` (function) - Press handler
- `className` (string) - Additional classes

**Features:**
- Vehicle image (16:9 aspect)
- Name and rating
- Fuel and gear specs with icons
- Price per day prominent
- "Book Now" button
- Touch feedback

**Used in:** Home Screen

---

### 5. BookingCard Component
```tsx
<BookingCard
  booking={{
    id: '1',
    vehicleName: 'Honda City',
    vehicleImage: 'url',
    pickupDate: '15 Nov 2025',
    returnDate: '20 Nov 2025',
    totalPrice: 7600,
    status: 'confirmed'
  }}
/>
```

**Props:**
- `booking` (Booking) - Booking object
- `className` (string) - Additional classes

**Features:**
- Booking ID display
- Status badge (color-coded)
- Vehicle thumbnail
- Pickup and return dates with icons
- Total price
- Responsive layout

**Used in:** My Bookings, Admin View Bookings

---

## 🎨 Design Patterns

### Screen Pattern
```tsx
<SafeAreaView className="flex-1 bg-slate-50">
  <ScrollView className="flex-1">
    {/* Header Section */}
    <View className="bg-blue-600 px-6 pt-6 pb-8 rounded-b-3xl">
      <Text className="text-white text-2xl font-bold">Title</Text>
    </View>

    {/* Content Section */}
    <View className="px-6 py-6 space-y-6">
      <Card>
        {/* Card Content */}
      </Card>
    </View>
  </ScrollView>
</SafeAreaView>
```

### Form Pattern
```tsx
<View className="space-y-4">
  <Input
    label="Field Name"
    placeholder="Enter value"
    value={value}
    onChangeText={setValue}
    icon="icon-name"
  />
  
  <Button
    title="Submit"
    onPress={handleSubmit}
    size="lg"
    loading={loading}
  />
</View>
```

### List Pattern
```tsx
<View className="space-y-4">
  {items.map((item) => (
    <Card key={item.id}>
      {/* Item Content */}
    </Card>
  ))}
</View>
```

### Bottom Navigation Pattern
```tsx
<View className="bg-white border-t border-slate-200 px-6 py-3">
  <View className="flex-row justify-between items-center">
    <TouchableOpacity className="items-center">
      <Ionicons name="home" size={24} color="#2563eb" />
      <Text className="text-blue-600 text-xs mt-1 font-medium">Home</Text>
    </TouchableOpacity>
    {/* More tabs... */}
  </View>
</View>
```

## 📊 Component Usage Map

```
Button Component
├── Used in 13+ locations
├── Login/Signup screens
├── All booking flows
├── Profile actions
└── Admin actions

Input Component
├── Used in 20+ locations
├── All forms
├── Search bars
└── Filter inputs

Card Component
├── Used in 50+ locations
├── Content grouping
├── Information display
└── Section containers

VehicleCard Component
├── Used in 2 locations
├── Home screen (grid)
└── Search results

BookingCard Component
├── Used in 2 locations
├── My Bookings screen
└── Admin Bookings view
```

## 🔄 Data Flow

```
User Action → Component Event → State Update → UI Re-render

Example: Booking Flow
1. User clicks "Book Now" on VehicleCard
2. onPress handler navigates to Vehicle Details
3. User selects dates in Vehicle Details
4. State updates with selected dates
5. User clicks "Book Now" button
6. Navigation to Booking screen with params
7. Booking screen displays data
8. User confirms booking
9. Success screen shows confirmation
10. Navigation to My Bookings
```

## 🎯 Props Interface Examples

### Vehicle Interface
```typescript
interface Vehicle {
  id: string;
  name: string;
  type: 'car' | 'bike';
  price: number;
  image: string;
  fuel: string;
  gear: string;
  rating?: number;
}
```

### Booking Interface
```typescript
interface Booking {
  id: string;
  vehicleName: string;
  vehicleImage: string;
  pickupDate: string;
  returnDate: string;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}
```

### Button Props
```typescript
interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}
```

## 🧪 Component Testing Guide

### Button Tests
- Renders with correct title
- Handles press events
- Shows loading state
- Respects disabled state
- Applies variant styles

### Input Tests
- Renders with label
- Handles text changes
- Shows/hides password
- Displays error messages
- Respects keyboard types

### Card Tests
- Renders children
- Applies padding correctly
- Shows shadow
- Accepts custom classes

### VehicleCard Tests
- Displays vehicle data
- Handles press events
- Shows rating correctly
- Formats price

### BookingCard Tests
- Displays booking info
- Shows correct status badge
- Formats dates
- Shows price

## 📦 Import Examples

### Named Imports
```tsx
import { Button, Input, Card } from '../components/ui';
```

### Individual Imports
```tsx
import Button from '../components/ui/button';
import Input from '../components/ui/input';
import Card from '../components/ui/card';
```

### With Vehicle/Booking Cards
```tsx
import VehicleCard, { Vehicle } from '../components/ui/vehicle-card';
import BookingCard, { Booking } from '../components/ui/booking-card';
```

## 🎨 Styling Consistency

All components follow these rules:
- ✅ TailwindCSS classes only
- ✅ No inline styles
- ✅ Consistent spacing (multiples of 4)
- ✅ Blue primary color (#2563eb)
- ✅ Rounded corners (rounded-xl)
- ✅ Shadow for elevation (shadow-md)
- ✅ Neutral color palette for text
- ✅ Touch feedback on interactive elements

---

**This architecture ensures maintainability, reusability, and consistency! 🏗️**
