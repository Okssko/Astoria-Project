require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

const bodyParser = require('body-parser');

const app = express();
//==============================
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//=====================================

const port = 5000;

app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${port}`);
});
// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

//app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database connection
const dbConfig = {
    host: 'localhost',
    user: 'root',         // MySQL username
    password: '',         // MySQL password (if any, replace with your password)
    database: 'astoriya_db'  // Your database name
};

let db;
//==================================

async function connectToDatabase() {
    try {
        db = await mysql.createConnection(dbConfig);
        console.log('Successfully connected to the database.');
    } catch (err) {
        console.error('Error connecting to the database:', err);
        process.exit(1);
    }
}

// Connect to the database when the server starts
connectToDatabase();

// ===================== CRUD API ===================== //



// Set up storage for Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads');  // Directory to store uploaded images
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));  // Use timestamp as file name
    }
});

// Set up Multer middleware
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 },  // Limit file size to 5MB
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png/;
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = fileTypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb('Error: Images Only!');
        }
    }
});

// API to add a new menu item with an image
app.post('/api/menu', upload.single('menu-image'), async (req, res) => {
    console.log('Received menu item submission:', req.body);
    console.log('File:', req.file);

    const { 'menu-item': name, 'menu-price': price, 'menu-description': description, 'menu-category': category } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    if (!name || !price || !description || !category || !image) {
        console.log('Validation failed:', { name, price, description, category, image });
        return res.status(400).json({ error: 'All fields, including the image, are required' });
    }

    try {
        console.log('Attempting to insert into database:', { name, price, description, category, image });
        const [result] = await db.query(
            'INSERT INTO menu_items (name, price, description, category, image) VALUES (?, ?, ?, ?, ?)',
            [name, price, description, category, image]
        );
        console.log('Inserted menu item:', result);
        res.json({ id: result.insertId, name, price, description, category, image });
    } catch (err) {
        console.error('Error inserting menu item:', err);
        res.status(500).json({ error: 'Failed to add menu item', details: err.message });
    }
});


// Fetch all menu items
app.get('/api/menu', async (req, res) => {
    try {
        const [results] = await db.query('SELECT * FROM menu_items');
        res.json(results);  // Send the results as a JSON response
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch menu items' });
    }
});

// Add a new menu item
app.post('/api/menu', async (req, res) => {
    const { name, price, description, category } = req.body;
    try {
        const [result] = await db.query('INSERT INTO menu_items (name, price, description, category) VALUES (?, ?, ?, ?)', [name, price, description, category]);
        res.json({ id: result.insertId, name, price, description, category });
    } catch (err) {
        res.status(500).json({ error: 'Failed to add menu item' });
    }
});

// Delete a menu item
app.delete('/api/menu/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM menu_items WHERE id = ?', [id]);
        res.json({ message: 'Menu item deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete menu item' });
    }
});

// ===================== Auth API ===================== //
// Test MySQL connection route
app.get('/test-db', async (req, res) => {
    try {
        const [results] = await db.query('SELECT 1 + 1 AS solution');
        res.send(`Database connected. The solution is: ${results[0].solution}`);
    } catch (err) {
        console.error('Error querying the database:', err);
        res.status(500).send('Error querying the database');
    }
});

// JWT secret key (should be stored securely, e.g., in environment variables)
const JWT_SECRET = '4b85a41722d55db3b4d06e73018f7d22698ff4567a32d5eff2fe10c9de48f221107292c34a54ea56\n' +
    '530fc6884ea3196a31e8a3d3900c2b2987194456e541a1db\n';

// Signup route
app.post('/api/signup', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if user already exists
        const [existingUsers] = await db.query('SELECT * FROM customers WHERE email = ?', [email]);
        if (existingUsers.length > 0) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert new user
        const [result] = await db.query(
            'INSERT INTO customers (name, email, password) VALUES (?, ?, ?)',
            [name, email, hashedPassword]
        );

        res.status(201).json({ message: 'User created successfully', userId: result.insertId });
    } catch (err) {
        console.error('Error in signup:', err);
        res.status(500).json({ message: 'Error creating user' });
    }
});

// Login route
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user
        const [users] = await db.query('SELECT * FROM customers WHERE email = ?', [email]);
        if (users.length === 0) {
            return res.status(401).json({ message: 'Authentication failed' });
        }

        const user = users[0];

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Authentication failed' });
        }

        // Generate JWT
        const token = jwt.sign(
            { userId: user.id, email: user.email },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ message: 'Authentication successful', token });
    } catch (err) {
        console.error('Error in login:', err);
        res.status(500).json({ message: 'Error during authentication' });
    }
});

// Middleware to verify JWT
function verifyToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ message: 'No token provided' });

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ message: 'Failed to authenticate token' });
        req.userId = decoded.userId;
        next();
    });
}

// Protected route 
app.get('/api/protected', verifyToken, (req, res) => {
    res.json({ message: 'This is a protected route', userId: req.userId });
});
//================================
// Root route to serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Review submission route
app.post('/api/reviews', async (req, res) => {
    const { customer_name, rating, comment } = req.body;

    try {
        const [result] = await db.query(
            'INSERT INTO reviews (customer_name, rating, comment) VALUES (?, ?, ?)',
            [customer_name, rating, comment]
        );
        res.status(201).json({ message: 'Review submitted successfully', id: result.insertId });
    } catch (err) {
        console.error('Error inserting review:', err);
        res.status(500).json({ error: 'Failed to submit review' });
    }
});

//======================================ORDERS==============

// Order submission endpoint
app.post('/api/orders', async (req, res) => {
    const { customerName, email, phone, address, items, total } = req.body;

    try {
        // Insert order data into orders table
        const [orderResult] = await db.query(
            'INSERT INTO orders (customer_name, email, phone, address, total, created_at) VALUES (?, ?, ?, ?, ?, NOW())',
            [customerName, email, phone, address, total]
        );

        const orderId = orderResult.insertId;

        // Insert each item in the order_items table
        for (const item of items) {
            await db.query(
                'INSERT INTO order_items (order_id, item_name, item_price, item_quantity) VALUES (?, ?, ?, ?)',
                [orderId, item.name, item.price, item.quantity]
            );
        }

        res.status(201).json({ message: 'Order placed successfully', orderId });
    } catch (error) {
        console.error('Error placing order:', error);
        res.status(500).json({ message: 'Failed to place order', error });
    }
});

// order admin page
// API route to fetch orders
app.get('/api/orders', async (req, res) => {
    try {
        const [orders] = await db.query('SELECT * FROM orders');  // Use async/await
        res.json(orders);  // Send back the JSON data
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ message: 'Error fetching orders' });
    }
});


//==============================REWIEWS==================================

// Get all reviews route
app.get('/api/reviews', async (req, res) => {
    try {
        const [results] = await db.query('SELECT * FROM reviews ORDER BY created_at DESC LIMIT 10');
        res.json(results);
    } catch (err) {
        console.error('Error fetching reviews:', err);
        res.status(500).json({ error: 'Failed to fetch reviews' });
    }
});


// Route to handle form submission
app.post('/api/reservations', async (req, res) => {
    const { name, email, date, time, guests, phone } = req.body;

    const sql = 'INSERT INTO reservations (name, email, reservation_date, reservation_time, guests, phone) VALUES (?, ?, ?, ?, ?, ?)';

    try {
        const [result] = await db.query(sql, [name, email, date, time, guests, phone]);
        res.status(200).json({ message: 'Reservation submitted successfully' });
    } catch (err) {
        console.error('Error inserting data:', err);
        res.status(500).json({ message: 'Database error' });
    }
});

// API endpoint to fetch reservations
app.get('/api/reservations', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM reservations ORDER BY reservation_date DESC');
        res.json(rows);
    } catch (err) {
        console.error('Error fetching reservations:', err);
        res.status(500).json({ message: 'Error fetching reservations' });
    }
});

// Route to get all customers
app.get('/api/customers', async (req, res) => {
    try {
        const [customers] = await db.query('SELECT * FROM customers ORDER BY created_at DESC');
        res.json(customers);
    } catch (error) {
        console.error('Error fetching customers:', error);
        res.status(500).json({ error: 'Failed to fetch customers' });
    }
});
//=====================================cart

app.post('/api/place-order', async (req, res) => {
    const { cart, shippingDetails, paymentMethod } = req.body;

    // Calculate the total price from the cart
    const total = cart.reduce((acc, item) => acc + parseFloat(item.price), 0);

    // Generate a random orderId
    const orderId = Math.random().toString(36).substr(2, 9);

    // Insert the order into the database
    const sql = `
        INSERT INTO orders (orderId, customerName, total, paymentMethod, shippingDetails)
        VALUES (?, ?, ?, ?, ?)
    `;
    try {
        const [result] = await db.query(sql, [
            orderId,
            shippingDetails.name,
            total,
            paymentMethod,
            JSON.stringify(shippingDetails)
        ]);

        console.log('Order placed:', { orderId, cart, shippingDetails, paymentMethod });
        res.json({ success: true, orderId });
    } catch (error) {
        console.error('Error placing order:', error);
        res.status(500).json({ success: false, message: 'Failed to place order' });
    }
});

// POST endpoint to handle reservations ====================reservation APP android
app.post('/api/reservations', (req, res) => {
    const { name, email, reservation_date, reservation_time, guests, phone } = req.body;

    const sql = 'INSERT INTO reservations (name, email, reservation_date, reservation_time, guests, phone) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [name, email, reservation_date, reservation_time, guests, phone], (err, result) => {
        if (err) {
            console.error('Error creating reservation:', err);
            return res.status(500).send('Error creating reservation');
        }
        res.status(201).send('Reservation created successfully');
    });
});

//
// GET endpoint to fetch menu items
app.get('/api/menu', (req, res) => {
    const sql = 'SELECT * FROM menu_items';
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error fetching menu:', err);
            return res.status(500).send('Error fetching menu');
        }
        res.json(result);
    });
});

// POST endpoint to handle orders
app.post('/api/orders', (req, res) => {
    const { items, total_price, customer_name, phone } = req.body;

    const sql = 'INSERT INTO orders (items, total_price, customer_name, phone) VALUES (?, ?, ?, ?)';
    db.query(sql, [items, total_price, customer_name, phone], (err, result) => {
        if (err) {
            console.error('Error placing order:', err);
            return res.status(500).send('Error placing order');
        }
        res.status(201).send('Order placed successfully');
    });
});
//====================== Contact======================================= //
// Handle POST request to save contact form data
app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;

    // Log the request body for debugging
    console.log('Received data:', req.body);

    // Validate form inputs
    if (!name || !email || !message) {
        console.log('Validation failed: missing data.');
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Insert form data into the database
    const sql = 'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)';
    db.query(sql, [name, email, message], (err, result) => {
        if (err) {
            console.error('Database error:', err.message);
            return res.status(500).json({ message: 'Database error' });
        }

        res.json({ message: 'Thank you for contacting us!' });
    });
});
// DELETE contact by ID
app.delete('/api/contacts/:id', async (req, res) => {
    const contactId = req.params.id;

    try {
        const sql = 'DELETE FROM contacts WHERE id = ?';
        const [result] = await db.query(sql, [contactId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Contact not found' });
        }

        res.json({ message: 'Contact deleted successfully' });
    } catch (error) {
        console.error('Error deleting contact:', error.message);
        res.status(500).json({ message: 'Database error' });
    }
});
// PUT route to mark a contact as answered or unanswered
app.put('/api/contacts/:id/answered', async (req, res) => {
    const contactId = req.params.id;

    try {
        // Fetch the current status of the contact
        const [contact] = await db.query('SELECT answered FROM contacts WHERE id = ?', [contactId]);

        if (!contact.length) {
            return res.status(404).json({ message: 'Contact not found' });
        }

        // Toggle the 'answered' status
        const newStatus = contact[0].answered ? 0 : 1;
        const sql = 'UPDATE contacts SET answered = ? WHERE id = ?';
        await db.query(sql, [newStatus, contactId]);

        res.json({ message: 'Contact status updated successfully' });
    } catch (error) {
        console.error('Error updating contact status:', error.message);
        res.status(500).json({ message: 'Database error' });
    }
});

//========contact admin===========//
// Route to get all contacts
// Route to get all contacts
app.get('/api/contacts', async (req, res) => {
    try {
        const sql = 'SELECT * FROM contacts'; // Ensure your table is named 'contacts'
        const [results] = await db.query(sql); // Promise-based query

        console.log('Contacts retrieved:', results); // Logs for debugging

        res.json(results); // Send the result back to the client
    } catch (err) {
        console.error('Database error:', err.message); // Logs any database error
        res.status(500).json({ message: 'Database error' });
    }
});

// ===================== Server Startup and Shutdown ===================== //

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Handle server shutdown
process.on('SIGINT', async () => {
    if (db) {
        await db.end();
        console.log('Database connection closed.');
    }
    process.exit();
});