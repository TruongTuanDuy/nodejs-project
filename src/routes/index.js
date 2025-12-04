var express = require('express');
var router = express.Router();

router.use('/item', require('./item_router'));
router.use('/coupon', require('./coupon_router'));
router.use('/category', require('./category_router'));
router.use('/product', require('./product_router'));
router.use('/search', require('./search_router'));
router.use('/user', require('./user_router'));
router.use('/permission', require('./permission_router'));
router.use('/group-user', require('./group_user_router'));

router.use('/', require('./auth_router')); //ko để lên trên vì nó sẽ chạy "/" trước

module.exports = router;
