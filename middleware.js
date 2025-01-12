const ExpressError = require('./utils/ExpressError');
const { campgroundSchema, reviewSchema } = require('./schemas');
const Campground = require('./models/campground');
const Review = require('./models/review');

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash('error', 'you must be signed in first!');
        req.session.returnTo = req.originalUrl; // 사용자가 요청했던 URL 저장
        return res.redirect('/login'); // 로그인 페이지로 리다이렉트
    }
    next();
}

module.exports.storeReturnTo = (req, res, next) => {
    if (req.session.returnTo) {
        res.locals.returnTo = req.session.returnTo; // 세션에 저장된 URL을 로컬 변수로 설정
        delete req.session.returnTo; // 세션에서 URL 제거 (더 이상 필요하지 않음)
    }
    next();
}

//Validator via Joi
module.exports.validateCampground = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

//Validator via Joi
module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

//isAuthor
module.exports.isAuthor = async (req, res, next) => {
    const campground = await Campground.findById(req.params.id);
    if (!campground.author.equals(req.user._id)) {
        req.flash('error', 'You do not have a permission!');
        return res.redirect(`/campgrounds/${campground._id}`);
    }
    next();
}

//isReviewAuthor
module.exports.isReviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review.author.equals(req.user._id)) {
        req.flash('error', 'You do not have a permission!');
        return res.redirect(`/campgrounds/${id}`);
    }
    next();
}