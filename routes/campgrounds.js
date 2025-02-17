const express = require('express');
const router = express.Router();

const campgrounds = require('../controllers/campgrounds');

require('express-async-errors');
const { isLoggedIn, validateCampground, isAuthor } = require('../middlewares');

// 파일 타입 및 확장자 검증을 위한 fileFilter
const fileFilter = (req, file, cb) => {
    // 허용할 파일 타입: JPEG, JPG, PNG
    const allowedFileTypes = /jpeg|jpg|png/;
    const extname = allowedFileTypes.test(file.originalname.toLowerCase());
    const mimetype = allowedFileTypes.test(file.mimetype);
    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only JPEG, JPG, and PNG files are allowed!'));
    }
};
// 파일 크기 제한 등 추가 옵션 설정
const limits = {
    fileSize: 5 * 1024 * 1024 // 5MB per file
};
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({
    storage,
    limits,
    fileFilter
});

router.route('/')
    .get(campgrounds.index)
    .post(
        isLoggedIn,
        upload.array('image', 10), // 이미지 유효성 검사 방법 필요
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
        upload.array('image', 5), // 이미지 유효성 검사 방법 필요(수량 제한, 용량 제한, 파일명 등등)
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
