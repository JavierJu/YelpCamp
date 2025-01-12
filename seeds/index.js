
const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors, descriptions } = require('./seedHelpers');
const Campground = require('../models/campground');

// mongoose.connect('mongodb://admin:javierju12@13.208.254.200:27017/yelp-camp?authSource=admin');
mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp')
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
            author: '677a172b4fbf51c3b620ccca',
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
                    url: 'https://res.cloudinary.com/dwhuidaxq/image/upload/v1736308143/YelpCamp/mwwlipnnyobxuzfcaoll.jpg',
                    filename: 'YelpCamp/mwwlipnnyobxuzfcaoll',
                },
                {
                    url: 'https://res.cloudinary.com/dwhuidaxq/image/upload/v1736308150/YelpCamp/kauqgdw5eswlogloic7y.jpg',
                    filename: 'YelpCamp/kauqgdw5eswlogloic7y',
                }
            ]
        })

        // const geoData = await geocodingClient.forwardGeocode({
        //     query: this.location,
        //     limit: 1
        // })
        //     .send()
        // camp.geometry = geoData.body.features[0].geometry;

        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});