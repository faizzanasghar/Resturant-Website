# ✅ DELIZIA CRAFT PIZZA - FIRST RUN CHECKLIST

**Estimated Time: 10 minutes**

Follow this checklist to get your website running for the first time.

---

## 🔧 PRE-SETUP (1 minute)

- [ ] Open the project folder: `e:\New folder\website`
- [ ] Check you have the following files:
  - [ ] `server.js`
  - [ ] `package.json`
  - [ ] `styles-modern.css`
  - [ ] `api-client.js`
  - [ ] HTML files (practicepage.html, products.html, etc.)

---

## 📦 INSTALLATION (2 minutes)

### Step 1: Open PowerShell/Terminal

**Windows:**
1. Right-click in the `website` folder
2. Select: "Open PowerShell window here"

**Mac/Linux:**
1. Open Terminal
2. Type: `cd "/path/to/website"`

### Step 2: Install Dependencies

Copy and paste this command:

```bash
npm install
```

**Expected output:**
```
added 123 packages in 45s
```

**If you see an error:**
- [ ] Check Node.js is installed: `node --version`
- [ ] If not, download from: https://nodejs.org/
- [ ] Restart PowerShell
- [ ] Try `npm install` again

---

## 🚀 START SERVER (1 minute)

### Step 3: Start the Backend

Copy and paste this command:

```bash
npm start
```

**Expected output:**
```
🍕 Delizia Craft Pizza server running at http://localhost:3000
Connected to SQLite database
```

**If you see different output:**
- [ ] Check for error messages
- [ ] See "Troubleshooting" section below
- [ ] DO NOT close this window - it needs to stay running

---

## 🌐 OPEN WEBSITE (1 minute)

### Step 4: Open Your Browser

1. Open your web browser (Chrome, Firefox, Edge, Safari)
2. Go to address bar
3. Type: `http://localhost:3000`
4. Press Enter

**You should see:**
- [ ] Beautiful Delizia Craft Pizza homepage
- [ ] Animated hero section
- [ ] Navigation menu at top
- [ ] No errors or broken styling

**If styling looks wrong:**
- [ ] Hard refresh: Press `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
- [ ] Check browser console: Press `F12`
- [ ] Look for red error messages

---

## 👤 CREATE TEST ACCOUNT (2 minutes)

### Step 5: Register New User

1. Click **"Sign Up"** in navigation
2. Fill in the form:

| Field | Value |
|-------|-------|
| First Name | `John` |
| Last Name | `Doe` |
| Email | `john@example.com` |
| Username | `johndoe` |
| Password | `password123` |
| Date of Birth | Select any date (13+) |

3. Click **"Register"**
4. You should see: **Green success message**
5. You'll be redirected to login page

**Issues?**
- [ ] See error message? Read it carefully
- [ ] Username already exists? Use different username
- [ ] Password too short? Use 6+ characters
- [ ] Date too young? Select age 13+

### Step 6: Login with New Account

1. Enter username: `johndoe`
2. Enter password: `password123`
3. Click **"Log In"**
4. You should see: **"Welcome John!" message**

**Success indicators:**
- [ ] No error messages
- [ ] Can see welcome message
- [ ] Navigation still visible

---

## 🍕 TEST MENU (1 minute)

### Step 7: Browse Menu

1. Click **"Menu"** in navigation
2. You should see:
   - [ ] Menu items displayed in grid
   - [ ] Pizza items (Margherita, Pepperoni, etc.)
   - [ ] Burger items
   - [ ] Filter buttons at top (Pizza, Burger, Salad)
   - [ ] Search bar
   - [ ] "Add to Cart" buttons on each item

3. **Test filters:**
   - [ ] Click "Pizza" filter - should show only pizzas
   - [ ] Click "Burger" filter - should show only burgers
   - [ ] Click "All" or refresh - should show everything

4. **Test search:**
   - [ ] Type "pizza" in search box
   - [ ] Should filter to show pizzas
   - [ ] Clear search - should show all again

---

## 🛒 TEST SHOPPING CART (2 minutes)

### Step 8: Add Items to Cart

1. Click **"Add to Cart"** on any menu item
2. You should see:
   - [ ] **Green success notification** appears
   - [ ] Message: "Item added to cart!"
   - [ ] Notification disappears after 3 seconds

3. Add 2-3 more items from different categories
4. Each time you should see success notification

### Step 9: View Cart

1. Click **"Cart"** in navigation
2. You should see:
   - [ ] Table with all your items
   - [ ] Item names, prices, quantities
   - [ ] "Update Quantity" input boxes
   - [ ] "Remove" buttons next to each item
   - [ ] **Total Price** at bottom
   - [ ] Two buttons: "Checkout" and "Clear Cart"

3. **Test modifying cart:**
   - [ ] Change quantity of an item
   - [ ] Click elsewhere - cart should update
   - [ ] Total price should update
   - [ ] Click "Remove" - item should disappear

4. **Test checkout:**
   - [ ] Click **"Proceed to Checkout"**
   - [ ] You should see success message: "Order placed successfully!"
   - [ ] Cart should be empty
   - [ ] You'll be redirected to orders page in 2 seconds

---

## ⭐ TEST REVIEWS (1 minute)

### Step 10: Leave a Review

1. Click **"Reviews"** in navigation
2. You should see:
   - [ ] Average rating display
   - [ ] Review submission form
   - [ ] Star rating selector
   - [ ] Text area for review
   - [ ] "Submit Review" button

3. **Submit a review:**
   - [ ] Type your name in "Your Name" field
   - [ ] Click on stars to select rating (try clicking 5 stars)
   - [ ] Type review text: "Great pizza! Highly recommended!"
   - [ ] Click "Submit Review"

4. You should see:
   - [ ] Green success message
   - [ ] Your review appears in list below
   - [ ] Average rating updates
   - [ ] Stars show your rating

---

## ✨ CHECK ANIMATIONS (1 minute)

### Step 11: Test Visual Effects

Test these animations throughout the site:

1. **Hover Effects:**
   - [ ] Hover over menu items - they should slide up
   - [ ] Hover over buttons - they should glow/change color
   - [ ] Hover over links - they should change color

2. **Page Load Animations:**
   - [ ] Refresh page (`F5`)
   - [ ] Watch elements fade/slide in smoothly
   - [ ] Hero section should have animation

3. **Form Focus:**
   - [ ] Click on form input
   - [ ] Input should highlight with blue border
   - [ ] Background should change color

4. **Button Clicks:**
   - [ ] Click buttons
   - [ ] They should respond with visual feedback
   - [ ] Nothing should be instant - smooth transitions

---

## 🧪 RUN COMPLETE WORKFLOW TEST

### Step 12: Full User Journey

**Complete one full journey:**

1. [ ] Start at Home page
2. [ ] Navigate to Menu
3. [ ] Add 3 items to cart
4. [ ] Go to Cart page
5. [ ] Modify quantities
6. [ ] Checkout
7. [ ] View Reviews page
8. [ ] Submit a review
9. [ ] Go back to Home
10. [ ] Try all navigation links

**All should work smoothly without errors!**

---

## 🔍 TROUBLESHOOTING

### Problem: Server won't start

**Error:** `Port 3000 is already in use`

**Solution:**
```bash
# Stop whatever is using port 3000
# Then edit server.js, change line 13 from:
const PORT = 3000;
# to:
const PORT = 3001;
# Save and run: npm start
```

### Problem: Website styling is broken

**Solution:**
1. Hard refresh browser: `Ctrl+Shift+R` or `Cmd+Shift+R`
2. Check browser console: `F12`
3. Look for red error messages
4. Try different browser

### Problem: Can't login

**Solution:**
1. Make sure username is exact (case-sensitive)
2. Make sure password is correct
3. Check browser console for errors: `F12`
4. Try registering a new account

### Problem: Cart not working

**Solution:**
1. Make sure JavaScript is enabled
2. Check browser console: `F12`
3. Clear browser cache: `Ctrl+Shift+Delete`
4. Try different browser

### Problem: Database error

**Solution:**
```bash
# Stop the server (Ctrl+C)
# Delete database.db file
# Run: npm start
# Wait 3 seconds for database recreation
```

---

## 📝 FINAL VERIFICATION

When everything is working, you should be able to:

- [ ] See the website at `http://localhost:3000`
- [ ] Register a new account
- [ ] Login with that account
- [ ] Browse menu with animations
- [ ] Add items to cart
- [ ] View cart and checkout
- [ ] Leave a review
- [ ] See smooth animations everywhere
- [ ] See no console errors
- [ ] Close and reopen - cart data persists

---

## 🎉 SUCCESS!

If you've checked all boxes above, your website is:

✅ **Fully installed**
✅ **Running correctly**
✅ **All features working**
✅ **Ready to use!**

---

## 📚 NEXT STEPS

1. **Explore the code:**
   - Open `server.js` in VS Code
   - Read the comments to understand API structure
   - Check `styles-modern.css` for animations

2. **Customize the site:**
   - Change restaurant name in HTML files
   - Change colors in `styles-modern.css`
   - Add your own menu items

3. **Deploy to internet:**
   - See SETUP-GUIDE.md for deployment instructions
   - Heroku (easiest), AWS, DigitalOcean, etc.

4. **Add payment processing:**
   - Follow SETUP-GUIDE.md
   - Integrate Stripe or PayPal

---

## 🆘 STILL HAVING ISSUES?

1. **Check Documentation:**
   - GETTING-STARTED.md - Installation guide
   - SETUP-GUIDE.md - Detailed documentation
   - PROJECT-SUMMARY.md - Feature overview

2. **Check Console:**
   - Press `F12` in browser
   - Click "Console" tab
   - Look for red error messages
   - Copy exact error text

3. **Check Server Terminal:**
   - Look at terminal running `npm start`
   - Any error messages printed there?
   - Try restarting server: `Ctrl+C` then `npm start`

4. **Try Common Fixes:**
   - Hard refresh: `Ctrl+Shift+R`
   - Clear cache: `Ctrl+Shift+Delete`
   - Try different browser
   - Restart computer

---

## 📞 QUICK REFERENCE COMMANDS

```bash
# Start server
npm start

# Start with auto-reload
npm run dev

# Stop server
Ctrl+C

# Full reinstall
rm -rf node_modules package-lock.json
npm install

# Check Node version
node --version

# Check npm version
npm --version
```

---

**🍕 Congratulations! You're ready to go! 🍕**

**Your modern pizza ordering system is now live at http://localhost:3000**

**Enjoy! 🚀**
