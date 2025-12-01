const handlerFindObj = require('../app/helpers/find_obj');
const ItemModel = require('../models/group_user_model');

class GroupUserService {

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

    getOne = async (id) => {
        // let data = ItemModel.findById(id).then(data => data)
        // console.log(data);

        // try {
        // } catch (error) {
        //     throw
        // }

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
module.exports = new GroupUserService();