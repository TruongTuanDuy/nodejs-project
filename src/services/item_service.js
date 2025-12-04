const handlerFindObj = require('../app/helpers/find_obj');
const ItemModel = require('../models/item_model');

class ItemService {

    addItem = async (data) => {
        await ItemModel.create(data)
    };

    getAllItem = async (query) => {
        const { findObj, sortObj, skip, page, limit } = handlerFindObj(query);
        let count = await ItemModel.find(findObj).countDocuments();
        let data = await ItemModel.find(findObj).sort(sortObj).skip(skip).limit(limit);
        return {
            page,
            limit,
            total: count,
            data,
        };
    };

    getItemById = async (id) => {
        // let data = ItemModel.findById(id).then(data => data)
        // console.log(data);

        // try {
        // } catch (error) {
        //     throw
        // }

        let data = await ItemModel.findById(id)
        return data
    };

    deleteItemById = async (id) => {
        await ItemModel.findByIdAndDelete(id)
    };

    editItemById = async (id, obj) => {
        await ItemModel.findByIdAndUpdate(id, obj)
    };

}
module.exports = new ItemService();