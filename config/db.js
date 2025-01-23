const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const dbUrl = process.env.DB_URL || 'mongodb://127.0.0.1:27017/yelp-camp';
        await mongoose.connect(dbUrl);
        console.log('Database connected');
    } catch (error) {
        console.error('Database connection error:', error);
    }
};

module.exports = connectDB;
