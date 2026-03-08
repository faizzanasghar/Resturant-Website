# 🍕 Delizia Craft Pizza - Quick Start Guide

## What's New? ✨

Your website now has a complete modern makeover with:

✅ **Beautiful Modern UI** - Smooth animations and transitions throughout
✅ **Backend API** - Full Node.js/Express server with database
✅ **User Authentication** - Secure login and registration with JWT
✅ **Order Management** - Place and track orders
✅ **Review System** - Submit and view customer reviews
✅ **Database** - SQLite for storing users, orders, and reviews

---

## Quick Start (3 Steps)

### Step 1: Install Dependencies
Open PowerShell in your project folder and type:
```bash
npm install
```

### Step 2: Start the Server
```bash
npm start
```

You'll see: `🍕 Delizia Craft Pizza server running at http://localhost:3000`

### Step 3: Open in Browser
Go to: **http://localhost:3000**

---

## Try It Out!

### 1. Create an Account
- Click "Sign Up" 
- Fill in your details
- Click "Register"

### 2. Login
- Use your credentials
- You'll see a welcome message

### 3. Browse Menu
- Click "Menu"
- Add items to your cart
- See the animations!

### 4. Checkout
- Click "Cart"
- Click "Proceed to Checkout"
- Order gets saved to your account!

### 5. Leave a Review
- Click "Reviews"
- Select rating and submit

---

## File Structure

```
📁 website/
├── 📄 server.js              ← Backend server (Node.js)
├── 📄 api-client.js          ← Frontend API library
├── 📄 styles-modern.css      ← New animated styles
├── 📄 package.json           ← Dependencies
├── 📄 database.db            ← Auto-created database
├── 📄 SETUP-GUIDE.md         ← Detailed documentation
├── 📄 README-QUICKSTART.md   ← This file
│
├── 🌐 HTML Pages:
├── 📄 practicepage.html      ← Home
├── 📄 products.html          ← Menu
├── 📄 cart.html              ← Shopping cart
├── 📄 login.html             ← Login
├── 📄 register.html          ← Registration
├── 📄 reviews.html           ← Customer reviews
├── 📄 about.html             ← About us
└── 📄 contact.html           ← Contact us
```

---

## Features Overview

### Frontend
- 🎨 Modern gradient designs with smooth animations
- ⚡ Fade, slide, scale, and pulse animations
- 📱 Fully responsive on mobile, tablet, desktop
- 🎯 Interactive menu with filters and search
- 🛒 Shopping cart with localStorage persistence
- ⭐ 5-star review system

### Backend API
- 🔐 User registration & login (JWT tokens)
- 📋 Menu management with categories
- 🛍️ Order creation and history
- ⭐ Review submission and ratings
- 👤 User profile management
- 🔒 Secure password hashing

### Database
- 👥 Users (with bcrypt hashed passwords)
- 🍕 Menu items (Pizza, Burgers, Salads)
- 📦 Orders (with order items)
- 🌟 Reviews (with ratings)

---

## Animation Examples

The website includes beautiful CSS animations:

```css
/* Slide down from top */
.hero h1 { animation: slideInDown 0.8s ease-out; }

/* Fade in smoothly */
.menu-item { animation: fadeIn 0.6s ease-out; }

/* Scale up with fade */
.card { animation: scaleIn 0.5s ease-out; }

/* Pulsing effect */
button:hover { animation: pulse 1.5s infinite; }

/* Smooth transitions */
a { transition: all 0.3s ease; }
```

---

## API Examples

### Register
```javascript
api.register('John', 'Doe', 'john@example.com', 'johndoe', 'pass123', '1990-01-01');
```

### Login
```javascript
api.login('johndoe', 'pass123');
```

### Add to Cart
```javascript
const item = { id: 1, name: 'Pizza', price: 12.99, quantity: 1 };
enhancedCart.addItem(item);
```

### Checkout
```javascript
enhancedCart.checkout();  // Requires login
```

### Submit Review
```javascript
api.submitReview('John Doe', 5, 'Amazing pizza!');
```

---

## Common Tasks

### Check Server Status
Visit: `http://localhost:3000`

### View Database
The database file is automatically created at: `database.db`

### Clear User Data
In browser console:
```javascript
localStorage.clear();  // Clear cart
api.logout();          // Logout
```

### Change Server Port
Edit `server.js`:
```javascript
const PORT = 3001;  // Change to different port
```

### Restart Server
1. Press Ctrl+C to stop the server
2. Run `npm start` again

---

## Troubleshooting

### Server won't start
- Make sure Node.js is installed: `node --version`
- Check if port 3000 is busy
- Delete `database.db` and restart

### Can't login
- Check if server is running
- Make sure browser console shows no errors (F12)
- Try registering a new account

### Cart not working
- Make sure JavaScript is enabled
- Clear browser cache (Ctrl+Shift+Delete)
- Check console for errors (F12)

### Website looks wrong
- Make sure `styles-modern.css` is loaded
- Check if file paths are correct
- Clear browser cache

---

## Next Steps

1. **Customize** - Edit SQL queries in `server.js` to add more features
2. **Deploy** - Upload to Heroku, AWS, or your preferred hosting
3. **Integrate Payment** - Add Stripe or PayPal API
4. **Add Analytics** - Track user behavior and sales
5. **Send Emails** - Add email notifications for orders

---

## Important Notes

🔐 **Security:**
- Passwords are hashed with bcryptjs
- Authentication uses JWT tokens
- Change the SECRET_KEY in production
- Use environment variables for sensitive data

⚡ **Performance:**
- Database auto-indexes key fields
- CSS animations are GPU-accelerated
- Responsive images optimize load time
- Minimal dependencies for speed

📱 **Browser Support:**
- Chrome/Edge/Firefox (latest)
- Safari (iOS 13+)
- Mobile browsers (iOS and Android)

---

## Support Resources

- 📖 Full docs: See `SETUP-GUIDE.md`
- 🐛 Errors: Check browser console (F12)
- 💻 Code: All source files are in this folder
- 🌐 Live demo: Running at `http://localhost:3000`

---

## Command Reference

```bash
# Install dependencies once
npm install

# Start server
npm start

# Start server with auto-reload (requires nodemon)
npm run dev

# Check Node version
node --version

# Check npm version  
npm --version
```

---

Enjoy your modern pizza ordering system! 🍕✨

**Made with ❤️ for great user experience**
