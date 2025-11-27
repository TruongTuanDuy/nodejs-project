const cloudinary = require('cloudinary').v2;
//Khởi tạo cấu hình Cloudinary
cloudinary.config({
    cloud_name: 'doetags3c',
    api_key: '558931797145857',
    api_secret: 'c9_S3-PXSU-SGcsgCwrYyP6GL2E'
});

module.exports = cloudinary;