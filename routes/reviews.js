const express = require('express');
const router = express.Router();
const db = require('../config/database'); // Database connection

// POST a review
router.post('/', (req, res) => {
    const { customer_id, rating, comment } = req.body;

    if (!customer_id || !rating || !comment) {
        return res.status(400).json({ error: 'Please provide customer_id, rating, and comment.' });
    }

    const query = 'INSERT INTO reviews (customer_id, rating, comment) VALUES (?, ?, ?)';
    db.query(query, [customer_id, rating, comment], (err, result) => {
        if (err) {
            console.error('Error inserting review:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(201).json({ message: 'Review added successfully', reviewId: result.insertId });
    });
});

// GET all reviews
router.get('/', (req, res) => {
    const query = 'SELECT * FROM reviews';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching reviews:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(results);
    });
});

// Route to handle form submission
app.post('/api/reservations', (req, res) => {
    const { name, email, date, time, guests, phone } = req.body;

    const sql = 'INSERT INTO reservations (name, email, reservation_date, reservation_time, guests, phone) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [name, email, date, time, guests, phone], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).json({ message: 'Database error' });
        }
        res.status(200).json({ message: 'Reservation submitted successfully' });
    });
});
module.exports = router;
