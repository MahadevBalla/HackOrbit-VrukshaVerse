// middleware/uploadMiddleware.js
const multer = require('multer');
const multerS3 = require('multer-s3');
const s3 = require('../services/s3'); // this should be your s3.js setup

const upload = multer({
    storage: multerS3({
        s3,
        bucket: process.env.AWS_S3_BUCKET,
        acl: 'public-read',
        key: function(req, file, cb) {
            const fileName = `plants/${Date.now()}_${file.originalname}`;
            cb(null, fileName);
        }
    })
});

module.exports = upload;
