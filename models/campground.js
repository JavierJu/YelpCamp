const mongoose = require('mongoose');
const Review = require('./review');
const Schema = mongoose.Schema;

const ImagesSchema = new Schema({
    url: String,
    filename: String
});

ImagesSchema.virtual('thumnail').get(function () {
    return this.url.replace('/upload', '/upload/w_200');
});

const CampgroundSchema = new Schema({
    title: String,
    images: [ImagesSchema],
    price: Number,
    description: String,
    location: String,
    geometry: {
        type: {
            type: String,
            enum: ['Point'], // GeoJSON 타입
            required: true,
        },
        coordinates: {
            type: [Number], // [경도, 위도]
            required: true,
        },
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
});


CampgroundSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Review.deleteMany({ _id: { $in: doc.reviews } })
    }
})

CampgroundSchema.index({ title: "text", description: "text", location: "text" });

module.exports = mongoose.model('Campground', CampgroundSchema);
