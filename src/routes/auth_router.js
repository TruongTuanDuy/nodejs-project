var express = require('express');
var router = express.Router();
var { asyncHandler } = require('../helpers/async_handler');
const upload = require('../helpers/uploadImg');

const AuthController = require('../controllers/auth_controller');

/* GET home page. */
router.post('/register', asyncHandler(AuthController.register));


module.exports = router;