// ========== MOCK DATABASE (LOCAL STORAGE) ==========

class MockDatabase {
  constructor() {
    this.init();
  }

  init() {
    // Initialize collections if they don't exist
    if (!localStorage.getItem('db_users')) {
      const initialUsers = [
        // Default Admin User
        {
          id: 1,
          username: 'admin',
          firstname: 'Admin',
          lastname: 'User',
          email: 'admin@delizia.com',
          password: 'admin123', // In a real app this would be hashed
          dob: '2000-01-01',
          role: 'admin',
          created_at: new Date().toISOString()
        }
      ];
      localStorage.setItem('db_users', JSON.stringify(initialUsers));
    }

    if (!localStorage.getItem('db_menu_items')) {
      this.seedMenuItems();
    }

    if (!localStorage.getItem('db_orders')) {
      localStorage.setItem('db_orders', JSON.stringify([]));
    }

    if (!localStorage.getItem('db_reviews')) {
      localStorage.setItem('db_reviews', JSON.stringify([]));
    }
  }

  seedMenuItems() {
    const menuItems = [
      { id: 1, name: 'Margherita Pizza', description: 'Classic pizza with fresh mozzarella and basil', price: 12.99, category: 'Pizza', image_url: 'images/L5.jpg' },
      { id: 2, name: 'Pepperoni Pizza', description: 'Delicious pizza topped with pepperoni', price: 13.99, category: 'Pizza', image_url: 'images/L4.jpg' },
      { id: 3, name: 'Vegetarian Pizza', description: 'Fresh vegetables on a crispy crust', price: 11.99, category: 'Pizza', image_url: 'images/p3.jpg' },
      { id: 4, name: 'BBQ Chicken Pizza', description: 'Tender chicken with BBQ sauce', price: 14.99, category: 'Pizza', image_url: 'images/BBQ.jpg' },
      { id: 5, name: 'Kabab Crust Pizza', description: 'Unique kabab crust pizza', price: 12.99, category: 'Pizza', image_url: 'images/KBCP.jpg' },
      { id: 6, name: 'Classic Burger', description: 'Juicy beef patty with fresh toppings', price: 9.99, category: 'Burger', image_url: 'images/F3.jpg' },
      { id: 7, name: 'Cheese Burger', description: 'Double cheese with beef patty', price: 10.50, category: 'Burger', image_url: 'images/F5.jpg' },
      { id: 8, name: 'Veggie Burger', description: 'Healthy plant-based burger', price: 8.99, category: 'Burger', image_url: 'images/F4.jpg' },
      { id: 9, name: 'Zinger Burger', description: 'Crispy chicken burger', price: 7.99, category: 'Burger', image_url: 'images/F1.jpg' },
      { id: 10, name: 'Tower Burger', description: 'Tall burger with hashbrown', price: 7.99, category: 'Burger', image_url: 'images/F2.jpg' },
      { id: 11, name: 'Cold Drinks', description: 'Refreshing sodas', price: 1.99, category: 'Beverages', image_url: 'images/C1.jpg' },
      { id: 12, name: 'Fresh Lemonade', description: 'Zesty fresh lemonade', price: 2.99, category: 'Beverages', image_url: 'images/C2.jpg' },
      { id: 13, name: 'Iced Tea', description: 'Chilled tea', price: 0.99, category: 'Beverages', image_url: 'images/C3.jpg' },
      { id: 14, name: 'Milkshakes', description: 'Creamy milkshakes', price: 3.49, category: 'Beverages', image_url: 'images/C4.jpg' },
      { id: 15, name: 'Coffee', description: 'Hot brewed coffee', price: 2.99, category: 'Beverages', image_url: 'images/C5.jpg' }
    ];
    localStorage.setItem('db_menu_items', JSON.stringify(menuItems));
  }

  // --- Helpers ---
  getTable(tableName) {
    return JSON.parse(localStorage.getItem(tableName) || '[]');
  }

  saveTable(tableName, data) {
    localStorage.setItem(tableName, JSON.stringify(data));
  }

  generateId(tableName) {
    const data = this.getTable(tableName);
    return data.length > 0 ? Math.max(...data.map(item => item.id)) + 1 : 1;
  }
}

const db = new MockDatabase();

// ========== API CLIENT (REFACTORED FOR STATIC SITE) ==========

class APIClient {
  constructor() {
    this.user = JSON.parse(localStorage.getItem('currentUser') || 'null');
  }

  // --- Auth ---

  isAuthenticated() {
    return !!this.user;
  }

  isAdmin() {
    return this.user && this.user.role === 'admin';
  }

  async login(username, password) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const users = db.getTable('db_users');
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
      this.user = user;
      localStorage.setItem('currentUser', JSON.stringify(user));
      return { success: true, user: user };
    } else {
      throw new Error('Invalid username or password');
    }
  }

  async register(firstname, lastname, email, username, password, dob) {
    await new Promise(resolve => setTimeout(resolve, 500));

    const users = db.getTable('db_users');

    if (users.find(u => u.username === username)) {
      throw new Error('Username already exists');
    }
    if (users.find(u => u.email === email)) {
      throw new Error('Email already exists');
    }

    const newUser = {
      id: db.generateId('db_users'),
      firstname,
      lastname,
      email,
      username,
      password,
      dob,
      role: 'user', // Default role
      created_at: new Date().toISOString()
    };

    users.push(newUser);
    db.saveTable('db_users', users);

    return { success: true, message: 'Registration successful! Please log in.' };
  }

  logout() {
    this.user = null;
    localStorage.removeItem('currentUser');
  }

  // --- Menu ---

  async getMenu() {
    return db.getTable('db_menu_items');
  }

  async addProduct(product) {
    if (!this.isAdmin()) throw new Error('Unauthorized');

    const products = db.getTable('db_menu_items');
    const newProduct = {
      ...product,
      id: db.generateId('db_menu_items'),
      price: parseFloat(product.price)
    };
    products.push(newProduct);
    db.saveTable('db_menu_items', products);
    return newProduct;
  }

  async deleteProduct(productId) {
    if (!this.isAdmin()) throw new Error('Unauthorized');

    let products = db.getTable('db_menu_items');
    products = products.filter(p => p.id !== productId);
    db.saveTable('db_menu_items', products);
    return { success: true };
  }

  // --- Cart/Orders ---

  async validateCart(items) {
    // In local mode, we just verify items exist in our "db"
    const dbItems = db.getTable('db_menu_items');

    const validatedItems = items.map(item => {
      // Try to find by ID (if we were using IDs properly) or by Match Name logic if ID fails
      // For simplicity in this migration, let's rely on info passed or simple validation
      const found = dbItems.find(p => p.name === item.name); // Using name matching for current practicepage.html compatibility

      return {
        ...item,
        price: found ? found.price : item.price // Update price from DB if found
      };
    });

    return { validatedItems };
  }

  async createOrder(items, totalPrice) {
    if (!this.isAuthenticated()) throw new Error('Must be logged in');

    const orders = db.getTable('db_orders');
    const newOrder = {
      id: db.generateId('db_orders'),
      user_id: this.user.id,
      username: this.user.username,
      items: items,
      total_price: totalPrice,
      status: 'Pending',
      created_at: new Date().toISOString()
    };

    orders.push(newOrder);
    db.saveTable('db_orders', orders);

    return { success: true, orderId: newOrder.id };
  }

  async getAllOrders() {
    if (!this.isAdmin()) throw new Error('Unauthorized');
    return db.getTable('db_orders').sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }

  async getUserOrders() {
    if (!this.isAuthenticated()) throw new Error('Must be logged in');
    const orders = db.getTable('db_orders');
    return orders.filter(o => o.user_id === this.user.id).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }

  // --- Reviews ---
  async getReviews() {
    return db.getTable('db_reviews');
  }

  async submitReview(username, rating, text) {
    const reviews = db.getTable('db_reviews');
    const newReview = {
      id: db.generateId('db_reviews'),
      username,
      rating,
      text,
      created_at: new Date().toISOString()
    };
    reviews.push(newReview);
    db.saveTable('db_reviews', reviews);
    return { success: true };
  }
}

// Global Instance
const api = new APIClient();

// ========== UI UTILS ==========

function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  notification.style.cssText = `
      position: fixed;
      top: 80px;
      right: 20px;
      background: ${type === 'success' ? '#4caf50' : type === 'error' ? '#f44336' : '#2196F3'};
      color: white;
      padding: 15px 25px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
      z-index: 10000;
      animation: slideInDown 0.3s ease-out;
    `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = 'slideInUp 0.3s ease-out';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

function showLoader() {
  const loader = document.createElement('div');
  loader.id = 'globalLoader';
  loader.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
    `;

  const spinner = document.createElement('div');
  spinner.style.cssText = `
      width: 50px;
      height: 50px;
      border: 5px solid #f3f3f3;
      border-top: 5px solid #ff6347;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    `;

  loader.appendChild(spinner);
  document.body.appendChild(loader);

  // Add keyframe animation if not present
  if (!document.getElementById('spinner-style')) {
    const style = document.createElement('style');
    style.id = 'spinner-style';
    style.innerHTML = `@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`;
    document.head.appendChild(style);
  }

  return loader;
}

function hideLoader(loader) {
  if (loader) loader.remove();
}

// ========== CART MANAGER ==========
class EnhancedCartManager {
  constructor() {
    this.cart = JSON.parse(localStorage.getItem('cart') || '[]');
  }

  addItem(item) {
    const existingItem = this.cart.find(i => i.name === item.name); // Using name for grouping simple items

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cart.push(item);
    }

    this.saveCart();
    showNotification(`${item.name} added to cart!`, 'success');
  }

  removeItem(itemId) {
    this.cart = this.cart.filter(item => item.id !== itemId);
    this.saveCart();
  }

  updateQuantity(itemId, quantity) {
    const item = this.cart.find(i => i.id === itemId);
    if (item) {
      item.quantity = Math.max(1, quantity);
      this.saveCart();
    }
  }

  clearCart() {
    this.cart = [];
    this.saveCart();
  }

  getTotalPrice() {
    return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  }

  saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  async checkout() {
    if (!api.isAuthenticated()) {
      showNotification('Please log in to checkout', 'error');
      setTimeout(() => window.location.href = 'login.html', 1000);
      return;
    }

    if (this.cart.length === 0) {
      showNotification('Your cart is empty', 'error');
      return;
    }

    try {
      const loader = showLoader();

      // Create order
      const validated = await api.validateCart(this.cart);
      await api.createOrder(
        validated.validatedItems,
        this.getTotalPrice()
      );

      hideLoader(loader);

      showNotification('Order placed successfully!', 'success');
      this.clearCart();

      setTimeout(() => {
        // In a real app we might go to orders page, but for now just stay or go home
        window.location.href = 'practicepage.html';
      }, 2000);
    } catch (error) {
      hideLoader(loader);
      showNotification(error.message, 'error');
    }
  }
}

const enhancedCart = new EnhancedCartManager();
