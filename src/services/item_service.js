const ItemModel = require('../models/item_model');

class ItemService {

    add = async (data) => {
        await ItemModel.create(data)
    };

    getAll = async (query) => {
        const { sortField = 'createdAt', sortDir = 'asc', findField = 'name', findValue, status, page, limit } = query;
        let findObj = {};
        let sortObj = {};
        const skip = (page - 1) * limit;
        if (status == 'active' || status == 'inactive') {
            findObj = {
                ...findObj,
                status
            }
        };
        if (findField) {
            findObj[findField] = new RegExp(findValue, 'i');
        };
        if (sortField) {
            sortObj[sortField] = sortDir;
        };

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
module.exports = new ItemService();