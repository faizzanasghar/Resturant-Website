// Wait until the DOM is fully loaded before running the script
document.addEventListener('DOMContentLoaded', function () {

    // Select all quantity input elements and remove buttons
    const quantities = document.querySelectorAll('.quantity');
    const removeButtons = document.querySelectorAll('.remove-btn');
    const totalPriceElement = document.getElementById('total-price');
    const cartItems = document.querySelectorAll('tbody tr');  // All cart items in the table

    // Item details (name, price)
    const items = [
        { name: 'BBQ Chicken Pizza', price: 10.99 },
        { name: 'Kabab Crust Pizza', price: 12.99 },
        { name: 'Delizia\'s Special Pizza', price: 11.99 },
        { name: 'Zinger Burger', price: 9.99 },
        { name: 'Tower Burger', price: 7.99 },
        { name: 'Beef Burger', price: 7.99 }
    ];

    // Function to update the total price of the cart
    function updateTotal() {
        let total = 0;
        
        // Iterate through all cart items
        cartItems.forEach((item, index) => {
            const quantity = item.querySelector('.quantity').value;  // Get the quantity
            total += quantity * items[index].price;  // Multiply price by quantity and add to total
        });

        // Update the total price on the page
        totalPriceElement.textContent = `$${total.toFixed(2)}`;
    }

    // Function to handle the "Remove" button click
    function removeItem(event) {
        const row = event.target.closest('tr');  // Get the closest row to the clicked remove button
        row.remove();  // Remove the item from the table

        // After removing an item, we need to update the total price
        updateTotal();
    }

    // Add event listeners to the quantity inputs to update the total when the quantity is changed
    quantities.forEach(input => {
        input.addEventListener('input', updateTotal);
    });

    // Add event listeners to the "Remove" buttons to remove the item from the cart
    removeButtons.forEach(button => {
        button.addEventListener('click', removeItem);
    });

    // Initialize total on page load
    updateTotal();

});
