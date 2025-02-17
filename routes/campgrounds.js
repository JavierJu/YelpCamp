const express = require('express');
const router = express.Router();

const campgrounds = require('../controllers/campgrounds');

require('express-async-errors');
const { isLoggedIn, validateCampground, isAuthor } = require('../middlewares');

const multer = require('multer');
const { storage, fileFilter, limits } = require('../cloudinary');

const upload = multer({
    storage,
    limits,
    fileFilter
});

router.route('/')
    .get(campgrounds.index)
    .post(
        isLoggedIn,
        upload.array('image', 10),
        validateCampground,
        campgrounds.createCampground
    );

router.route('/new')
    .get(
        isLoggedIn,
        campgrounds.renderNewForm
    );

router.route('/:id')
    .get(campgrounds.showCampground)
    .put(
        isLoggedIn,
        isAuthor,
        upload.array('image', 10),
        validateCampground,
        campgrounds.updateCampground
    )
    .delete(
        isLoggedIn,
        isAuthor,
        campgrounds.deleteCampground
    );

router.route('/:id/edit')
    .get(
        isLoggedIn,
        isAuthor,
        campgrounds.renderEditForm
    );

module.exports = router;
