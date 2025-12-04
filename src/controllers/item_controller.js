var { ErrorCustom, BadRequestError, AuthentificationError } = require('../app/core/error_custom');
const { checkMogooseObjectId } = require('../app/helpers/check');
let { readJsonFile, writeFile } = require('../app/helpers/helper_json_file');
let ItemService = require('../services/item_service');

class ItemController {

    getAllItem = async function (req, res, next) {
        // const data = await readJsonFile();
        console.log(req.query);
        const data = await ItemService.getAllItem(req.query);
        res.send({
            message: "get all item",
            data
        });
    };

    getItemById = async function (req, res, next) {
        console.log(req.params);
        // let id = req.params.id;
        // const data = await readJsonFile();
        // let result = data.find((e) => e.id == id);
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
        console.log(req.body);
        // const data = await readJsonFile();
        // data.push({
        //     "id": data.length + 1,
        //     "name": req.body.name,
        // });
        // writeFile(data);

        await ItemService.addItem(req.body);
        res.send({
            message: "add item",
        });
    }

    deleteItemById = async function (req, res, next) {
        console.log(req.params);
        // let id = req.params.id;
        // let data = await readJsonFile();
        // data = data.filter((e) => e.id !== id);
        // writeFile(data);

        let id = req.params.id;
        const data = await ItemService.getItemById(id);
        if (!data) throw new BadRequestError('id không tìm thấy');
        await ItemService.deleteItemById(id);
        res.send({
            message: "delete item"
        });
    }

    editItemById = async function (req, res, next) {
        console.log(req.params);
        console.log(req.body);
        // let id = req.params.id;
        // let data = await readJsonFile();
        // let itemIndex = data.findIndex((e) => e.id == id);
        // if (itemIndex !== -1) {
        //     data[itemIndex].name = name;
        // }
        // writeFile(data);

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

module.exports = new ItemController()