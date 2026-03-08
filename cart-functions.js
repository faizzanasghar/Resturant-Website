// Cart Management System with localStorage persistence

class CartManager {
    constructor() {
        this.STORAGE_KEY = 'delizaCart';
        this.cart = this.loadCart();
    }

    // Load cart from localStorage
    loadCart() {
        const savedCart = localStorage.getItem(this.STORAGE_KEY);
        return savedCart ? JSON.parse(savedCart) : [];
    }

    // Save cart to localStorage
    saveCart() {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.cart));
    }

    // Add item to cart
    addItem(name, price, quantity = 1) {
        const existingItem = this.cart.find(item => item.name === name);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.cart.push({
                name: name,
                price: parseFloat(price),
                quantity: quantity
            });
        }
        this.saveCart();
        return this.cart;
    }

    // Remove item from cart
    removeItem(name) {
        this.cart = this.cart.filter(item => item.name !== name);
        this.saveCart();
        return this.cart;
    }

    // Update item quantity
    updateQuantity(name, quantity) {
        const item = this.cart.find(item => item.name === name);
        if (item) {
            if (quantity <= 0) {
                this.removeItem(name);
            } else {
                item.quantity = quantity;
                this.saveCart();
            }
        }
        return this.cart;
    }

    // Clear entire cart
    clearCart() {
        this.cart = [];
        this.saveCart();
    }

    // Get total price
    getTotalPrice() {
        return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    // Get cart items
    getCart() {
        return this.cart;
    }

    // Get item count
    getItemCount() {
        return this.cart.reduce((count, item) => count + item.quantity, 0);
    }
}

// Initialize cart manager
const cartManager = new CartManager();

// Update cart display on page load
document.addEventListener('DOMContentLoaded', function() {
    // Handle "Add to Cart" button clicks from product pages
    const addToCartLinks = document.querySelectorAll('.add-to-cart-btn');
    addToCartLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const url = this.href;
            const params = new URLSearchParams(url.split('?')[1]);
            const itemName = decodeURIComponent(params.get('item'));
            const itemPrice = params.get('price');
            
            if (itemName && itemPrice) {
                e.preventDefault();
                cartManager.addItem(itemName, itemPrice, 1);
                alert(itemName + ' added to cart!');
                return false;
            }
        });
    });

    // Handle cart page functionality
    if (document.getElementById('cart-table')) {
        renderCart();
        setupCartEventListeners();
    }
});

// Render cart items in the cart page
function renderCart() {
    const cart = cartManager.getCart();
    const tableBody = document.querySelector('tbody');
    
    if (!tableBody) return;

    // Clear existing rows
    tableBody.innerHTML = '';

    if (cart.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="5" style="text-align: center;">Your cart is empty</td></tr>';
        document.getElementById('total-price').textContent = '$0.00';
        return;
    }

    // Add cart items to table
    cart.forEach((item) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td>
                <input type="number" value="${item.quantity}" min="1" class="quantity" data-item="${item.name}">
            </td>
            <td>$${(item.price * item.quantity).toFixed(2)}</td>
            <td><button class="remove-btn" data-item="${item.name}">Remove</button></td>
        `;
        tableBody.appendChild(row);
    });

    updateTotal();
}

// Setup event listeners for cart page
function setupCartEventListeners() {
    // Quantity change listener
    document.querySelectorAll('.quantity').forEach(input => {
        input.addEventListener('change', function() {
            const itemName = this.dataset.item;
            const newQuantity = parseInt(this.value);
            
            if (newQuantity <= 0) {
                cartManager.removeItem(itemName);
            } else {
                cartManager.updateQuantity(itemName, newQuantity);
            }
            renderCart();
        });
    });

    // Remove button listener
    document.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', function() {
            const itemName = this.dataset.item;
            cartManager.removeItem(itemName);
            renderCart();
        });
    });

    // Checkout button
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            const cart = cartManager.getCart();
            if (cart.length === 0) {
                alert('Your cart is empty!');
                return;
            }
            alert('Checkout functionality coming soon!\nTotal: $' + cartManager.getTotalPrice().toFixed(2));
        });
    }

    // Clear cart button
    const clearCartBtn = document.getElementById('clear-cart-btn');
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to clear your cart?')) {
                cartManager.clearCart();
                renderCart();
            }
        });
    }
}

// Update total price
function updateTotal() {
    const totalPriceElement = document.getElementById('total-price');
    if (totalPriceElement) {
        totalPriceElement.textContent = `$${cartManager.getTotalPrice().toFixed(2)}`;
    }
}
