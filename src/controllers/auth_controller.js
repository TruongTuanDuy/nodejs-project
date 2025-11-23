var { ErrorCustom, BadRequestError, AuthentificationError } = require('../app/core/error_custom');
const { checkMogooseObjectId } = require('../helpers/check');
let { readJsonFile, writeFile } = require('../helpers/helper_json_file');
let UserService = require('../services/user_service');
const cloudinary = require('../app/init_cloudinary');
let { deleteImg, deleteMultiImg } = require('../helpers/deleteImg');

class AuthController {

    register = async function (req, res, next) {
        // const data = await readJsonFile();
        // const data = await UserService.getAll(req.query);
        const { email, password } = req.body;
        console.log(email, password);
        let user = await UserService.getUserByEmail(email);
        if (user) throw new BadRequestError("Email đã tồn tại");

        await UserService.add({ email, password });
        res.send({
            message: "register",
        });
    };

}

module.exports = new AuthController()