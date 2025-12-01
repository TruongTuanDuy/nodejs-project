var express = require('express');
var router = express.Router();
var { asyncHandler } = require('../app/helpers/async_handler');
const upload = require('../app/helpers/uploadImg');

const CategoryController = require('../controllers/category_controller');
const { checkLogin } = require('../app/middlewares/check_login');
const { checkPermission } = require('../app/middlewares/check_permission');

/* GET home page. */
router.get('/', asyncHandler(CategoryController.getAllCategory));

router.get('/:id', asyncHandler(CategoryController.getOneCategory));

router.get('/:id/product', asyncHandler(CategoryController.getProductByCategory));

router.use(checkLogin);
router.use(checkPermission);
router.post('/', asyncHandler(CategoryController.addCategory));

router.delete('/:id', asyncHandler(CategoryController.deleteCategory));

router.put('/:id', asyncHandler(CategoryController.editCategory));

router.put('/uploadImg/:id', upload.single('image'), asyncHandler(CategoryController.uploadImgCategory));

router.put('/uploadMultiImg/:id', upload.array('images', 10), asyncHandler(CategoryController.uploadMultiImgCategory));

module.exports = router;