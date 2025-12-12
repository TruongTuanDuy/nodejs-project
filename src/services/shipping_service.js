const handlerFindObj = require('../app/helpers/find_obj');
const ShippingModel = require('../models/shipping_model');

class ShippingService {

    addShipping = async (data) => {
        await ShippingModel.create(data)
    };

    getAllShipping = async (query) => {
        const { findObj, sortObj, skip, page, limit } = handlerFindObj(query);

        let count = await ShippingModel.find(findObj).countDocuments();
        let data = await ShippingModel.find(findObj).sort(sortObj).skip(skip).limit(limit);
        return {
            page,
            limit,
            total: count,
            data,
        };
    };

    getShippingById = async (id) => {
        let data = await ShippingModel.findById(id)
        return data
    };

    getShippingByParams = async (params) => {
        let data = await ShippingModel.findOne(params);
        return data;
    }

    deleteShippingById = async (id) => {
        await ShippingModel.findByIdAndDelete(id)
    };

    editShippingById = async (id, obj) => {
        await ShippingModel.findByIdAndUpdate(id, obj)
    };
}
module.exports = new ShippingService();