const handlerFindObj = require('../app/helpers/find_obj');
const OrderModel = require('../models/order_model');

class OrderService {

    addOrder = async (data) => {
        await OrderModel.create(data)
    };

    getAllOrder = async (query) => {
        const { findObj, sortObj, skip, page, limit } = handlerFindObj(query);
        console.log(findObj);

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

    getOrderByParams = async (code, userId) => {
        let data = await OrderModel.findOne({ code: code, userId: userId }).populate('shippingId', 'name').populate('couponId').populate('items.productId');
        return data;
    }

    editOrderByParams = async (code, userId) => {
        await OrderModel.findByIdAndUpdate(id, obj)
    }

    deleteOrderById = async (id) => {
        await OrderModel.findByIdAndDelete(id)
    };

    editOrderById = async (id, obj) => {
        await OrderModel.findByIdAndUpdate(id, obj)
    };
}
module.exports = new OrderService();