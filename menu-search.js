// Menu Search and Filter Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Create search and filter container
    const menuSection = document.querySelector('.menu');
    if (!menuSection) return;

    // Insert search and filter UI
    const searchHTML = `
        <div style="background-color: white; padding: 20px; border-radius: 5px; margin-bottom: 30px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
            <div style="max-width: 500px; margin: 0 auto;">
                <input type="text" id="search-input" placeholder="Search for pizza, burger, or drink..." style="width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 5px; font-size: 1em; margin-bottom: 15px;">
                <div id="filter-buttons" style="display: flex; gap: 10px; flex-wrap: wrap; justify-content: center;">
                    <button class="filter-btn active" data-category="all" style="padding: 10px 20px; border: 2px solid #ff6347; background-color: #ff6347; color: white; border-radius: 5px; cursor: pointer; transition: all 0.3s;">All Items</button>
                    <button class="filter-btn" data-category="Pizza" style="padding: 10px 20px; border: 2px solid #ff6347; background-color: white; color: #ff6347; border-radius: 5px; cursor: pointer; transition: all 0.3s;">🍕 Pizzas</button>
                    <button class="filter-btn" data-category="Burger" style="padding: 10px 20px; border: 2px solid #ff6347; background-color: white; color: #ff6347; border-radius: 5px; cursor: pointer; transition: all 0.3s;">🍔 Burgers</button>
                    <button class="filter-btn" data-category="Drink" style="padding: 10px 20px; border: 2px solid #ff6347; background-color: white; color: #ff6347; border-radius: 5px; cursor: pointer; transition: all 0.3s;">🥤 Drinks</button>
                </div>
            </div>
        </div>
    `;

    menuSection.insertAdjacentHTML('afterbegin', searchHTML);

    // Get all menu items
    const allMenuItems = document.querySelectorAll('.menu-item');
    
    // Create a mapping of items with their data
    const menuData = Array.from(allMenuItems).map(item => {
        const name = item.querySelector('h3').textContent.toLowerCase();
        const price = item.querySelector('.price').textContent;
        
        // Determine category
        let category = 'all';
        if (name.includes('pizza') || name.includes('alfredo') || name.includes('margherita') || name.includes('mushroom') || name.includes('cheese') || name.includes('pepperoni') || name.includes('bbq chicken') || name.includes('kabab') || name.includes('delizia')) {
            category = 'Pizza';
        } else if (name.includes('burger')) {
            category = 'Burger';
        } else if (name.includes('drink') || name.includes('coffee') || name.includes('lemonade') || name.includes('tea') || name.includes('milkshake') || name.includes('cold')) {
            category = 'Drink';
        }
        
        return {
            element: item,
            name: name,
            category: category,
            price: price
        };
    });

    // Search functionality
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', function() {
        filterMenuItems();
    });

    // Filter buttons functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => {
                btn.style.backgroundColor = 'white';
                btn.style.color = '#ff6347';
            });
            
            // Add active class to clicked button
            this.style.backgroundColor = '#ff6347';
            this.style.color = 'white';
            
            filterMenuItems();
        });
    });

    // Filter function
    function filterMenuItems() {
        const searchTerm = searchInput.value.toLowerCase();
        const activeFilter = document.querySelector('.filter-btn').parentElement.querySelector('.filter-btn[style*="background-color: rgb(255, 99, 71)"]');
        const selectedCategory = activeFilter ? activeFilter.dataset.category : 'all';

        let visibleCount = 0;

        menuData.forEach(item => {
            let matches = true;

            // Check search term
            if (searchTerm && !item.name.includes(searchTerm)) {
                matches = false;
            }

            // Check category
            if (selectedCategory !== 'all' && item.category !== selectedCategory) {
                matches = false;
            }

            // Show or hide item
            if (matches) {
                item.element.style.display = '';
                visibleCount++;
            } else {
                item.element.style.display = 'none';
            }
        });

        // Show "no results" message if needed
        let noResultsMsg = document.getElementById('no-results-msg');
        if (visibleCount === 0) {
            if (!noResultsMsg) {
                noResultsMsg = document.createElement('div');
                noResultsMsg.id = 'no-results-msg';
                noResultsMsg.style.cssText = 'text-align: center; padding: 40px; color: #666; font-size: 1.2em;';
                document.querySelector('.menu-items').appendChild(noResultsMsg);
            }
            noResultsMsg.textContent = 'No items found. Please try a different search.';
        } else if (noResultsMsg) {
            noResultsMsg.remove();
        }
    }

    // Set up button click tracking
    const filterContainer = document.getElementById('filter-buttons');
    const buttons = filterContainer.querySelectorAll('button');
    
    buttons.forEach(btn => {
        btn.addEventListener('click', function() {
            buttons.forEach(b => {
                b.style.backgroundColor = 'white';
                b.style.color = '#ff6347';
            });
            this.style.backgroundColor = '#ff6347';
            this.style.color = 'white';
            filterMenuItems();
        });
    });
});
