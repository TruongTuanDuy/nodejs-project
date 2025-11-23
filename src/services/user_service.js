const handlerFindObj = require('../helpers/find_obj');
const UserModel = require('../models/user_model');

class UserService {

    add = async (data) => {
        await UserModel.create(data)
    };

    getUserByEmail = async (email) => {
        let data = await UserModel.findOne({ email: email });
        console.log(data);

        return data;
    }


    getAll = async (query) => {
        const { findObj, sortObj, skip, page, limit } = handlerFindObj(query);

        let count = await UserModel.find(findObj).countDocuments();
        let data = await UserModel.find(findObj).sort(sortObj).skip(skip).limit(limit);
        return {
            page,
            limit,
            total: count,
            data,
        };
    };

    getOne = async (id) => {
        let data = await UserModel.findById(id)
            .populate('category', 'name slug');//
        return data
    };

    edit = async (id, obj) => {
        await UserModel.findByIdAndUpdate(id, obj)
    };

    delete = async (id) => {
        await UserModel.findByIdAndDelete(id)
    };
}
module.exports = new UserService();