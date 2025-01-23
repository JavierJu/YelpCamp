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
}, { timestamps: true }); // timestamps 옵션 추가

// 가상 속성 (average rating 계산)
CampgroundSchema.virtual('averageRating').get(function () {
    if (this.reviews.length === 0) return 0; // 리뷰가 없을 때 0 반환
    const total = this.reviews.reduce((sum, review) => sum + review.rating, 0);
    return Math.round(total / this.reviews.length); // 소수점 없이 정수로 반환
});

// 가상 필드 포함 시 JSON 출력 시에도 사용할 수 있도록 설정
CampgroundSchema.set('toJSON', { virtuals: true });

// 가상 속성 (총 리뷰 수)
CampgroundSchema.virtual('reviewCount').get(function () {
    return this.reviews.length;
});

CampgroundSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Review.deleteMany({ _id: { $in: doc.reviews } })
    }
})

CampgroundSchema.index({ title: "text", description: "text", location: "text" });

module.exports = mongoose.model('Campground', CampgroundSchema);
