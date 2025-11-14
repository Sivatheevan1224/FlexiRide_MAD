# 🎨 FlexiRide - TailwindCSS Classes Reference

Complete reference of all Tailwind classes used throughout the FlexiRide app.

## 📐 Layout & Spacing

### Flex
```
flex-1          - Take full available space
flex-row        - Horizontal layout
flex-wrap       - Wrap items
items-center    - Center vertically
items-start     - Align to start
justify-center  - Center horizontally
justify-between - Space between items
justify-around  - Space around items
```

### Padding
```
p-2, p-3, p-4, p-6, p-8  - All sides padding
px-2, px-3, px-4, px-6   - Horizontal padding
py-2, py-3, py-4, py-6, py-8, py-12  - Vertical padding
pt-2, pt-3, pt-4, pt-6   - Top padding
pb-3, pb-6, pb-8, pb-12  - Bottom padding
pl-12                    - Left padding
pr-4                     - Right padding
```

### Margin
```
mt-1, mt-2, mt-3, mt-4, mt-6, mt-8, mt-12  - Top margin
mb-2, mb-3, mb-4, mb-6, mb-8               - Bottom margin
ml-3                                       - Left margin
mr-3                                       - Right margin
-mx-2                                      - Negative horizontal margin
```

### Gap & Space
```
space-x-1, space-x-2, space-x-3, space-x-4  - Horizontal gap
space-y-1, space-y-2, space-y-3, space-y-4, space-y-6  - Vertical gap
gap-4                                        - Grid gap
```

## 🎨 Colors

### Background Colors
```
bg-white           - White background
bg-slate-50        - Very light gray
bg-slate-100       - Light gray
bg-slate-200       - Gray
bg-blue-50         - Very light blue
bg-blue-100        - Light blue
bg-blue-600        - Primary blue (#2563eb)
bg-blue-700        - Darker blue (active state)
bg-green-50        - Very light green
bg-green-100       - Light green
bg-green-500       - Green
bg-yellow-100      - Light yellow
bg-yellow-500      - Yellow
bg-red-50          - Very light red
bg-red-100         - Light red
bg-red-500         - Red
bg-purple-100      - Light purple
bg-purple-500      - Purple
bg-purple-600      - Dark purple
bg-orange-100      - Light orange
bg-orange-600      - Orange
bg-transparent     - Transparent
bg-white/20        - White with 20% opacity
bg-white/90        - White with 90% opacity
```

### Text Colors
```
text-white         - White text
text-neutral-400   - Light gray text
text-neutral-500   - Gray text
text-neutral-600   - Medium gray text
text-neutral-700   - Dark gray text
text-neutral-800   - Very dark gray text
text-blue-100      - Light blue text
text-blue-200      - Lighter blue text
text-blue-600      - Primary blue text
text-blue-700      - Dark blue text
text-green-600     - Green text
text-green-700     - Dark green text
text-yellow-600    - Yellow text
text-yellow-700    - Dark yellow text
text-red-500       - Red text
text-red-600       - Dark red text
text-orange-700    - Orange text
text-slate-500     - Slate text
```

### Border Colors
```
border-slate-100   - Very light border
border-slate-200   - Light border
border-slate-300   - Gray border
border-blue-600    - Blue border
border-red-500     - Red border
border-t           - Top border only
```

## 📏 Sizing

### Width
```
w-10, w-12, w-14, w-20, w-24  - Fixed width
w-full                         - 100% width
w-1/2                          - 50% width
w-px                           - 1px width
```

### Height
```
h-10, h-14, h-20, h-24, h-40, h-48, h-72  - Fixed height
h-full                                     - 100% height
h-4                                        - Spacer height
```

### Min/Max
```
min-h-screen    - Minimum full screen height
max-w-xs        - Maximum extra small width
```

## 🔤 Typography

### Font Size
```
text-xs     - 12px
text-sm     - 14px
text-base   - 16px
text-lg     - 18px
text-xl     - 20px
text-2xl    - 24px
text-3xl    - 30px
text-4xl    - 36px
```

### Font Weight
```
font-medium    - 500 weight
font-semibold  - 600 weight
font-bold      - 700 weight
```

### Text Alignment
```
text-center    - Center aligned
text-left      - Left aligned
text-right     - Right aligned
```

### Text Transform
```
capitalize     - Capitalize first letter
uppercase      - All caps
```

### Text Decoration
```
underline      - Underlined text
```

### Line Height
```
leading-6      - Line height 1.5rem
```

## 🎯 Borders & Radius

### Border Radius
```
rounded-lg     - 8px radius
rounded-xl     - 12px radius
rounded-full   - Fully rounded (circle/pill)
rounded-b-3xl  - Bottom rounded extra large
rounded-t-3xl  - Top rounded extra large
```

### Border Width
```
border         - 1px border
border-2       - 2px border
border-4       - 4px border
border-t       - Top border only
```

### Border Style
```
border-dashed  - Dashed border
border-solid   - Solid border (default)
```

## 🌟 Effects

### Shadow
```
shadow-md      - Medium shadow
shadow-lg      - Large shadow
```

### Opacity
```
opacity-50     - 50% opacity
opacity-70     - 70% opacity
opacity-90     - 90% opacity
```

### Overflow
```
overflow-hidden  - Hide overflow
```

## 🎭 States

### Active
```
active:bg-blue-700   - Background on press
active:bg-slate-50   - Background on press
```

### Disabled
```
opacity-50          - Disabled appearance
```

## 📱 Position

### Position Type
```
relative       - Relative positioning
absolute       - Absolute positioning
```

### Placement
```
top-0, top-4   - Top position
bottom-0       - Bottom position
left-0, left-4 - Left position
right-0, right-4 - Right position
```

### Z-Index
```
z-10          - Z-index 10
```

## 🎬 Display & Visibility

### Display
```
hidden        - Display none
```

## 📦 Common Component Patterns

### Button (Primary)
```tsx
className="bg-blue-600 py-3 px-6 rounded-xl active:bg-blue-700"
```

### Button (Outline)
```tsx
className="bg-transparent border-2 border-blue-600 py-3 px-6 rounded-xl"
```

### Input Field
```tsx
className="bg-white border border-slate-300 rounded-xl px-4 py-3.5 text-neutral-800"
```

### Card
```tsx
className="bg-white rounded-xl shadow-md p-4"
```

### Header (Blue)
```tsx
className="bg-blue-600 px-6 pt-6 pb-8 rounded-b-3xl"
```

### Section Title
```tsx
className="text-neutral-800 text-xl font-bold mb-4"
```

### Badge (Status)
```tsx
className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-medium"
```

### Icon Button
```tsx
className="bg-white/20 rounded-full p-2"
```

### Tab (Active)
```tsx
className="px-6 py-2 rounded-full bg-blue-600 text-white font-semibold"
```

### Tab (Inactive)
```tsx
className="px-6 py-2 rounded-full bg-white text-neutral-600 font-semibold"
```

### Bottom Navigation
```tsx
className="bg-white border-t border-slate-200 px-6 py-3"
```

### Nav Item (Active)
```tsx
className="items-center text-blue-600 text-xs mt-1 font-medium"
```

### Nav Item (Inactive)
```tsx
className="items-center text-neutral-500 text-xs mt-1"
```

## 🎨 Custom Color Classes

Defined in `tailwind.config.js`:

```javascript
colors: {
  primary: '#2563eb',    // bg-primary, text-primary
  secondary: '#64748b',  // bg-secondary, text-secondary
}
```

Usage:
```tsx
className="bg-primary"      // Same as bg-blue-600
className="text-primary"    // Same as text-blue-600
```

## 📋 Complete Examples

### Screen Container
```tsx
<SafeAreaView className="flex-1 bg-slate-50">
  <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
    <View className="px-6 py-6 space-y-6">
      {/* Content */}
    </View>
  </ScrollView>
</SafeAreaView>
```

### Card with Content
```tsx
<View className="bg-white rounded-xl shadow-md p-4">
  <Text className="text-neutral-800 font-semibold text-lg mb-4">
    Title
  </Text>
  <View className="space-y-3">
    {/* Card content */}
  </View>
</View>
```

### Form Input with Icon
```tsx
<View className="space-y-2">
  <Text className="text-neutral-700 font-medium text-base">Label</Text>
  <View className="relative">
    <Ionicons name="mail-outline" size={20} color="#64748b" />
    <TextInput
      className="bg-white border border-slate-300 rounded-xl px-4 py-3.5 pl-12 text-neutral-800"
      placeholder="Enter email"
      placeholderTextColor="#94a3b8"
    />
  </View>
</View>
```

### Status Badge
```tsx
<View className="px-3 py-1 rounded-full bg-green-100">
  <Text className="text-green-700 text-xs font-medium capitalize">
    Available
  </Text>
</View>
```

### Icon with Background
```tsx
<View className="bg-blue-600 w-14 h-14 rounded-xl items-center justify-center">
  <Ionicons name="car-sport" size={28} color="#ffffff" />
</View>
```

### Flex Row with Space Between
```tsx
<View className="flex-row justify-between items-center">
  <Text className="text-neutral-800 font-semibold">Left</Text>
  <Text className="text-blue-600 font-bold">Right</Text>
</View>
```

### Grid Layout (2 columns)
```tsx
<View className="flex-row flex-wrap -mx-2">
  <View className="w-1/2 px-2 mb-4">
    {/* Item 1 */}
  </View>
  <View className="w-1/2 px-2 mb-4">
    {/* Item 2 */}
  </View>
</View>
```

## 🔍 Tips for Usage

1. **Consistent Spacing**: Use multiples of 4 (p-4, p-6, p-8)
2. **Color Hierarchy**: neutral-800 for primary text, neutral-600 for secondary
3. **Rounded Corners**: Use rounded-xl for cards and buttons
4. **Blue Primary**: Always use blue-600 for primary actions
5. **Shadows**: Use shadow-md for cards
6. **Active States**: Add active: states for touch feedback
7. **Spacing System**: Use space-y-* for vertical spacing
8. **Icon Sizes**: 20-24px for UI, 40+ for headers

---

**Reference this guide when building new components to maintain consistency! 🎨**
