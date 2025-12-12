var { ErrorCustom, BadRequestError, AuthentificationError } = require('../app/core/error_custom');
const { checkMogooseObjectId } = require('../app/helpers/check');
let UserService = require('../services/user_service');
const cloudinary = require('../app/core/init_cloudinary');
let { deleteImg, deleteMultiImg } = require('../app/helpers/deleteImg');

class UserController {

    addUser = async function (req, res, next) {//check email tồn tại
        let user = await UserService.getUserByParams({ email: req.body.email });
        if (user) throw new BadRequestError("Email đã sử dụng");

        await UserService.addUser(req.body);
        res.send({
            message: "add user",
        });
    };

    getAllUser = async function (req, res, next) {
        const data = await UserService.getAllUser(req.query);
        res.send({
            message: "get all user",
            data
        });
    };

    getUserById = async function (req, res, next) {
        let id = req.params.id;
        if (!checkMogooseObjectId(id))
            throw new BadRequestError('không tìm thấy id');
        const data = await UserService.getUserById(id);
        if (!data) throw new Error('không tìm thấy id');
        res.send({
            message: "get one user",
            data
        });
    };

    editUserById = async function (req, res, next) {
        let id = req.params.id;
        let obj = req.body;

        const data = await UserService.getUserById(id);
        if (!data) throw new Error('id không tìm thấy');

        await UserService.editUserById(id, obj);

        res.send({
            message: "edit user"
        });
    };

    deleteUserById = async function (req, res, next) {
        let id = req.params.id;

        const data = await UserService.getUserById(id);
        if (!data) throw new BadRequestError('id không tìm thấy');

        await UserService.deleteUserById(id);

        res.send({
            message: "delete user"
        });
    };

    uploadImgUser = async function (req, res, next) {
        let id = req.params.id;
        let obj = req.body;
        let path = req.file.path;

        if (!checkMogooseObjectId(id)) {
            deleteImg(path);
            throw new BadRequestError('không tìm thấy id');
        }

        const data = await UserService.getUserById(id);
        if (!data) {
            deleteImg(path);
            throw new Error('id không tìm thấy');
        };

        cloudinary.uploader
            .upload(path, { folder: 'users' })
            .then(result => {
                obj.thumb = result.url;
                UserService.editUserById(id, obj);
                deleteImg(path);
            })
            .catch(err => {
                deleteImg(path);
                throw new ErrorCustom('Lỗi tải ảnh lên Cloudinary', 500, err);
            })

        res.send({
            message: "upload image user"
        });
    };

    uploadMultiImgUser = async function (req, res, next) {
        let id = req.params.id;
        let array = req.files;
        let url = [];

        if (!checkMogooseObjectId(id)) {
            deleteMultiImg(array);
            throw new BadRequestError('không tìm thấy id');
        }

        const data = await UserService.getUserById(id);
        if (!data) {
            deleteMultiImg(array);
            throw new Error('id không tìm thấy');
        };

        for (let index = 0; index < array.length; index++) {
            let path = array[index].path;
            try {
                let result = await cloudinary.uploader
                    .upload(path, { folder: 'users' });
                url.push(result.url);
                deleteImg(path);
            } catch (error) {
                deleteImg(path);
                throw new ErrorCustom('Lỗi tải ảnh lên Cloudinary', 500, err);
            }
        }

        UserService.editUserById(id, { images: url });

        res.send({
            message: "upload image user"
        });
    };
}

module.exports = new UserController()