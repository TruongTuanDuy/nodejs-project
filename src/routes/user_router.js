var express = require('express');
var router = express.Router();
var { asyncHandler } = require('../app/helpers/async_handler');
const upload = require('../app/helpers/uploadImg');
const UserController = require('../controllers/user_controller');
const { checkLogin } = require('../app/middlewares/check_login');
const { checkPermission } = require('../app/middlewares/check_permission');

/* GET home page. */
router.get('/', asyncHandler(UserController.getAllUser));
router.get('/:id', asyncHandler(UserController.getUserById));

// router.use(checkLogin);
// router.use(checkPermission);

router.post('/', asyncHandler(UserController.addUser));
router.delete('/:id', asyncHandler(UserController.deleteUserById));
router.put('/:id', asyncHandler(UserController.editUserById));
router.put('/uploadImg/:id', upload.single('image'), asyncHandler(UserController.uploadImgUser));
router.put('/uploadMultiImg/:id', upload.array('images', 10), asyncHandler(UserController.uploadMultiImgUser));

module.exports = router;