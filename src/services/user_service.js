const handlerFindObj = require('../helpers/find_obj');
const UserModel = require('../models/user_model');
const crypto = require('crypto');
class UserService {

    add = async (data) => {
        await UserModel.create(data)
    };

    getUserByEmail = async (email) => {
        let data = await UserModel.findOne({ email: email });

        return data;
    }

    generateResetToken = async (user) => {
        // random 6 số

        const token = crypto.randomInt(100000, 999999).toString();

        const tokenExpire = Date.now() + 1000 * 60 * 10; // 10 minutes

        await UserModel.findByIdAndUpdate(user.id, { resetToken: token, resetTokenExpire: tokenExpire });

        return token;
    }

    getUserByTokenEmail = async (token, email) => {
        let data = await UserModel.findOne({ resetToken: token, email: email });

        return data;
    }

    editPassword = async (user, newPassword) => {
        // let data = await UserModel.findByIdAndUpdate(user.id, { password: newPassword });

        user.password = newPassword;
        user.resetToken = '';
        user.resetTokenExpire = '';
        await user.save();

        return user;
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