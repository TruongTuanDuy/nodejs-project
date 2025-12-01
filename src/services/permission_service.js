const handlerFindObj = require('../app/helpers/find_obj');
const ItemModel = require('../models/permission_model');

class PermissionService {

    add = async (data) => {
        await ItemModel.create(data)
    };

    getAll = async (query) => {
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

    findOne = async (params) => {
        let data = await ItemModel.findOne(params)
        return data
    };

    getOne = async (id) => {
        let data = await ItemModel.findById(id)
        return data
    };

    edit = async (id, obj) => {
        await ItemModel.findByIdAndUpdate(id, obj)
    };

    delete = async (id) => {
        await ItemModel.findByIdAndDelete(id)
    };
}
module.exports = new PermissionService();