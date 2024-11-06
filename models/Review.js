const db = require('../config/database');

class Review {
    static async create(customer_id, rating, comment) {
        const [result] = await db.execute(
            'INSERT INTO reviews (customer_id, rating, comment) VALUES (?, ?, ?)',
            [customer_id, rating, comment]
        );
        return result;
    }

    static async findAll() {
        const [rows] = await db.execute('SELECT * FROM reviews');
        return rows;
    }
}

module.exports = Review;
