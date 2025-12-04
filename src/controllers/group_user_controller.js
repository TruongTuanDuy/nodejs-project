var { ErrorCustom, BadRequestError, AuthentificationError } = require('../app/core/error_custom');
const { checkMogooseObjectId } = require('../app/helpers/check');
let ItemService = require('../services/group_user_service');

class PermissionController {

    getAllItem = async function (req, res, next) {
        const data = await ItemService.getAllItem(req.query);
        res.send({
            message: "get all item",
            data
        });
    };

    getItemById = async function (req, res, next) {
        let id = req.params.id;
        if (!checkMogooseObjectId(id))
            throw new BadRequestError('không tìm thấy id');
        const data = await ItemService.getItemById(id);
        if (!data) throw new Error('không tìm thấy id');
        res.send({
            message: "get one item",
            data
        });
    };

    addItem = async function (req, res, next) {
        await ItemService.addItem(req.body);
        res.send({
            message: "add item",
        });
    }

    deleteItemById = async function (req, res, next) {
        let id = req.params.id;
        const data = await ItemService.getItemById(id);
        if (!data) throw new BadRequestError('id không tìm thấy');
        await ItemService.deleteItemById(id);
        res.send({
            message: "delete item"
        });
    }

    editItemById = async function (req, res, next) {
        let id = req.params.id;
        let obj = req.body;
        const data = await ItemService.getItemById(id);
        if (!data) throw new Error('id không tìm thấy');

        await ItemService.editItemById(id, obj);

        res.send({
            message: "edit item"
        });
    }

}

module.exports = new PermissionController()