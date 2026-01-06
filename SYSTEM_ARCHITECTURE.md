# Food Hub System Architecture

## System Overview Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                         MSBRAND FOOD HUB                            │
└─────────────────────────────────────────────────────────────────────┘

                            ┌─────────────┐
                            │  CUSTOMERS  │
                            └──────┬──────┘
                                   │
                    ┌──────────────┼──────────────┐
                    │              │              │
                    ▼              ▼              ▼
              ┌──────────┐   ┌──────────┐   ┌──────────┐
              │  BROWSE  │   │   CART   │   │ CHECKOUT │
              │ Food Hub │   │  ITEMS   │   │ DELIVERY │
              └──────────┘   └──────────┘   └──────────┘
                    │              │              │
                    └──────────────┼──────────────┘
                                   ▼
                        ┌─────────────────────┐
                        │  ORDER PLACED TO    │
                        │  FIREBASE (ORDERS)  │
                        └─────────────────────┘

                    ┌──────────────┐
                    │    SELLERS   │
                    └──────┬───────┘
                           │
            ┌──────────────┼──────────────┐
            │              │              │
            ▼              ▼              ▼
     ┌─────────────┐ ┌───────────┐ ┌──────────────┐
     │   SIGNUP    │ │ DASHBOARD │ │  ADD ITEMS   │
     │ + LOGIN     │ │  + MANAGE │ │ + TOPPINGS   │
     └─────────────┘ └───────────┘ └──────────────┘
            │              │              │
            └──────────────┼──────────────┘
                           ▼
                ┌────────────────────────┐
                │ MENU ITEMS TO FIREBASE │
                │ (FOOD MENU COLLECTION) │
                └────────────────────────┘

                    ┌──────────────┐
                    │  FIREBASE DB │
                    └──────┬───────┘
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
        ▼                  ▼                  ▼
     ┌─────────┐        ┌──────────┐      ┌──────────┐
     │  USERS  │        │   FOOD   │      │  ORDERS  │
     │ +SELLERS│        │   MENU   │      │          │
     └─────────┘        └──────────┘      └──────────┘
```

---

## Data Flow Architecture

### 1. SELLER ONBOARDING FLOW
```
Seller Signup Form
    ↓
Personal Info (name, email, phone, password)
    ↓
Restaurant Info (name, cuisine, address, city)
    ↓
OTP Verification Email
    ↓
Create Account in Firebase (users collection)
    ↓
Create Seller Profile (sellers collection)
    ↓
Seller Status: INACTIVE (waiting admin approval)
    ↓
Redirect to Seller Dashboard
```

### 2. MENU MANAGEMENT FLOW
```
Seller Dashboard
    ↓
Click "Add Item"
    ↓
Fill Item Form
  ├─ Name, Category, Image
  ├─ Pricing (Fixed OR Sizes)
  └─ Toppings (Optional)
    ↓
Submit
    ↓
Create MenuItem in Firebase
  └─ Path: foodMenu/{sellerId}/{itemId}
    ↓
Real-time Sync to UI
    ↓
Item appears in Food Hub immediately
```

### 3. CUSTOMER ORDERING FLOW
```
Browse Food Hub (/food-hub)
    ↓
View items from all active sellers
    ↓
Filter by category
    ↓
Select items & Add to Cart
    ↓
Proceed to Checkout (/checkout)
    ↓
Select Delivery Address
    ↓
IMPORTANT: Enter Distance in KM
    ↓
Delivery Charges Calculated:
  ├─ Tax = Items × 15
  ├─ Fee = Distance-based:
  │  ├─ ≤1km: FREE
  │  ├─ ≤10km: RS 75
  │  ├─ ≤15km: RS 80
  │  ├─ ≤20km: RS 95
  │  └─ 25+km: RS 250
  └─ Total = Subtotal + Tax + Fee
    ↓
Review Order Summary
    ↓
Select Payment Method (COD)
    ↓
Place Order
    ↓
Create Order in Firebase (orders collection)
    ↓
Order Confirmation Page
```

### 4. REAL-TIME SYNC ARCHITECTURE
```
┌──────────────────────────┐
│  Seller Updates Menu     │
│  (Add/Edit/Delete Item)  │
└────────────┬─────────────┘
             ↓
┌──────────────────────────┐
│  Firebase Update         │
│  (foodMenu/{...})        │
└────────────┬─────────────┘
             ↓
┌──────────────────────────┐
│  Real-time Subscription  │
│  (subscribeToFoodByCategory)
└────────────┬─────────────┘
             ↓
┌──────────────────────────┐
│  Food Hub Auto Updates   │
│  (Customer Sees Change)  │
└──────────────────────────┘
```

---

## Database Schema

### Collections & Documents

```javascript
// USERS COLLECTION
/users/{uid}
├── uid: string
├── email: string
├── name: string
├── phone: string
├── userType: "client" | "seller" | "admin" | "superadmin"
├── emailVerified: boolean
├── addresses: Address[]
├── sellerProfile: SellerProfile (if seller)
├── profilePicture: string (optional)
├── createdAt: timestamp
└── updatedAt: timestamp

// SELLERS COLLECTION
/sellers/{uid}
├── sellerId: string
├── restaurantName: string
├── cuisineType: string
├── address: string
├── city: string
├── phone: string
├── description: string
├── logo: string (optional)
├── isActive: boolean
├── registeredAt: timestamp
└── updatedAt: timestamp

// FOOD MENU COLLECTION
/foodMenu/{sellerId}/{itemId}
├── id: string
├── name: string
├── category: string
├── image: string
├── description: string (optional)
├── price: number (for fixed price items)
├── sizes: {                (for sized items)
│   Small: number,
│   Medium: number,
│   Large: number,
│   Family: number
│ }
├── toppings: [             (optional)
│   { name: string, price: number }
│ ]
├── sellerId: string
├── isAvailable: boolean
├── createdAt: timestamp
└── updatedAt: timestamp

// ORDERS COLLECTION
/orders/{orderId}
├── id: string
├── userId: string
├── items: CartItem[]
├── subtotal: number
├── tax: number
├── deliveryFee: number
├── total: number
├── addressId: string
├── paymentMethod: string
├── status: string
├── createdAt: timestamp
├── userEmail: string
├── userPhone: string
└── deliveryAddress: Address

// DELIVERY CHARGES CONFIG
/foodHub/deliveryCharges
├── taxPerItem: 15
├── baseFee: 75
├── freeDeliveryKm: 1
└── distanceBased: {
    "10km": 75,
    "15km": 80,
    "20km": 95,
    "25plus": 250
  }
```

---

## Component Architecture

```
├── Page Components
│   ├── app/food-hub/page.tsx
│   │   └── Shows menu from all sellers
│   ├── app/seller-dashboard/page.tsx
│   │   └── Main seller interface
│   ├── app/seller-dashboard/add-item/page.tsx
│   │   └── Menu item creation form
│   ├── app/seller-signup/page.tsx
│   │   └── Seller registration (uses existing SellerForm component)
│   └── app/checkout/page.tsx
│       └── Enhanced with delivery charges
│
├── Services/Hooks
│   ├── lib/auth-context.tsx
│   │   ├── useAuth() hook
│   │   ├── AuthProvider
│   │   └── Seller signup/update methods
│   ├── lib/menu-service.ts
│   │   ├── subscribeToSellerMenu()
│   │   ├── subscribeToFoodByCategory()
│   │   ├── addMenuItem()
│   │   ├── updateMenuItem()
│   │   └── deleteMenuItem()
│   ├── lib/delivery-charges.ts
│   │   ├── calculateDeliveryCharges()
│   │   └── getDeliveryFeeDescription()
│   └── lib/cart-context.tsx
│       └── useCart() hook
│
├── Existing Components (Used)
│   ├── components/navbar.tsx
│   ├── components/footer.tsx
│   ├── components/marketplace/ProductCard.tsx
│   ├── components/marketplace/MarketplaceHeader.tsx
│   └── components/seller-signup/SellerForm.tsx
│
└── API Routes
    ├── app/api/push-food-menu/route.ts
    │   └── Seed menu data to database
    └── app/api/* (existing)
        └── Various utility endpoints
```

---

## Authentication Flow

### Seller Signup Process
```
1. Form Submission
   ├─ Personal info validation
   ├─ Restaurant info validation
   └─ Password strength check

2. Firebase Auth Creation
   ├─ Create Firebase Auth user
   ├─ Generate OTP
   └─ Send via email

3. OTP Verification
   ├─ Verify OTP within 10 minutes
   ├─ Create user profile document
   ├─ Create seller profile document
   └─ Set userType = "seller"

4. Seller Status
   ├─ Initial state: isActive = false
   └─ Awaits admin approval to activate
```

### Seller Login Process
```
1. Email & Password
   ├─ Firebase Auth verification
   └─ Fetch user profile

2. Check User Type
   ├─ If userType = "seller" ✓
   ├─ Load seller profile
   └─ Redirect to dashboard

3. Dashboard Access
   ├─ Can view menu items
   ├─ Can manage items
   └─ Can view profile
```

---

## Delivery Charges Logic

### Tax Calculation
```
TAX = Number of Items × RS 15

Examples:
- 1 item: RS 15
- 3 items: RS 45
- 5 items: RS 75
```

### Delivery Fee Calculation
```
IF distance ≤ 1km
  FEE = FREE (0)
ELSE IF distance ≤ 10km
  FEE = RS 75
ELSE IF distance ≤ 15km
  FEE = RS 80
ELSE IF distance ≤ 20km
  FEE = RS 95
ELSE (25km or more)
  FEE = RS 250

TOTAL = SUBTOTAL + TAX + FEE
```

### Checkout Summary Example
```
Scenario: 3 items, 12km distance

Subtotal:      RS 1,500
Tax (3×15):    RS 45
Delivery:      RS 80 (12km bracket)
────────────────────
Total:         RS 1,625
```

---

## Security Considerations

### Implemented
- [x] Email verification via OTP
- [x] Password hashing (Firebase Auth)
- [x] Role-based access control
- [x] Protected routes
- [x] User context validation
- [x] Input validation on forms

### Recommended (Future)
- [ ] Firebase Security Rules
- [ ] Rate limiting on API endpoints
- [ ] Input sanitization
- [ ] CSRF protection
- [ ] Payment security (PCI compliance)
- [ ] Data encryption for sensitive fields

---

## Scalability Considerations

### Current Capacity
- Single Firebase Realtime Database
- No sharding or partitioning
- Real-time subscriptions to all data

### Scaling Strategy (Future)
- Partition by seller ID
- Cache frequently accessed menus
- Implement pagination
- Add database indexes
- Use Firestore for better querying
- Implement CDN for images
- Add Redis for caching

---

## Performance Optimizations

### Implemented
- [x] Real-time subscriptions (vs polling)
- [x] Component-level state management
- [x] Lazy component loading
- [x] Efficient re-renders with hooks

### Potential Improvements
- [ ] Image lazy loading
- [ ] Server-side caching
- [ ] Database query optimization
- [ ] Compression of API responses
- [ ] Code splitting by route

---

## Monitoring & Analytics (Future)

Recommend tracking:
- Seller registration rate
- Menu item creation rate
- Order volume
- Average delivery distance
- Customer satisfaction
- Popular items/categories
- Revenue by seller
- Peak usage times
