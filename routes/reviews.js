const express = require('express');
const router = express.Router({ mergeParams: true });

const reviews = require('../controllers/reviews');

require('express-async-errors');
const { isLoggedIn, validateReview, isReviewAuthor } = require('../middlewares');

router.route('/')
    .post(
        isLoggedIn,
        validateReview,
        reviews.createReview
    );

router.route('/:reviewId')
    .delete(
        isLoggedIn,
        isReviewAuthor,
        reviews.deleteReview
    );

module.exports = router;
