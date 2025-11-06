var express = require('express');
var router = express.Router();
var { asyncHandler } = require('../helpers/async_handler');
const upload = require('../helpers/uploadImg');


const CategoryController = require('../controllers/category_controller');

/* GET home page. */
router.get('/', asyncHandler(CategoryController.getAllCategory));

router.get('/:id', asyncHandler(CategoryController.getOneCategory));

router.post('/', asyncHandler(CategoryController.addCategory));

router.delete('/:id', asyncHandler(CategoryController.deleteCategory));

router.put('/:id', asyncHandler(CategoryController.editCategory));

router.put('/uploadImg/:id', upload.single('image'), asyncHandler(CategoryController.uploadImgCategory));

module.exports = router;