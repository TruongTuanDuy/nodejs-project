const handlerFindObj = require('../app/helpers/find_obj');
const CouponModel = require('../models/coupon_model');

class CouponService {

    addCoupon = async (data) => {
        await CouponModel.create(data)
    };

    getAllCoupon = async (query) => {
        const { findObj, sortObj, skip, page, limit } = handlerFindObj(query);

        let count = await CouponModel.find(findObj).countDocuments();
        let data = await CouponModel.find(findObj).sort(sortObj).skip(skip).limit(limit);
        return {
            page,
            limit,
            total: count,
            data,
        };
    };

    getCouponById = async (id) => {
        let data = await CouponModel.findById(id)
        return data
    };

    getCouponByParams = async (params) => {//truyền params chung cho findOne
        let data = await CouponModel.findOne(params);
        return data;
    }

    deleteCouponById = async (id) => {
        await CouponModel.findByIdAndDelete(id)
    };

    editCouponById = async (id, obj) => {
        await CouponModel.findByIdAndUpdate(id, obj)
    };

    // $inc  
    updateCouponInc = async (id) => {
        await CouponModel.findByIdAndUpdate(id, { $inc: { used: 1, available: -1 } })
    }
}

module.exports = new CouponService();