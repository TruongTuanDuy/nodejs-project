var express = require('express');
var router = express.Router();
var { asyncHandler } = require('../app/helpers/async_handler');
const { checkLogin } = require('../app/middlewares/check_login');
const OrderController = require('../controllers/order_controller');
const { checkPermission } = require('../app/middlewares/check_permission');

/* GET home page. */
router.use(checkLogin);
router.get('/history', asyncHandler(OrderController.getOrderHistory));
router.get('/history/:code', asyncHandler(OrderController.getOrderByCode));
router.post('/token/:code', asyncHandler(OrderController.generateCancelToken));
router.put('/cancel/:code', asyncHandler(OrderController.cancelOrder));

router.post('/', asyncHandler(OrderController.addOrder));

router.use(checkPermission);
router.get('/', asyncHandler(OrderController.getAllOrder));
router.get('/:id', asyncHandler(OrderController.getOrderById));
router.put('/:id', asyncHandler(OrderController.editOrderById));
router.delete('/:id', asyncHandler(OrderController.deleteOrderById));

module.exports = router;