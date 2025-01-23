const express = require('express');
const router = express.Router();

const campgrounds = require('../controllers/campgrounds');

require('express-async-errors');
const { isLoggedIn, validateCampground, isAuthor } = require('../middlewares');

const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

router.route('/')
    .get(campgrounds.index)
    .post(
        isLoggedIn,
        upload.array('image'), // 이미지 유효성 검사 방법 필요
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
        upload.array('image'), // 이미지 유효성 검사 방법 필요(수량 제한, 용량 제한, 파일명 등등)
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
