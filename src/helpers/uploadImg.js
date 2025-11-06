const multer = require('multer');

const storage = multer.diskStorage({
    limits: { fileSize: 1 * 1024 * 1024 }, // 1MB
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/png', 'image/webp'];
        if (!allowedTypes.includes(file.mimetype)) {
            return cb(new Error('❌ Chỉ chấp nhận định dạng JPG, PNG, hoặc WEBP.'));
        }
        cb(null, true);
    },
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})
module.exports = multer({ storage: storage });