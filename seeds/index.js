if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors, descriptions } = require('./seedHelpers');
const Campground = require('../models/campground');

const dbUrl = process.env.DB_URL || 'mongodb://127.0.0.1:27017/yelp-camp';

mongoose.connect(dbUrl);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Database connection error"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const random20 = Math.floor(Math.random() * 20);
        const randomPrice = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '6784494411fe02bf1f44dc05',
            title: `${sample(descriptors)} ${sample(places)}`,
            price: randomPrice,
            description: sample(descriptions),
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dwhuidaxq/image/upload/v1736721274/YelpCamp/w5k7rfxsh7fr7draykn1.jpg',
                    filename: 'YelpCamp/w5k7rfxsh7fr7draykn1',
                },
                {
                    url: 'https://res.cloudinary.com/dwhuidaxq/image/upload/v1736721274/YelpCamp/egqaq2jyjfefgwqfybgu.jpg',
                    filename: 'YelpCamp/egqaq2jyjfefgwqfybgu',
                },
                {
                    url: 'https://res.cloudinary.com/dwhuidaxq/image/upload/v1736721274/YelpCamp/jsmqxewtzqw1k8davskr.jpg',
                    filename: 'YelpCamp/jsmqxewtzqw1k8davskr',
                },
                {
                    url: 'https://res.cloudinary.com/dwhuidaxq/image/upload/v1736721274/YelpCamp/hs8t2bmk8mqncbkfufsk.jpg',
                    filename: 'YelpCamp/hs8t2bmk8mqncbkfufsk',
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});