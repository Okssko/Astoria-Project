// Function to load menu items from the backend
async function loadMenuItems() {
    try {
        console.log('Fetching menu items...');
        const response = await fetch('/api/menu');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const menuItems = await response.json();
        console.log('Received menu items:', menuItems);

        const appetizersSection = document.getElementById('appetizers');
        const mainCoursesSection = document.getElementById('main-courses');

        if (!appetizersSection || !mainCoursesSection) {
            console.error('Could not find appetizers or main courses section');
            return;
        }

        // Clear previous content
        appetizersSection.innerHTML = '';
        mainCoursesSection.innerHTML = '';

        // Loop through the menu items and categorize them
        menuItems.forEach(item => {
            const menuItemDiv = document.createElement('div');
            menuItemDiv.classList.add('menu-item');

            const itemName = item.name || 'Unknown Item';
            const itemDescription = item.description || 'No description available.';
            const itemCategory = item.category || 'Uncategorized';
            const itemPrice = item.price || 'N/A';
            const itemImage = item.image || '/path/to/default/image.jpg';

            menuItemDiv.innerHTML = `
                <div class="menu-item-content">
                    <img src="${itemImage}" alt="${itemName}" style="width: 100px; height: 100px; object-fit: cover;">
                    <h3>${itemName}</h3>
                    <p>${itemDescription}</p>
                    <div class="menu-item-footer">
                        <span class="price">$${itemPrice}</span>
                        <button class="add-to-cart" data-name="${itemName}" data-price="${itemPrice}">Add to Cart</button>
                    </div>
                </div>
            `;

            // Categorize items into "Appetizers" or "Main Courses"
            if (itemCategory === 'Appetizer') {
                appetizersSection.appendChild(menuItemDiv);
            } else if (itemCategory === 'Main Course') {
                mainCoursesSection.appendChild(menuItemDiv);
            } else {
                console.warn(`Item "${itemName}" has unknown category: ${itemCategory}`);
            }
        });

        console.log('Menu items loaded successfully');
    } catch (err) {
        console.error('Error loading menu items:', err);
    }
}

// Load menu items when the page loads
document.addEventListener('DOMContentLoaded', loadMenuItems);
