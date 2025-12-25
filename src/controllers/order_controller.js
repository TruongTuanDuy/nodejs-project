var { ErrorCustom, BadRequestError, AuthentificationError } = require('../app/core/error_custom');
const { checkMogooseObjectId } = require('../app/helpers/check');
let OrderService = require('../services/order_service');
let ProductService = require('../services/product_service');
let CouponService = require('../services/coupon_service');
let ShippingService = require('../services/shipping_service');
let UserService = require('../services/user_service');
const { sendMail } = require('../app/helpers/send_mail');

class OrderController {

    addOrder = async function (req, res, next) {
        let { items, couponId, shippingId, total } = req.body;
        // if (req.userId !== req.body.userId) {
        //     throw new BadRequestError('Bạn phải đăng nhập trước khi tạo đơn hàng');

        //     // res.status(401).send({
        //     //     message: "Bạn phải đăng nhập trước khi tạo đơn hàng",
        //     // });
        //     // return;
        // }

        let subTotal = 0;
        for (let index = 0; index < items.length; index++) {
            const element = items[index];
            if (!checkMogooseObjectId(element.productId))
                throw new BadRequestError('sản phẩm không tồn tại');
            let product = await ProductService.getProductById(element.productId);
            if (!product) {
                throw new BadRequestError('sản phẩm không tồn tại');
            }
            if (product.price !== element.price) {
                throw new BadRequestError('giá sản phẩm không hợp lệ');
            }
            if (element.quantity <= 0) {
                throw new BadRequestError('số lượng sản phẩm không hợp lệ');
            }
            if (element.quantity > product.stock) {
                throw new BadRequestError('sản phẩm không đủ số lượng trong kho');
            }
            subTotal += element.price * element.quantity;
        }

        let discount = 0;
        if (couponId) {
            if (!checkMogooseObjectId(couponId))
                throw new BadRequestError('coupon không hợp lệ');
            let coupon = await CouponService.getCouponById(couponId);
            if (!coupon) {
                throw new BadRequestError('coupon không hợp lệ');
            }

            let startDateObj = new Date(coupon.startDate);
            let endDateObj = new Date(coupon.endDate);
            if (endDateObj < Date.now() || startDateObj > Date.now()) {
                throw new BadRequestError('coupon không trong thời gian áp dụng');
            }

            if (subTotal < coupon.minOrderValue) {
                throw new BadRequestError('giá trị đơn hàng chưa đủ điều kiện áp dụng coupon');
            }

            if (coupon.discountType === 'percent') {
                discount = subTotal * (coupon.discountPercent / 100);
                if (coupon.maxDiscount && discount > coupon.maxDiscount) {
                    discount = coupon.maxDiscount;
                }
            } else {
                discount = coupon.discountValue;
            }
        }

        if (!checkMogooseObjectId(shippingId))
            throw new BadRequestError('địa chỉ giao hàng không hợp lệ');
        let shipping = await ShippingService.getShippingById(shippingId);
        if (!shipping) {
            throw new BadRequestError('địa chỉ giao hàng không hợp lệ');
        }

        let grandTotal = subTotal - discount + shipping.fee;

        // không dùng được (grandTotal !== total) vì so sánh luôn type
        if (grandTotal != total) {
            throw new BadRequestError('giá trị đơn hàng không đúng');
        }

        req.body.code = 'ORD' + Date.now(); //nên thêm userID trong code

        await OrderService.addOrder(req.body);
        await CouponService.updateCouponInc(couponId, {});
        await ProductService.updateProductStock(items);

        let user = await UserService.getUserById(req.userId);
        sendMail(user.email, "Order Confirmation", `Mã đơn hàng của bạn là: ${req.body.code}`);

        res.send({
            message: "add order",
        });
    }

    getAllOrder = async function (req, res, next) {
        const data = await OrderService.getAllOrder(req.query);
        res.send({
            message: "get all order",
            data
        });
    };

    getOrderById = async function (req, res, next) {
        let id = req.params.id;
        if (!checkMogooseObjectId(id))
            throw new BadRequestError('không tìm thấy id');
        const data = await OrderService.getOrderById(id);
        if (!data) throw new Error('không tìm thấy id');
        res.send({
            message: "get one order",
            data
        });
    };

    deleteOrderById = async function (req, res, next) {
        let id = req.params.id;
        const data = await OrderService.getOrderById(id);
        if (!data) throw new BadRequestError('id không tìm thấy');
        await OrderService.deleteOrderById(id);
        res.send({
            message: "delete order"
        });
    }

    editOrderById = async function (req, res, next) {
        let id = req.params.id;
        let obj = req.body.status ? { status: req.body.status } : {};
        const data = await OrderService.getOrderById(id);
        if (!data) throw new Error('id không tìm thấy');

        await OrderService.editOrderById(id, obj);

        res.send({
            message: "edit order"
        });
    }

    getOrderHistory = async function (req, res, next) {
        const data = await OrderService.getAllOrder({ ...req.query, userId: req.userId });
        res.send({
            message: "get history order",
            data
        });
    }

    getOrderByCode = async function (req, res, next) {
        const data = await OrderService.getOrderByCode(req.params.code, req.userId);
        if (!data) throw new BadRequestError('Mã đơn hàng không tồn tại');
        res.send({
            message: "get order status",
            data
        });
    }

    generateCancelToken = async function (req, res, next) {

        const order = await OrderService.getOrderByCode(req.params.code, req.userId);
        if (!order) throw new BadRequestError('Mã đơn hàng không tồn tại');

        const token = await OrderService.generateCancelToken(order);
        let user = await UserService.getUserById(req.userId);

        console.log(token);

        sendMail(user.email, "Cancel Order Token", `Mã xác thực để hủy đơn hàng ${req.params.code} của bạn là: ${token}`);

        res.send({
            message: "Kiểm tra email để nhận mã xác thực",
        });
    };

    cancelOrder = async function (req, res, next) {
        const { token } = req.body;

        let order = await OrderService.getOrderByTokenCode(token, req.params.code);
        if (!order) throw new BadRequestError("Đơn hàng không hợp lệ");
        if (order.status !== "confirmed") throw new BadRequestError("Đơn hàng không thể hủy");

        if (Date.now() > order.cancelTokenExpire) throw new BadRequestError("Mã xác thực đã hết hạn");

        await OrderService.cancelOrder(order);
        await CouponService.updateCouponInc(order.couponId, { used: -1, available: 1 });
        await ProductService.updateProductStock(order.items, true); //lủng củng chỗ này

        res.send({
            message: "Hủy đơn hàng thành công",
        });
    };

}

module.exports = new OrderController()