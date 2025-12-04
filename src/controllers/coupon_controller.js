var { ErrorCustom, BadRequestError, AuthentificationError } = require('../app/core/error_custom');
const { checkMogooseObjectId } = require('../app/helpers/check');
let CouponService = require('../services/coupon_service');
const cloudinary = require('../app/core/init_cloudinary');
let { deleteImg, deleteMultiImg } = require('../app/helpers/deleteImg');

class CouponController {

    addCoupon = async function (req, res, next) {
        let { code, percent, start_date, end_date, total, used } = req.body;

        let coupon = await CouponService.getCouponByCode(code);
        if (coupon) throw new BadRequestError("Coupon đã tồn tại");

        if (percent) {
            req.body.percent = percent > 100 ? 100 : percent;
        }
        // format date yyyy-mm-dd
        let start_date_obj = new Date(start_date);
        let end_date_obj = new Date(end_date);
        if (end_date_obj < start_date_obj) {
            throw new BadRequestError('start_date < end_date');
        }
        req.body.available = total - used;




        await CouponService.addCoupon(req.body);
        res.send({
            message: "add coupon",
        });
    }

    getAllCoupon = async function (req, res, next) {
        const data = await CouponService.getAllCoupon(req.query);
        res.send({
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
            message: "edit coupon"
        });
    }

}

module.exports = new CouponController()