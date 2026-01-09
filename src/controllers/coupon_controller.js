var { ErrorCustom, BadRequestError, AuthentificationError } = require('../app/core/error_custom');
const { checkMogooseObjectId } = require('../app/helpers/check');
let CouponService = require('../services/coupon_service');

class CouponController {

    addCoupon = async function (req, res, next) {
        let { code, discountPercent, startDate, endDate, quantity, used } = req.body;

        let coupon = await CouponService.getCouponByParams({ code: code });
        if (coupon) throw new BadRequestError("Coupon đã tồn tại");

        if (discountPercent) {
            req.body.discountPercent = discountPercent > 100 ? 100 : discountPercent;
        }
        // format date yyyy-mm-dd
        let startDateObj = new Date(startDate);
        let endDateObj = new Date(endDate);
        if (endDateObj < startDateObj) {
            throw new BadRequestError('startDate < endDate');
        }
        req.body.available = quantity - used;

        await CouponService.addCoupon(req.body);
        res.send({
            ok: true,
            message: "add coupon",
        });
    }

    getAllCoupon = async function (req, res, next) {
        const data = await CouponService.getAllCoupon(req.query);
        res.send({
            ok: true,
            message: "get all coupon",
            data
        });
    };

    getCouponById = async function (req, res, next) {
        let id = req.params.id;
        if (!checkMogooseObjectId(id))
            throw new BadRequestError('không tìm thấy id');
        const data = await CouponService.getCouponById(id);
        if (!data) throw new Error('không tìm thấy id');
        res.send({
            ok: true,
            message: "get one coupon",
            data
        });
    };


    deleteCouponById = async function (req, res, next) {
        let id = req.params.id;
        const data = await CouponService.getCouponById(id);
        if (!data) throw new BadRequestError('id không tìm thấy');
        await CouponService.deleteCouponById(id);
        res.send({
            ok: true,
            message: "delete coupon"
        });
    }

    editCouponById = async function (req, res, next) {
        let id = req.params.id;
        let obj = req.body;
        const data = await CouponService.getCouponById(id);
        if (!data) throw new Error('id không tìm thấy');

        await CouponService.editCouponById(id, obj);

        res.send({
            ok: true,
            message: "edit coupon"
        });
    }

}

module.exports = new CouponController()