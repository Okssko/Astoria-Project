const Review = require('../models/Review');

// Create a new review
exports.createReview = async (req, res) => {
    try {
        const { customerName, comment, rating } = req.body;
        const review = await Review.create({ customerName, comment, rating });
        res.status(201).json(review);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get all reviews
exports.getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.findAll();
        res.status(200).json(reviews);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete a review
exports.deleteReview = async (req, res) => {
    try {
        const { id } = req.params;
        const review = await Review.findByPk(id);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        await review.destroy();
        res.status(200).json({ message: 'Review deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
