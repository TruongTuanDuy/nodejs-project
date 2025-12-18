const handlerFindObj = require('../app/helpers/find_obj');
const OrderModel = require('../models/order_model');
const crypto = require('crypto');


class OrderService {

    addOrder = async (data) => {
        await OrderModel.create(data)
    };

    getAllOrder = async (query) => {
        const { findObj, sortObj, skip, page, limit } = handlerFindObj(query);
        let count = await OrderModel.find(findObj).countDocuments();
        let data = await OrderModel.find(findObj).sort(sortObj).skip(skip).limit(limit);
        return {
            page,
            limit,
            total: count,
            data,
        };
    };

    getOrderById = async (id) => {
        let data = await OrderModel.findById(id)
        return data
    };

    getOrderByCode = async (code, userId) => {
        let data = await OrderModel.findOne({ code: code, userId: userId }).populate('shippingId', 'name').populate('couponId').populate('items.productId');
        return data;
    }

    getOrderByTokenCode = async (token, code) => {
        let data = await OrderModel.findOne({ cancelToken: token, code: code });
        console.log(data);

        return data;
    }

    deleteOrderById = async (id) => {
        await OrderModel.findByIdAndDelete(id)
    };

    editOrderById = async (id, obj) => {
        await OrderModel.findByIdAndUpdate(id, obj)
    };

    generateCancelToken = async (order) => {
        const token = crypto.randomInt(100000, 999999).toString();
        const tokenExpire = Date.now() + 1000 * 60 * 60; // 10 minutes
        await OrderModel.findByIdAndUpdate(order._id, { cancelToken: token, cancelTokenExpire: tokenExpire });
        return token;
    };

    cancelOrder = async (order) => {
        order.status = "cancelled";
        order.cancelToken = '';
        order.cancelTokenExpire = '';
        await order.save();
        return order;
    }

}
module.exports = new OrderService();