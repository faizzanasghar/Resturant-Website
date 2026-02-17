# Resturant-Website
My final project of ICT and my first website which made in html , CSS and javaScript.

# 🍕 Delizia Craft Pizza - Static Website

A modern, responsive restaurant ordering website for **Delizia Craft Pizza**. 
This project has been refactored to run as a **Static Site** (Serverless) using **LocalStorage** as a mock database, making it easy to host on platforms like **GitHub Pages**.

## ✨ Features

- **Modern UI**: Smooth CSS animations, responsive design, and professional styling.
- **Static Database**: Uses browser `Local Storage` to simulate a database. No backend server required!
- **User Accounts**: working Sign Up and Login (data saved to your browser).
- **Admin Dashboard**: a dedicated panel (`admin.html`) to manage products and view customer orders.
- **Shopping Cart**: Fully functional cart with checkout.
- **Dynamic Menu**: Add/Remove products from the Admin panel and see them update instantly on the menu page.

---

## 🚀 Quick Start

### 1. Open the Website
Simply open `practicepage.html` in your web browser. 
No installation or server commands are needed!

### 2. Login Credentials

**Admin Account:**
- **Username:** `admin`
- **Password:** `admin123`
- *Access user management, add products, view orders.*

**User Account:**
- You can register a new account on the **Sign Up** page.
- *Browse menu, add to cart, place orders.*

---

## 📂 Project Structure

- **`practicepage.html`**: Home page.
- **`products.html`**: Menu page (Dynamic).
- **`admin.html`**: Admin Dashboard (Restricted).
- **`login.html` / `register.html`**: User authentication.
- **`api-client.js`**: Core logic for the Mock Database and API simulation.
- **`styles-modern.css`**: Main stylesheet.

---

## 🛠️ Deployment

To host this site online:

1.  **GitHub Pages**: Upload these files to a GitHub repository and enable GitHub Pages in settings.
2.  **Netlify/Vercel**: Drag and drop the folder to deploy instantly.

---

*Note: Since this uses LocalStorage, data is stored in your specific browser. Clearing your cache will reset the "database".*
