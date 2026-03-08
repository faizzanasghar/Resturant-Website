# 🍕 DELIZIA CRAFT PIZZA - COMPLETE INSTALLATION & LAUNCH GUIDE

## 📋 Pre-Installation Checklist

Before you start, make sure you have:

- [ ] Windows, Mac, or Linux computer
- [ ] Internet connection (for npm download)
- [ ] Text editor or VS Code open
- [ ] PowerShell or Command Prompt ready
- [ ] About 5 minutes of time

---

## ⚡ QUICK INSTALL (5 minutes)

### Step 1: Open Terminal in Your Project Folder

Right-click in `e:\New folder\website` and select:
- **Windows 10/11**: "Open PowerShell window here" or "Open command prompt here"
- **Mac/Linux**: Open terminal and navigate to folder with `cd e:/New\ folder/website`

### Step 2: Install Node.js Dependencies

Copy and paste this command:

```bash
npm install
```

**What it does**: Downloads and installs Express, SQLite3, JWT, bcryptjs, CORS, and Nodemon

**Expected output**:
```
added XX packages in Xs
```

### Step 3: Start the Server

Copy and paste this command:

```bash
npm start
```

**Expected output**:
```
🍕 Delizia Craft Pizza server running at http://localhost:3000
Connected to SQLite database
```

### Step 4: Open Your Website

Copy this into your browser address bar:

```
http://localhost:3000
```

**You should see**: Beautiful Delizia Craft Pizza homepage with animations!

---

## 🎯 FIRST-TIME USER WALKTHROUGH

### 1. Register a New Account (1 minute)

1. Click **"Sign Up"** in the navigation bar
2. Fill in the form:
   - First Name: `John`
   - Last Name: `Doe`
   - Email: `john@example.com`
   - Username: `johndoe`
   - Password: `password123` (min 6 chars)
   - Date of Birth: Select any date (must be 13+)
3. Click **"Register"**
4. You'll see a green success message
5. You'll be redirected to login page

### 2. Login to Your Account (1 minute)

1. Enter your username: `johndoe`
2. Enter your password: `password123`
3. Click **"Log In"**
4. You'll see welcome message with your name
5. You're now logged in! 🎉

### 3. Browse the Menu (2 minutes)

1. Click **"Menu"** in navigation
2. You'll see pizza, burgers, and salads
3. Try the **filters** at the top (Pizza, Burger, Salad)
4. Try the **search bar** - type "pizza"
5. Hover over menu items to see animations

### 4. Add Items to Cart (1 minute)

1. Click **"Add to Cart"** on any item
2. You'll see a success notification
3. Add 2-3 different items
4. Watch your cart count increase

### 5. Checkout (1 minute)

1. Click **"Cart"** in navigation
2. See all your items with prices
3. Click **"Proceed to Checkout"**
4. Success! Your order is placed
5. Check "Orders" to see your order history

### 6. Leave a Review (1 minute)

1. Click **"Reviews"** in navigation
2. Type your name, select rating (click stars)
3. Write a review
4. Click **"Submit Review"**
5. See it appear in the reviews list
6. Watch the average rating update

---

## 🛠️ TROUBLESHOOTING

### Problem: "npm is not recognized"

**Solution**: Node.js is not installed
```bash
# Download and install from: https://nodejs.org/
# Then restart your terminal and try again
```

### Problem: "Port 3000 is already in use"

**Solution**: Another app is using port 3000
```bash
# Option 1: Stop whatever is using port 3000
# Option 2: Change port in server.js (line 13)
const PORT = 3001; // Change 3000 to 3001

# Then start server with: npm start
```

### Problem: "Cannot find module 'express'"

**Solution**: Dependencies not installed
```bash
# Run this command:
npm install

# Then start server:
npm start
```

### Problem: "Website looks ugly / no animations"

**Solution**: CSS not loading
1. Hard refresh browser: **Ctrl+Shift+R** (Windows) or **Cmd+Shift+R** (Mac)
2. Check browser console: **F12** → Console tab
3. Look for red error messages

### Problem: "Login/Register not working"

**Solution**: Check these things:
1. Is server running? Check terminal window
2. Is there an error in console? **F12**
3. Try different browser (Chrome, Firefox, Edge)
4. Clear cookies: **Ctrl+Shift+Delete**

### Problem: "Database file not created"

**Solution**: Let the server create it
1. Stop server: **Ctrl+C**
2. Make sure database.db doesn't exist (delete if it does)
3. Start server: `npm start`
4. Wait 3 seconds for database creation
5. Check folder - you should see `database.db` file

---

## 🎨 CUSTOMIZATION

### Change Website Colors

Edit `styles-modern.css`:

**Find these lines:**
```css
/* Common colors */
#ff6347  /* Tomato red - primary color */
#4caf50  /* Green - success buttons */
#2196F3  /* Blue - links */
```

**Change them to your colors:**
```css
#ff6347  /* Change to #FF9800 for orange */
#4caf50  /* Change to #9C27B0 for purple */
#2196F3  /* Change to #FF1493 for pink */
```

### Change Restaurant Name

Find "Delizia Craft Pizza" and replace with your name in:
- `practicepage.html`
- `products.html`
- `server.js` (console message)

### Add More Menu Items

Edit `server.js` function `seedMenuItems()`:

```javascript
const menuItems = [
  { name: 'Your Pizza', description: 'Description here', price: 12.99, category: 'Pizza' },
  // Add more items...
];
```

---

## 📚 DOCUMENTATION FILES

Your project includes detailed documentation:

1. **README-QUICKSTART.md** - Super quick start guide
2. **SETUP-GUIDE.md** - Complete setup with API documentation  
3. **FEATURES.md** - All features explained in detail
4. **.env.example** - Environment variable template

---

## 🚀 DEPLOYMENT OPTIONS

### Option 1: Heroku (Free Tier)

Step-by-step:
1. Create account at https://heroku.com
2. Install Heroku CLI
3. Run:
   ```bash
   heroku create your-app-name
   git push heroku main
   ```

### Option 2: Replit (Easiest)

1. Create account at https://replit.com
2. Click "Create" → "Import from GitHub"
3. Paste your GitHub repo URL
4. Click "Import"
5. Replit will auto-run your server!

### Option 3: Your Own Server

1. Get a VPS or dedicated server (AWS, DigitalOcean, Linode)
2. Install Node.js on the server
3. Upload project files
4. Run `npm install && npm start`
5. Use PM2 to keep it running: `npm install -g pm2 && pm2 start server.js`

---

## 📊 PROJECT STATISTICS

| Metric | Details |
|--------|---------|
| **Frontend Pages** | 8 HTML files |
| **CSS Animations** | 7 keyframe animations |
| **API Endpoints** | 22 RESTful endpoints |
| **Database Tables** | 5 relational tables |
| **Lines of Code** | 2,500+ |
| **Installation Time** | 5 minutes |
| **Setup Time** | 1 minute |

---

## ✨ FEATURES AT A GLANCE

### What You Get:

✅ **Modern Animations**
- Fade, slide, scale, and glow effects
- Smooth transitions on all interactive elements
- GPU-accelerated performance
- Mobile-optimized animations

✅ **Secure Authentication**
- Password hashing with bcryptjs
- JWT token-based login
- Session management
- Secure password storage

✅ **Complete Backend**
- RESTful API with 22 endpoints
- SQLite3 database with 5 tables
- Automatic data seeding
- Error handling and validation

✅ **Shopping System**
- Add/remove items from cart
- Persistent local storage
- Real-time price calculation
- Order validation

✅ **Review System**
- 5-star rating system
- Average rating calculation
- Customer review display
- Date tracking

✅ **Responsive Design**
- Works on mobile (320px+)
- Tablet optimized (768px+)
- Desktop enhanced (1200px+)
- Touch-friendly buttons

---

## 🎓 LEARNING RESOURCES

### Understand the Code:

**Just getting started?** Read in this order:
1. This file (GETTING-STARTED.md)
2. README-QUICKSTART.md
3. Look at `practicepage.html` to understand HTML structure
4. Check `styles-modern.css` for CSS animations
5. Read `api-client.js` comments for API integration
6. Study `server.js` for backend logic

### Want to Learn More?

- Express.js: https://expressjs.com
- SQLite: https://www.sqlite.org/docs.html
- JWT: https://jwt.io
- CSS Animations: https://developer.mozilla.org/en-US/docs/Web/CSS/animation

---

## ⚙️ ADVANCED CONFIGURATION

### Using Environment Variables

1. Create a file named `.env` in your project root
2. Copy content from `.env.example`
3. Update with your values
4. Update `server.js` to load it:
   ```javascript
   require('dotenv').config();
   const SECRET_KEY = process.env.SECRET_KEY || 'default-key';
   ```

### Enable Development Auto-Reload

Instead of `npm start`, use:

```bash
npm run dev
```

This uses nodemon to automatically restart on file changes.

---

## 🔒 SECURITY CHECKLIST

Before deploying to production:

- [ ] Generate new SECRET_KEY (not the default)
- [ ] Use HTTPS (SSL certificate)
- [ ] Add rate limiting to API endpoints
- [ ] Enable CORS only for your domain
- [ ] Hash all passwords (bcryptjs)
- [ ] Use environment variables for secrets
- [ ] Add input validation to all forms
- [ ] Implement CSRF protection
- [ ] Keep dependencies updated: `npm audit`
- [ ] Use strong database passwords

---

## 📞 SUPPORT COMMANDS

### Check if npm is installed:
```bash
npm --version
```

### Check if Node.js is installed:
```bash
node --version
```

### See all npm scripts:
```bash
npm run
```

### Clean reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Stop the server:
Press **Ctrl+C** in the terminal

---

## 🎉 YOU'RE ALL SET!

Your Delizia Craft Pizza website is now:
- ✅ Fully functional
- ✅ Beautifully animated
- ✅ Secure with authentication
- ✅ Ready for customers
- ✅ Ready for deployment

---

## 🚀 NEXT STEPS

1. **Customize** it with your restaurant's information
2. **Test** all features (register, login, order, review)
3. **Deploy** to production (Heroku, your server, etc.)
4. **Add payment** integration (Stripe, PayPal)
5. **Share with customers** and get orders!

---

## 📝 QUICK REFERENCE

```bash
# Install dependencies (do this once)
npm install

# Start the server
npm start

# Start with auto-reload (development)
npm run dev

# Stop the server
Ctrl+C

# Check if server is running
Open http://localhost:3000 in browser
```

---

**🍕 Enjoy your new restaurant ordering system!**

**Questions?** Check the other documentation files or the browser console (F12) for error messages.

**Happy coding! 🚀**
