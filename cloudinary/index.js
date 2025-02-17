const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
// const express = require('express');
// const multer = require('multer');

// const app = express();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
})

// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: 'some-folder-name',
//     format: async (req, file) => 'png', // supports promises as well
//     public_id: (req, file) => 'computed-filename-using-request',
//   },
// });

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'YelpCamp',
        allowedFormats: ['jpeg', 'png', 'jpg'],
        transformation: [
            { fetch_format: 'auto', quality: 'auto' }, // 최적화
            { width: 1600, height: 1200, crop: 'auto', gravity: 'auto' } // 자동 크롭
        ]
    }
});

// const parser = multer({ storage: storage });

// app.post('/upload', parser.single('image'), function (req, res) {
//   res.json(req.file);
// });

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

module.exports = {
    cloudinary,
    storage,
    fileFilter,
    limits
}
