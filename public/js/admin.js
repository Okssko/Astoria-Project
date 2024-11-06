document.addEventListener('DOMContentLoaded', function() {
    const menuForm = document.getElementById('menu-form');
    const submitButton = menuForm.querySelector('button[type="submit"]');
    const menuItemsList = document.getElementById('menu-items-list');
    const menuCount = document.getElementById('menu-count');

    // Function to fetch and display menu items
    function fetchMenuItems() {
        console.log('Fetching menu items...');
        fetch('/api/menu')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(items => {
                console.log('Received items:', items);
                menuItemsList.innerHTML = '';
                items.forEach(item => {
                    const li = document.createElement('li');
                    li.innerHTML = `
                        <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px;">
                        <span>${item.name} - $${item.price}</span>
                        <button onclick="deleteMenuItem(${item.id})">Delete</button>
                    `;
                    menuItemsList.appendChild(li);
                });
                menuCount.textContent = `${items.length} Items`;
            })
            .catch(error => console.error('Error fetching menu items:', error));
    }

    // Function to handle form submission
    // Function to handle form submission
    menuForm.addEventListener('submit', function(e) {
        e.preventDefault();
        submitButton.disabled = true;  // Disable the button
        const formData = new FormData(this);

        console.log('Submitting form data:', Object.fromEntries(formData));

        fetch('/api/menu', {
            method: 'POST',
            body: formData
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Success:', data);
                fetchMenuItems();  // Refresh the menu items list
                menuForm.reset();  // Clear the form
            })
            .catch(error => console.error('Error:', error))
            .finally(() => {
                submitButton.disabled = false;  // Re-enable the button
            });
    });

    // Function to delete a menu item
    window.deleteMenuItem = function(id) {
        if (confirm('Are you sure you want to delete this item?')) {
            fetch(`/api/menu/${id}`, { method: 'DELETE' })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Success:', data);
                    fetchMenuItems();  // Refresh the menu items list
                })
                .catch(error => console.error('Error:', error));
        }
    };

    // Initial fetch of menu items
    fetchMenuItems();
});