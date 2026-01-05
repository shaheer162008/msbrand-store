# Quick Start Guide - MS Brand Store

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation & Setup

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open in browser
http://localhost:3000
```

---

## 📋 Features Overview

### ✅ Completed
1. **Product Database** - 30 products with full details (Food, Grocery, Pharmacy)
2. **Category Pages** - Food Hub, Grocery Hub, Pharmacy Hub with filters
3. **Product Details** - Full product page with images, options, and reviews
4. **Flash Deals** - Homepage deals section with countdown timer
5. **Authentication** - Local login/signup (Client & Admin)
6. **Client Profile** - Multiple addresses, phone management
7. **Admin Dashboard** - Order management, status tracking

### 🔄 In Progress / TODO
- Real-time order notifications
- WhatsApp integration
- Firebase/MongoDB setup
- Payment integration
- OTP email verification

---

## 🎯 How to Test Features

### 1. **Browse Products**
```
Home → Food Hub / Grocery Hub / Pharmacy Hub
- Use search bar to find products
- Filter by price, rating, or deals
- Click on product to see details
```

### 2. **View Flash Deals**
```
Home Page → Flash Deals Section
- See countdown timer
- View discounted products
- Add to cart from deals section
```

### 3. **Product Detail Page**
```
Click any product → See:
- Multiple product images
- Price with discount calculation
- Available options (select from dropdown)
- Quantity selector
- Add to cart button
- Coupon code display
```

### 4. **Authentication Test**

**Create Customer Account:**
```
1. Go to /signup
2. Enter email, password, name
3. Select "Customer" as user type
4. Sign up (you'll be auto-logged in)
5. Visit /profile to see your profile
```

**Create Admin Account:**
```
1. Go to /signup
2. Enter email, password, name
3. Select "Admin" as user type
4. Sign up
5. You can now access /admin-dashboard
```

**Login Later:**
```
1. Go to /login
2. Select user type (Customer or Admin)
3. Enter your email and password
4. Click "Sign In"
```

### 5. **Admin Dashboard**
```
Admin Login → /admin-dashboard
- See pending/confirmed/completed orders count
- View all orders in table
- Click "View" to see order details
- Confirm pending orders
- Mark confirmed orders as completed
- See notifications for pending orders
```

### 6. **Client Profile**
```
Customer Login → Click "My Profile"
- View profile information
- See and manage saved addresses
- Add new address
- Edit/Delete existing addresses
- Set default address
- Phone number management
```

---

## 📁 File Structure Reference

### Key Files
```
lib/
├── products.json          # All products data
├── auth-context.tsx       # Auth state management

app/
├── page.tsx              # Homepage
├── login/page.tsx        # Login page
├── signup/page.tsx       # Signup page
├── profile/page.tsx      # Client profile
├── admin-dashboard/page.tsx # Admin panel
├── food-hub/page.tsx     # Food products
├── grocery-hub/page.tsx  # Grocery products
├── pharmacy-hub/page.tsx # Pharmacy products
└── product/[id]/page.tsx # Product details

components/
├── marketplace/ProductCard.tsx
├── home/FlashDeals.tsx
└── ... (other components)
```

---

## 🔐 Authentication Details

### User Types
1. **Client** - Regular customer who can:
   - Browse products
   - Add to cart
   - Manage profile and addresses
   - View orders (when implemented)

2. **Admin** - Store admin who can:
   - View all orders
   - Confirm/reject orders
   - Track order status
   - See real-time notifications

### Local Storage Keys
- `user` - Current logged-in user
- `registeredUsers` - All registered users
- `orders` - Order history (for admin)

### Demo Test Account
```
Email: test@example.com
Password: password123
```
*Create this account through signup process*

---

## 💾 Data Storage

**Current**: LocalStorage (Browser storage)
- User accounts stored in browser
- Data persists on same device
- Clears when browser data is cleared

**Next Phase**: Firebase or MongoDB
- Cloud storage
- Multi-device sync
- Real-time updates

---

## 🎨 Theming

### Color Schemes by Category
- **Food Hub**: Orange (#FF6B35) to Red (#E63946)
- **Grocery Hub**: Green (#2A9D8F) to Emerald (#06A77D)
- **Pharmacy Hub**: Blue (#0088CC) to Cyan (#00D4FF)

### Responsive Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

---

## 📱 Mobile Responsiveness

All pages are fully responsive:
- ✅ Sidebar navigation adapts
- ✅ Product grid adjusts columns
- ✅ Forms are touch-friendly
- ✅ Images scale properly
- ✅ Tables become horizontal scroll on mobile

---

## 🧪 Testing Scenarios

### Scenario 1: Browse Food & Add to Cart
```
1. Go to Home
2. Click "Food Hub"
3. Search for "Biryani"
4. Click on product
5. Select options
6. Set quantity to 2
7. Click "Add to Cart"
8. See success message
```

### Scenario 2: Create Account & Update Profile
```
1. Go to /signup
2. Create customer account
3. After signup, you're in /profile
4. Click "Add Address"
5. Fill address form
6. Save address
7. Set it as default
```

### Scenario 3: Admin Order Management
```
1. Create admin account via signup
2. Login as admin
3. Go to /admin-dashboard
4. See pending orders
5. Click "View" on an order
6. Click "Confirm Order"
7. Later click "Mark as Completed"
```

---

## 🐛 Common Issues & Solutions

### Issue: Products not showing
**Solution**: Ensure `lib/products.json` is not deleted

### Issue: Authentication not working
**Solution**: Check browser's LocalStorage is enabled

### Issue: Images not loading
**Solution**: Images are from Unsplash, need internet connection

### Issue: Sidebar not toggling on mobile
**Solution**: Refresh page and try again

---

## 🚀 Next Steps (Phase 2)

### Short Term
1. [ ] Email OTP verification
2. [ ] Real-time order notifications
3. [ ] WhatsApp integration
4. [ ] Shopping cart page
5. [ ] Checkout process

### Medium Term
1. [ ] Firebase authentication
2. [ ] Firestore database
3. [ ] Payment gateway (Stripe/PayPal)
4. [ ] Order history
5. [ ] Review & ratings

### Long Term
1. [ ] Seller dashboard
2. [ ] Inventory management
3. [ ] Analytics & reports
4. [ ] Mobile app
5. [ ] Advanced search & filters

---

## 📞 Support

For issues or questions:
1. Check [PROJECT_STATUS.md](PROJECT_STATUS.md)
2. Review the code comments
3. Check browser console for errors

---

## 📝 Notes

- All product images are from Unsplash (free, open source)
- Phone verification is UI-only (backend integration pending)
- Coupon codes are in JSON but not yet applied at checkout
- Real-time features will be added with Firebase
- Mobile responsiveness tested on standard breakpoints

---

**Happy Testing! 🎉**

For detailed progress, see [PROJECT_STATUS.md](PROJECT_STATUS.md)
