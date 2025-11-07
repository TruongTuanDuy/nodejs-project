const multer = require('multer');

const limits = { fileSize: 2 * 1024 * 1024 }; // 1MB

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];

    if (!allowedTypes.includes(file.mimetype)) {
        return cb(new Error('❌ Chỉ chấp nhận định dạng JPG, PNG, hoặc WEBP.'));
    }
    cb(null, true);
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})
module.exports = multer({ storage: storage, fileFilter: fileFilter, limits: limits });