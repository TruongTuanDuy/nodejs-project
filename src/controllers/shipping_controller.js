var { ErrorCustom, BadRequestError, AuthentificationError } = require('../app/core/error_custom');
const { checkMogooseObjectId } = require('../app/helpers/check');
let ShippingService = require('../services/shipping_service');

class ShippingController {

    addShipping = async function (req, res, next) {
        let { name } = req.body;

        let shipping = await ShippingService.getShippingByParams({ name: name });
        if (shipping) throw new BadRequestError("Shipping đã tồn tại");

        await ShippingService.addShipping(req.body);
        res.send({
            ok: true,
            message: "add shipping",
        });
    }

    getAllShipping = async function (req, res, next) {
        const data = await ShippingService.getAllShipping(req.query);
        res.send({
            ok: true,
            message: "get all shipping",
            data
        });
    };

    getShippingById = async function (req, res, next) {
        let id = req.params.id;
        if (!checkMogooseObjectId(id))
            throw new BadRequestError('không tìm thấy id');
        const data = await ShippingService.getShippingById(id);
        if (!data) throw new Error('không tìm thấy id');
        res.send({
            ok: true,
            message: "get one shipping",
            data
        });
    };


    deleteShippingById = async function (req, res, next) {
        let id = req.params.id;
        const data = await ShippingService.getShippingById(id);
        if (!data) throw new BadRequestError('id không tìm thấy');
        await ShippingService.deleteShippingById(id);
        res.send({
            ok: true,
            message: "delete shipping"
        });
    }

    editShippingById = async function (req, res, next) {
        let id = req.params.id;
        let obj = req.body;
        const data = await ShippingService.getShippingById(id);
        if (!data) throw new Error('id không tìm thấy');

        await ShippingService.editShippingById(id, obj);

        res.send({
            ok: true,
            message: "edit shipping"
        });
    }

}

module.exports = new ShippingController()