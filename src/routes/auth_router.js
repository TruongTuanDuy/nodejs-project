var express = require('express');
var router = express.Router();
var { asyncHandler } = require('../helpers/async_handler');
const upload = require('../helpers/uploadImg');

const AuthController = require('../controllers/auth_controller');

/* GET home page. */
router.post('/register', asyncHandler(AuthController.register));

router.get('/login', asyncHandler(AuthController.login));

router.get('/forgot-password', asyncHandler(AuthController.forgotPassword));

router.put('/reset-password', asyncHandler(AuthController.resetPassword));

module.exports = router;