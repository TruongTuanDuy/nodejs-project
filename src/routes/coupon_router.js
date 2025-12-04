var express = require('express');
var router = express.Router();
var { asyncHandler } = require('../app/helpers/async_handler');
const upload = require('../app/helpers/uploadImg');

const CouponController = require('../controllers/coupon_controller');

/* GET home page. */
router.get('/', asyncHandler(CouponController.getAllCoupon));
router.get('/:id', asyncHandler(CouponController.getCouponById));

router.post('/', asyncHandler(CouponController.addCoupon));
router.delete('/:id', asyncHandler(CouponController.deleteCouponById));
router.put('/:id', asyncHandler(CouponController.editCouponById));

module.exports = router;