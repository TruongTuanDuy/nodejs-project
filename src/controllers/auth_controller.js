var { ErrorCustom, BadRequestError, AuthentificationError } = require('../app/core/error_custom');
const { checkMogooseObjectId } = require('../helpers/check');
let { readJsonFile, writeFile } = require('../helpers/helper_json_file');
let UserService = require('../services/user_service');
const cloudinary = require('../app/init_cloudinary');
let { deleteImg, deleteMultiImg } = require('../helpers/deleteImg');
const bcrypt = require('bcrypt');


class AuthController {

    register = async function (req, res, next) {
        const { email, password } = req.body;

        let user = await UserService.getUserByEmail(email);
        if (user) throw new BadRequestError("Email đã tồn tại");

        await UserService.add({ email, password });
        res.send({
            message: "register",
        });
    };

    login = async function (req, res, next) {
        const { email, password } = req.body;

        let user = await UserService.getUserByEmail(email);
        if (!user) throw new BadRequestError("Email không tìm thấy");

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new BadRequestError("Mật khẩu không đúng");

        res.send({
            message: "login",
        });

        return user;
    };

    forgotPassword = async function (req, res, next) {
        const { email } = req.body;

        let user = await UserService.getUserByEmail(email);
        if (!user) throw new BadRequestError("Email không tìm thấy");

        const token = await UserService.generateResetToken(user);

        res.send({
            message: "Tạo token thành công",
        });

        return token;
    };

    resetPassword = async function (req, res, next) {
        const { token, newPassword } = req.body;
        console.log(token, newPassword);

        let user = await UserService.getUserByToken(token);
        if (!user) throw new BadRequestError("Mã xác thực không đúng");
        if (Date.now() > user.resetTokenExpire) throw new BadRequestError("Mã xác thực đã hết hạn");
        await UserService.editPassword(user, newPassword);

        res.send({
            message: "Đổi mật khẩu thành công",
        });

    };

}

module.exports = new AuthController()