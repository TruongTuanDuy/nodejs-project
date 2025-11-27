var express = require('express');
var router = express.Router();
var { asyncHandler } = require('../app/helpers/async_handler');
const upload = require('../app/helpers/uploadImg');

const ProductController = require('../controllers/product_controller');

/* GET home page. */
router.get('/', asyncHandler(ProductController.getAllProduct));

router.get('/:id', asyncHandler(ProductController.getOneProduct));

router.post('/', asyncHandler(ProductController.addProduct));

router.delete('/:id', asyncHandler(ProductController.deleteProduct));

router.put('/:id', asyncHandler(ProductController.editProduct));

router.put('/uploadImg/:id', upload.single('image'), asyncHandler(ProductController.uploadImgProduct));

router.put('/uploadMultiImg/:id', upload.array('images', 10), asyncHandler(ProductController.uploadMultiImgProduct));

module.exports = router;