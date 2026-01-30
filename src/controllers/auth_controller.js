var { ErrorCustom, BadRequestError, AuthentificationError } = require('../app/core/error_custom');
let UserService = require('../services/user_service');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const { sendMail } = require('../app/helpers/send_mail');

class AuthController {

    register = async function (req, res, next) {
        const { email, password } = req.body;
        if (!email || !password) {
            throw new BadRequestError("Email và mật khẩu là bắt buộc");
        }
        let user = await UserService.getUserByEmail(email);
        if (user) throw new BadRequestError("Email đã tồn tại");

        await UserService.addUser({ email, password });
        res.send({
            ok: true,
            message: "register",
        });
    };

    login = async function (req, res, next) {
        const { email, password } = req.body;

        let user = await UserService.getUserByEmail(email);
        if (!user) throw new BadRequestError("Email không tìm thấy");

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new BadRequestError("Mật khẩu không đúng");

        var token = jwt.sign({ userId: user.id }, 'duy', { expiresIn: '1d' });

        // save cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Chỉ gửi cookie qua HTTPS trong môi trường production
            maxAge: 24 * 60 * 60 * 1000 // 1 ngày
        });

        res.send({
            ok: true,
            message: "login",
            // token
        });

    };

    forgotPassword = async function (req, res, next) {
        const { email } = req.body;

        let user = await UserService.getUserByEmail(email);
        if (!user) throw new BadRequestError("Email không tìm thấy");

        const token = await UserService.generateResetToken(user);

        sendMail(email, "Reset Password Token", `Mã xác thực của bạn là: ${token}`);

        res.send({
            ok: true,
            message: "Kiểm tra email để nhận mã xác thực",
        });
    };

    resetPassword = async function (req, res, next) {
        const { token, email, newPassword } = req.body;

        let user = await UserService.getUserByTokenEmail(token, email);
        if (!user) throw new BadRequestError("Thông tin không hợp lệ");

        if (Date.now() > user.resetTokenExpire) throw new BadRequestError("Mã xác thực đã hết hạn");

        await UserService.resetPassword(user, newPassword);

        res.send({
            ok: true,
            message: "Đặt lại mật khẩu thành công",
        });
    };

    changePassword = async function (req, res, next) {
        const { currentPassword, newPassword } = req.body;
        const user = await UserService.getUserById({ id: req.userId });

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) throw new BadRequestError("Mật khẩu hiện tại không đúng");

        const isDuplicate = await bcrypt.compare(newPassword, user.password);
        if (isDuplicate) throw new BadRequestError("Mật khẩu mới trùng mật khẩu hiện tại");

        await UserService.changePassword(user, newPassword);

        res.send({
            ok: true,
            message: "Đổi mật khẩu thành công",
        });
    };

    getMe = async function (req, res, next) {
        const data = await UserService.getUserById({ id: req.userId, select: "-password" });
        if (!data) throw new Error('không tìm thấy dữ liệu của bạn');
        res.send({
            ok: true,
            message: "get Me",
            data
        });
    };

    editMe = async function (req, res, next) {
        let id = req.userId;
        let obj = req.body;

        // const allowedFields = ["name", "tel", "address", "avatar"];
        // const updateData = {};
        // allowedFields.forEach(field => {
        //     if (obj[field] !== undefined) {
        //         updateData[field] = obj[field];
        //     }
        // });

        await UserService.editMe(id, req.body);
        res.send({
            ok: true,
            message: "edit Me",
        });
    };
}

module.exports = new AuthController()