var express = require('express');
var router = express.Router();
var { asyncHandler } = require('../app/helpers/async_handler');
const upload = require('../app/helpers/uploadImg');

const AuthController = require('../controllers/auth_controller');
const { checkLogin } = require('../app/middlewares/check_login');

/* GET home page. */
router.post('/register', asyncHandler(AuthController.register));

router.post('/login', asyncHandler(AuthController.login));

router.post('/forgot-password', asyncHandler(AuthController.forgotPassword));

router.put('/reset-password', asyncHandler(AuthController.resetPassword));

router.use(checkLogin);

router.get('/me', asyncHandler(AuthController.getMe));//info

router.put('/me', asyncHandler(AuthController.editMe));

router.put('/change-password', asyncHandler(AuthController.changePassword));
module.exports = router;