let { readJsonFile, writeFile } = require('../helpers/helper_json_file');
let ItemService = require('../services/item_service');

class ItemController {
    getAllItem = async function (req, res, next) {

        const data = await ItemService.getAll(req.query);

        res.send({
            message: "get all item",
            data
        });
    }
    getOneItem = async function (req, res, next) {
        console.log(req.params);

        let id = req.params.id;
        const data = await ItemService.getOne(id);

        // let result = data.find((e) => e.id == id);

        res.send({
            message: "get one item",
            data
        });
    }

    addItem = async function (req, res, next) {
        // console.log(req.body);
        // const data = await readJsonFile();

        // data.push({
        //     "id": data.length + 1,
        //     "name": req.body.name,
        // });
        // writeFile(data);

        await ItemService.addData(req.body);

        res.send({
            message: "add item",
        });
    }

    deleteItem = async function (req, res, next) {
        console.log(req.params);
        // let data = await readJsonFile();

        let id = req.params.id;
        await ItemService.delete(id);

        // data = data.filter((e) => e.id !== id);
        // writeFile(data);

        res.send({
            message: "delete item"
        });
    }

    editItem = async function (req, res, next) {
        console.log(req.params);
        console.log(req.body);
        // let data = await readJsonFile();

        let id = req.params.id;
        let object = req.body;
        await ItemService.edit(id, object);

        // let itemIndex = data.findIndex((e) => e.id == id);
        // if (itemIndex !== -1) {
        //     data[itemIndex].name = name;
        // }
        // writeFile(data);

        res.send({
            message: "edit item"
        });
    }

}

module.exports = new ItemController()