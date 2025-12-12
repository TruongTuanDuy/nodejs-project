var express = require('express');
var router = express.Router();
var { asyncHandler } = require('../app/helpers/async_handler');
const upload = require('../app/helpers/uploadImg');

const ShippingController = require('../controllers/shipping_controller');

/* GET home page. */
router.get('/', asyncHandler(ShippingController.getAllShipping));
router.get('/:id', asyncHandler(ShippingController.getShippingById));

router.post('/', asyncHandler(ShippingController.addShipping));
router.delete('/:id', asyncHandler(ShippingController.deleteShippingById));
router.put('/:id', asyncHandler(ShippingController.editShippingById));

module.exports = router;