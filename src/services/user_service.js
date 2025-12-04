const handlerFindObj = require('../app/helpers/find_obj');
const UserModel = require('../models/user_model');
const crypto = require('crypto');

class UserService {

    addUser = async (data) => {
        await UserModel.create(data)
    };

    getAllUser = async (query) => {
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

    getUserById = async (id) => {
        let data = await UserModel.findById(id).populate("group_user");
        return data
    };

    deleteUserById = async (id) => {
        await UserModel.findByIdAndDelete(id)
    };

    editUserById = async (id, obj) => {
        await UserModel.findByIdAndUpdate(id, obj)
    };

    getUserByEmail = async (email) => {
        let data = await UserModel.findOne({ email: email });
        return data;
    }

    generateResetToken = async (user) => {
        const token = crypto.randomInt(100000, 999999).toString();
        const tokenExpire = Date.now() + 1000 * 60 * 10; // 10 minutes
        await UserModel.findByIdAndUpdate(user.id, { resetToken: token, resetTokenExpire: tokenExpire });
        return token;
    }

    getUserByTokenEmail = async (token, email) => {
        let data = await UserModel.findOne({ resetToken: token, email: email });
        return data;
    }

    resetPassword = async (user, newPassword) => {
        // let data = await UserModel.findByIdAndUpdate(user.id, { password: newPassword });  // Không dùng cách này vì pre save không chạy
        user.password = newPassword;
        user.resetToken = '';
        user.resetTokenExpire = '';
        await user.save();
        return user;
    }

    changePassword = async (user, newPassword) => {
        user.password = newPassword;
        await user.save();
        return user;
    }

    editMe = async (id, { name, tel, address, avatar }) => {  //ko gán (null) thì bỏ qua, có gán thì update
        await UserModel.findByIdAndUpdate(id, { name, tel, address, avatar })
    };


}
module.exports = new UserService();