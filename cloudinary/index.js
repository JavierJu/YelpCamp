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

module.exports = {
    cloudinary,
    storage
}
