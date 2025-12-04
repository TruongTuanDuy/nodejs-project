const handlerFindObj = require('../app/helpers/find_obj');
const ItemModel = require('../models/group_user_model');

class GroupUserService {

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
module.exports = new GroupUserService();