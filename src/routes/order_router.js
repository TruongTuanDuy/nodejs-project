var express = require('express');
var router = express.Router();
var { asyncHandler } = require('../app/helpers/async_handler');
const { checkLogin } = require('../app/middlewares/check_login');
const OrderController = require('../controllers/order_controller');

/* GET home page. */
router.use(checkLogin);
router.get('/history', asyncHandler(OrderController.getOrderHistory));
router.get('/history/:code', asyncHandler(OrderController.getOrderByCode));
router.post('/token/:code', asyncHandler(OrderController.generateCancelToken));
router.put('/cancel/:code', asyncHandler(OrderController.cancelOrder));

router.get('/', asyncHandler(OrderController.getAllOrder));
router.get('/:id', asyncHandler(OrderController.getOrderById));
// router.post('/', asyncHandler(OrderController.addOrder));
router.delete('/:id', asyncHandler(OrderController.deleteOrderById));
router.put('/:id', asyncHandler(OrderController.editOrderById));

module.exports = router;