const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;
const SECRET_KEY = 'your-secret-key-change-this-in-production';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '/')));

// Database initialization
const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.log('Error opening database:', err);
  } else {
    console.log('Connected to SQLite database');
    initializeDatabase();
  }
});

// Initialize database tables
function initializeDatabase() {
  // Users table
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    firstname TEXT NOT NULL,
    lastname TEXT NOT NULL,
    password TEXT NOT NULL,
    dob TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Menu items table
  db.run(`CREATE TABLE IF NOT EXISTS menu_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    price REAL NOT NULL,
    category TEXT,
    image_url TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Orders table
  db.run(`CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    total_price REAL NOT NULL,
    status TEXT DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id)
  )`);

  // Order items table
  db.run(`CREATE TABLE IF NOT EXISTS order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER NOT NULL,
    menu_item_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    price REAL NOT NULL,
    FOREIGN KEY(order_id) REFERENCES orders(id),
    FOREIGN KEY(menu_item_id) REFERENCES menu_items(id)
  )`);

  // Reviews table
  db.run(`CREATE TABLE IF NOT EXISTS reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    username TEXT NOT NULL,
    rating INTEGER NOT NULL,
    text TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Seed menu items if empty
  db.get('SELECT COUNT(*) as count FROM menu_items', (err, row) => {
    if (row && row.count === 0) {
      seedMenuItems();
    }
  });
}

// Seed initial menu items
function seedMenuItems() {
  const menuItems = [
    { name: 'Margherita Pizza', description: 'Classic pizza with fresh mozzarella and basil', price: 12.99, category: 'Pizza' },
    { name: 'Pepperoni Pizza', description: 'Delicious pizza topped with pepperoni', price: 13.99, category: 'Pizza' },
    { name: 'Vegetarian Pizza', description: 'Fresh vegetables on a crispy crust', price: 11.99, category: 'Pizza' },
    { name: 'BBQ Chicken Pizza', description: 'Tender chicken with BBQ sauce', price: 14.99, category: 'Pizza' },
    { name: 'Classic Burger', description: 'Juicy beef patty with fresh toppings', price: 9.99, category: 'Burger' },
    { name: 'Cheese Burger', description: 'Double cheese with beef patty', price: 10.50, category: 'Burger' },
    { name: 'Veggie Burger', description: 'Healthy plant-based burger', price: 8.99, category: 'Burger' },
    { name: 'Caesar Salad', description: 'Fresh greens with parmesan and croutons', price: 7.99, category: 'Salad' }
  ];

  menuItems.forEach(item => {
    db.run(
      'INSERT INTO menu_items (name, description, price, category) VALUES (?, ?, ?, ?)',
      [item.name, item.description, item.price, item.category],
      (err) => {
        if (err) console.log('Error inserting menu item:', err);
      }
    );
  });
}

// ========== AUTHENTICATION ENDPOINTS ==========

// Register endpoint
app.post('/api/auth/register', (req, res) => {
  const { firstname, lastname, email, username, password, dob } = req.body;

  // Validation
  if (!firstname || !lastname || !email || !username || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters' });
  }

  // Hash password
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({ error: 'Error hashing password' });
    }

    db.run(
      'INSERT INTO users (firstname, lastname, email, username, password, dob) VALUES (?, ?, ?, ?, ?, ?)',
      [firstname, lastname, email, username, hash, dob],
      (err) => {
        if (err) {
          if (err.message.includes('UNIQUE constraint')) {
            return res.status(400).json({ error: 'Username or email already exists' });
          }
          return res.status(500).json({ error: 'Database error' });
        }

        res.json({ success: true, message: 'Registration successful! Please log in.' });
      }
    );
  });
});

// Login endpoint
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  db.get('SELECT * FROM users WHERE username = ?', [username], (err, user) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }

    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    bcrypt.compare(password, user.password, (err, match) => {
      if (err) {
        return res.status(500).json({ error: 'Error verifying password' });
      }

      if (!match) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }

      // Create JWT token
      const token = jwt.sign(
        { id: user.id, username: user.username, email: user.email },
        SECRET_KEY,
        { expiresIn: '24h' }
      );

      res.json({
        success: true,
        message: 'Login successful',
        token: token,
        user: {
          id: user.id,
          username: user.username,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email
        }
      });
    });
  });
});

// Verify token middleware
function verifyToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    req.userId = decoded.id;
    req.username = decoded.username;
    next();
  });
}

// ========== MENU ENDPOINTS ==========

// Get all menu items
app.get('/api/menu', (req, res) => {
  db.all('SELECT * FROM menu_items', (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(rows);
  });
});

// Get menu by category
app.get('/api/menu/category/:category', (req, res) => {
  const { category } = req.params;
  db.all('SELECT * FROM menu_items WHERE category = ?', [category], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(rows);
  });
});

// ========== CART ENDPOINTS ==========

// Save cart (stores in client-side, just validates items exist)
app.post('/api/cart/validate', (req, res) => {
  const { items } = req.body;

  if (!Array.isArray(items)) {
    return res.status(400).json({ error: 'Invalid cart items' });
  }

  const itemIds = items.map(item => item.id);
  const placeholders = itemIds.map(() => '?').join(',');

  db.all(`SELECT * FROM menu_items WHERE id IN (${placeholders})`, itemIds, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }

    const validatedItems = items.map(item => {
      const menuItem = rows.find(m => m.id === item.id);
      return {
        ...item,
        name: menuItem?.name || item.name,
        price: menuItem?.price || item.price
      };
    });

    res.json({ success: true, validatedItems });
  });
});

// ========== ORDER ENDPOINTS ==========

// Create order
app.post('/api/orders/create', verifyToken, (req, res) => {
  const { items, totalPrice } = req.body;

  if (!items || !totalPrice) {
    return res.status(400).json({ error: 'Missing order data' });
  }

  db.run(
    'INSERT INTO orders (user_id, total_price, status) VALUES (?, ?, ?)',
    [req.userId, totalPrice, 'pending'],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }

      const orderId = this.lastID;

      // Insert order items
      let completed = 0;
      items.forEach(item => {
        db.run(
          'INSERT INTO order_items (order_id, menu_item_id, quantity, price) VALUES (?, ?, ?, ?)',
          [orderId, item.id, item.quantity, item.price],
          (err) => {
            if (err) console.log('Error inserting order item:', err);
            completed++;

            if (completed === items.length) {
              res.json({
                success: true,
                message: 'Order created successfully',
                orderId: orderId
              });
            }
          }
        );
      });
    }
  );
});

// Get user orders
app.get('/api/orders/user', verifyToken, (req, res) => {
  db.all(
    `SELECT o.*, 
            GROUP_CONCAT(oi.quantity) as quantities,
            GROUP_CONCAT(m.name) as items
     FROM orders o
     LEFT JOIN order_items oi ON o.id = oi.order_id
     LEFT JOIN menu_items m ON oi.menu_item_id = m.id
     WHERE o.user_id = ?
     GROUP BY o.id
     ORDER BY o.created_at DESC`,
    [req.userId],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      res.json(rows);
    }
  );
});

// Get order details
app.get('/api/orders/:orderId', verifyToken, (req, res) => {
  const { orderId } = req.params;

  db.get('SELECT * FROM orders WHERE id = ? AND user_id = ?', [orderId, req.userId], (err, order) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    db.all(
      'SELECT oi.*, m.name FROM order_items oi JOIN menu_items m ON oi.menu_item_id = m.id WHERE oi.order_id = ?',
      [orderId],
      (err, items) => {
        if (err) {
          return res.status(500).json({ error: 'Database error' });
        }
        res.json({ ...order, items });
      }
    );
  });
});

// ========== REVIEWS ENDPOINTS ==========

// Get all reviews
app.get('/api/reviews', (req, res) => {
  db.all(
    'SELECT id, username, rating, text, created_at FROM reviews ORDER BY created_at DESC',
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      res.json(rows);
    }
  );
});

// Submit review
app.post('/api/reviews', (req, res) => {
  const { username, rating, text } = req.body;

  if (!username || !rating || !text) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (rating < 1 || rating > 5) {
    return res.status(400).json({ error: 'Rating must be between 1 and 5' });
  }

  db.run(
    'INSERT INTO reviews (username, rating, text) VALUES (?, ?, ?)',
    [username, rating, text],
    (err) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      res.json({ success: true, message: 'Review submitted successfully' });
    }
  );
});

// Get average rating
app.get('/api/reviews/average', (req, res) => {
  db.get('SELECT AVG(rating) as average FROM reviews', (err, row) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json({ average: row?.average || 0, count: row?.count || 0 });
  });
});

// ========== USER ENDPOINTS ==========

// Get user profile
app.get('/api/user/profile', verifyToken, (req, res) => {
  db.get('SELECT id, username, firstname, lastname, email, created_at FROM users WHERE id = ?', [req.userId], (err, user) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  });
});

// Update user profile
app.put('/api/user/profile', verifyToken, (req, res) => {
  const { firstname, lastname, email } = req.body;

  if (!firstname || !lastname || !email) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  db.run(
    'UPDATE users SET firstname = ?, lastname = ?, email = ? WHERE id = ?',
    [firstname, lastname, email, req.userId],
    (err) => {
      if (err) {
        if (err.message.includes('UNIQUE constraint')) {
          return res.status(400).json({ error: 'Email already in use' });
        }
        return res.status(500).json({ error: 'Database error' });
      }
      res.json({ success: true, message: 'Profile updated successfully' });
    }
  );
});

// Change password
app.post('/api/user/change-password', verifyToken, (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    return res.status(400).json({ error: 'Both passwords are required' });
  }

  if (newPassword.length < 6) {
    return res.status(400).json({ error: 'New password must be at least 6 characters' });
  }

  db.get('SELECT password FROM users WHERE id = ?', [req.userId], (err, user) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    bcrypt.compare(oldPassword, user.password, (err, match) => {
      if (err) {
        return res.status(500).json({ error: 'Error verifying password' });
      }

      if (!match) {
        return res.status(401).json({ error: 'Old password is incorrect' });
      }

      bcrypt.hash(newPassword, 10, (err, hash) => {
        if (err) {
          return res.status(500).json({ error: 'Error hashing password' });
        }

        db.run('UPDATE users SET password = ? WHERE id = ?', [hash, req.userId], (err) => {
          if (err) {
            return res.status(500).json({ error: 'Database error' });
          }
          res.json({ success: true, message: 'Password changed successfully' });
        });
      });
    });
  });
});

// ========== ERROR HANDLING ==========

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'practicepage.html'));
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🍕 Delizia Craft Pizza server running at http://localhost:${PORT}`);
  console.log('API Documentation:');
  console.log('  POST   /api/auth/register - Register new user');
  console.log('  POST   /api/auth/login - Login user');
  console.log('  GET    /api/menu - Get all menu items');
  console.log('  POST   /api/cart/validate - Validate cart items');
  console.log('  POST   /api/orders/create - Create new order (requires token)');
  console.log('  GET    /api/orders/user - Get user orders (requires token)');
  console.log('  GET    /api/reviews - Get all reviews');
  console.log('  POST   /api/reviews - Submit review');
});
