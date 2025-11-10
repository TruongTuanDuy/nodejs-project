var express = require('express');
var router = express.Router();

router.use('/item', require('./item_router'));
router.use('/category', require('./category_router'));
router.use('/product', require('./product_router'));

module.exports = router;
