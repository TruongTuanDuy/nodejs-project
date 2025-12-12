var express = require('express');
var router = express.Router();
var { asyncHandler } = require('../app/helpers/async_handler');
const { checkLogin } = require('../app/middlewares/check_login');
const OrderController = require('../controllers/order_controller');

/* GET home page. */
router.use(checkLogin);
router.get('/', asyncHandler(OrderController.getAllOrder));
router.get('/history', asyncHandler(OrderController.getHistoryOrder));
router.get('/history/:code', asyncHandler(OrderController.getOrderByCode));
router.get('/cancel/:code', asyncHandler(OrderController.cancelOrderByCode));
router.get('/:id', asyncHandler(OrderController.getOrderById));


router.post('/', asyncHandler(OrderController.addOrder));
router.delete('/:id', asyncHandler(OrderController.deleteOrderById));
router.put('/:id', asyncHandler(OrderController.editOrderById));

module.exports = router;