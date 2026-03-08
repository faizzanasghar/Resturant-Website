# 🍕 Delizia Craft Pizza - Complete Setup Guide

## Project Overview

This is a modern, interactive restaurant ordering system with a beautiful frontend and a robust backend API. The website features smooth animations, real-time cart management, user authentication, and order processing.

---

## Features Implemented

### ✨ Frontend Features
- **Modern UI/UX** with smooth CSS animations and transitions
- **Responsive Design** that works perfectly on all devices
- **Interactive Components** including:
  - Animated navigation bar with hover effects
  - Hero section with gradient overlays
  - Menu items with smooth scaling and shadows
  - Form validation with error messages
  - Shopping cart with localStorage persistence
  - Review system with star ratings
  - Keyframe animations (fadeIn, slideIn, scaleIn, pulse, glow)

### 🔐 Backend Features
- **User Authentication**
  - Secure registration with password hashing (bcryptjs)
  - Login with JWT token generation
  - Password change functionality

- **Menu Management**
  - Dynamic menu items from database
  - Category-based filtering
  - Real-time inventory management

- **Order Processing**
  - Order creation and validation
  - Order history for logged-in users
  - Order item details with pricing

- **Review System**
  - Submit and display customer reviews
  - 5-star rating system
  - Average rating calculation

- **User Management**
  - View and update user profile
  - Secure password change
  - JWT token-based authentication

---

## Installation & Setup

### Prerequisites
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- A modern web browser

### Step 1: Install Dependencies

Navigate to the project folder in PowerShell/Command Prompt and run:

```bash
npm install
```

This installs all required packages:
- `express` - Web server framework
- `sqlite3` - Database
- `jsonwebtoken` - JWT authentication
- `bcryptjs` - Password hashing
- `cors` - Cross-origin requests
- `nodemon` - Development server auto-reload

### Step 2: Start the Backend Server

```bash
npm start
```

Or for development mode (auto-reload on file changes):

```bash
npm run dev
```

You should see:
```
🍕 Delizia Craft Pizza server running at http://localhost:3000
```

### Step 3: Open the Website

Open your browser and navigate to:
```
http://localhost:3000
```

---

## Project Structure

```
website/
├── server.js                    # Express backend server
├── api-client.js               # Frontend API client library
├── styles-modern.css           # Modern enhanced CSS with animations
├── cart-functions.js           # Legacy local cart (now uses API)
├── reviews.js                  # Legacy reviews (now uses API)
├── package.json                # Node.js dependencies
├── database.db                 # SQLite database (auto-created)
├── practicepage.html           # Home page
├── products.html               # Menu page
├── cart.html                   # Shopping cart
├── login.html                  # Login page
├── register.html               # Registration page
├── about.html                  # About us
├── contact.html                # Contact information
└── reviews.html                # Reviews page
```

---

## API Endpoints Documentation

### Authentication Endpoints

#### Register User
```
POST /api/auth/register
Content-Type: application/json

{
  "firstname": "John",
  "lastname": "Doe",
  "email": "john@example.com",
  "username": "johndoe",
  "password": "secure123",
  "dob": "1990-01-01"
}
```

#### Login
```
POST /api/auth/login
Content-Type: application/json

{
  "username": "johndoe",
  "password": "secure123"
}

Response:
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 1,
    "username": "johndoe",
    "firstname": "John",
    "lastname": "Doe",
    "email": "john@example.com"
  }
}
```

### Menu Endpoints

#### Get All Menu Items
```
GET /api/menu
```

#### Get Menu by Category
```
GET /api/menu/category/Pizza
GET /api/menu/category/Burger
GET /api/menu/category/Salad
```

### Cart Endpoints

#### Validate Cart Items
```
POST /api/cart/validate
Content-Type: application/json

{
  "items": [
    { "id": 1, "name": "Margherita Pizza", "price": 12.99, "quantity": 2 },
    { "id": 2, "name": "Classic Burger", "price": 9.99, "quantity": 1 }
  ]
}
```

### Order Endpoints (Requires Authentication)

#### Create Order
```
POST /api/orders/create
Authorization: Bearer {token}
Content-Type: application/json

{
  "items": [
    { "id": 1, "name": "Margherita Pizza", "price": 12.99, "quantity": 2 },
    { "id": 2, "name": "Classic Burger", "price": 9.99, "quantity": 1 }
  ],
  "totalPrice": 35.97
}
```

#### Get User Orders
```
GET /api/orders/user
Authorization: Bearer {token}
```

#### Get Order Details
```
GET /api/orders/{orderId}
Authorization: Bearer {token}
```

### Review Endpoints

#### Get All Reviews
```
GET /api/reviews
```

#### Submit Review
```
POST /api/reviews
Content-Type: application/json

{
  "username": "John Doe",
  "rating": 5,
  "text": "Amazing pizza! Highly recommended!"
}
```

#### Get Average Rating
```
GET /api/reviews/average
```

### User Endpoints (Requires Authentication)

#### Get User Profile
```
GET /api/user/profile
Authorization: Bearer {token}
```

#### Update User Profile
```
PUT /api/user/profile
Authorization: Bearer {token}
Content-Type: application/json

{
  "firstname": "John",
  "lastname": "Doe",
  "email": "john.doe@example.com"
}
```

#### Change Password
```
POST /api/user/change-password
Authorization: Bearer {token}
Content-Type: application/json

{
  "oldPassword": "oldpass123",
  "newPassword": "newpass456"
}
```

---

## How to Use the Website

### 1. Register a New Account
- Click "Sign Up" in the navigation
- Fill in your details (first name, last name, email, username, password, DOB)
- Click "Register"
- You'll be redirected to login

### 2. Login
- Enter your username/email and password
- Click "Log In"
- Your session will be saved with a JWT token

### 3. Browse Menu
- Click "Menu" in the navigation
- Browse available pizzas and burgers
- Use filters to narrow down options (Pizza, Burger, Salad)
- Search for specific items using the search bar

### 4. Add to Cart
- Click "Add to Cart" on any menu item
- See a success notification
- Add multiple items as needed

### 5. Checkout
- Click "Cart" in the navigation
- Review your order
- Click "Checkout" (must be logged in)
- Order is created and saved to your account

### 6. View Order History
- After checkout, your orders are saved
- Log in to view order history
- Click on orders to see details

### 7. Leave Reviews
- Click "Reviews" in the navigation
- Enter your name, select rating (1-5 stars), and write a review
- Click "Submit Review"
- See average rating and all customer reviews

---

## CSS Animations & Transitions

The website includes modern CSS3 animations:

- **slideInDown**: Elements slide down with fade-in effect
- **slideInUp**: Elements slide up with fade-in effect
- **fadeIn**: Smooth fade-in animation
- **scaleIn**: Elements fade in while scaling from 95% to 100%
- **pulse**: Gentle pulsing effect for emphasis
- **glow**: Box shadow glow animation
- **shimmer**: Loading state shimmer effect

All buttons and interactive elements have smooth transitions (0.3s) on hover with scale and shadow effects.

---

## Database Schema

### Users Table
```
id (INTEGER PRIMARY KEY)
username (TEXT UNIQUE)
email (TEXT UNIQUE)
firstname (TEXT)
lastname (TEXT)
password (TEXT - bcrypt hashed)
dob (TEXT)
created_at (DATETIME)
```

### Menu Items Table
```
id (INTEGER PRIMARY KEY)
name (TEXT)
description (TEXT)
price (REAL)
category (TEXT)
image_url (TEXT)
created_at (DATETIME)
```

### Orders Table
```
id (INTEGER PRIMARY KEY)
user_id (INTEGER FOREIGN KEY)
total_price (REAL)
status (TEXT - 'pending', 'confirmed', 'delivered')
created_at (DATETIME)
```

### Order Items Table
```
id (INTEGER PRIMARY KEY)
order_id (INTEGER FOREIGN KEY)
menu_item_id (INTEGER FOREIGN KEY)
quantity (INTEGER)
price (REAL)
```

### Reviews Table
```
id (INTEGER PRIMARY KEY)
user_id (INTEGER)
username (TEXT)
rating (INTEGER 1-5)
text (TEXT)
created_at (DATETIME)
```

---

## Troubleshooting

### Cannot connect to server
- Make sure Node.js is running: `npm start`
- Check if port 3000 is available
- Try accessing `http://localhost:3000` in your browser

### Database errors
- Delete `database.db` file and restart the server to recreate it
- Check folder permissions for write access

### CORS errors
- Make sure you're accessing via `http://localhost:3000`
- Not via `file://` protocol

### Login not working
- Clear browser cookies and localStorage: `localStorage.clear()`
- Try registering a new account
- Check that password is at least 6 characters

### Cart not persisting
- Have JavaScript enabled in browser
- Check browser console for errors (F12)
- Clear localStorage if having issues: `localStorage.clear()`

---

## Performance Tips

1. **Use Chrome DevTools** (F12) to monitor network requests
2. **Check Storage tab** to see localStorage cart data
3. **Use Network tab** to view API responses
4. **Check Console tab** for any JavaScript errors

---

## Security Notes

⚠️ **Important for Production:**

1. Change the `SECRET_KEY` in `server.js` to a secure random string
2. Use environment variables for sensitive data
3. Set up HTTPS/SSL certificates
4. Implement rate limiting for API endpoints
5. Add input validation on all form fields
6. Use a more robust database (PostgreSQL/MySQL)
7. Implement proper payment processing (Stripe, etc.)

---

## Deployment Options

### Local Development
```bash
npm start
```

### Heroku Deployment
1. Create a Heroku account
2. Install Heroku CLI
3. Run: `heroku create` and `git push heroku main`

### AWS/Azure
Deploy using their respective deployment guides for Node.js apps

---

## Future Enhancements

- [ ] Payment gateway integration (Stripe)
- [ ] Email notifications for orders
- [ ] Admin dashboard for menu management
- [ ] Real-time order tracking
- [ ] Customer favorites/wishlist
- [ ] Mobile app version
- [ ] Social media login integration
- [ ] Advanced analytics

---

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review the API documentation
3. Check browser console for error messages
4. Ensure all dependencies are installed: `npm install`

---

**Enjoy using Delizia Craft Pizza! 🍕**
