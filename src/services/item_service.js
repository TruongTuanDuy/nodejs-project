const ItemModel = require('../models/item_model');

class ItemService {
    addData = async (data) => {
        await ItemModel.create(data)

    }
    getAll = async (params) => {
        const { status, page, limit } = params
        let obj = {}
        if (status == 'active' || status == 'inactive') {
            obj = {
                ...obj,
                status
            }
        }
        let data = await ItemModel.find(obj)
        return data
    }
    getOne = async (id) => {
        let data = await ItemModel.findById(id)
        return data
    }
    edit = async (id, object) => {
        await ItemModel.findByIdAndUpdate(id, object)
    }
    delete = async (id) => {
        await ItemModel.findByIdAndDelete(id)
    }

}
module.exports = new ItemService();