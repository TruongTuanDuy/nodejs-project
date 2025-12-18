var { ErrorCustom, BadRequestError, AuthentificationError } = require('../app/core/error_custom');
const { checkMogooseObjectId } = require('../app/helpers/check');
let { readJsonFile, writeFile } = require('../app/helpers/helper_json_file');
let CommentService = require('../services/comment_service');

class CommentController {

    getAllComment = async function (req, res, next) {
        // const data = await readJsonFile();
        console.log(req.query);
        const data = await CommentService.getAllComment(req.query);
        res.send({
            message: "get all comment",
            data
        });
    };

    getCommentByCommentId = async function (req, res, next) {
        let id = req.params.id;
        if (!checkMogooseObjectId(id))
            throw new BadRequestError('không tìm thấy id');
        const data = await CommentService.getCommentById(id);
        if (!data) throw new Error('không tìm thấy id');
        const comment = await CommentService.getCommentByCommentId(data);
        res.send({
            message: "get child comment",
            comment
        });
    };

    getCommentById = async function (req, res, next) {
        console.log(req.params);
        // let id = req.params.id;
        // const data = await readJsonFile();
        // let result = data.find((e) => e.id == id);
        let id = req.params.id;
        if (!checkMogooseObjectId(id))
            throw new BadRequestError('không tìm thấy id');
        const data = await CommentService.getCommentById(id);
        if (!data) throw new Error('không tìm thấy id');
        res.send({
            message: "get one comment",
            data
        });
    };

    addComment = async function (req, res, next) {
        await CommentService.addComment(req.body, req.userId);
        res.send({
            message: "add comment",
        });
    }

    deleteCommentById = async function (req, res, next) {
        console.log(req.params);
        // let id = req.params.id;
        // let data = await readJsonFile();
        // data = data.filter((e) => e.id !== id);
        // writeFile(data);

        let id = req.params.id;
        const data = await CommentService.getCommentById(id);
        if (!data) throw new BadRequestError('id không tìm thấy');
        await CommentService.deleteCommentById(id);
        res.send({
            message: "delete comment"
        });
    }

    editCommentById = async function (req, res, next) {
        console.log(req.params);
        console.log(req.body);
        // let id = req.params.id;
        // let data = await readJsonFile();
        // let commentIndex = data.findIndex((e) => e.id == id);
        // if (commentIndex !== -1) {
        //     data[commentIndex].name = name;
        // }
        // writeFile(data);

        let id = req.params.id;
        let obj = req.body;
        const data = await CommentService.getCommentById(id);
        if (!data) throw new Error('id không tìm thấy');

        await CommentService.editCommentById(id, obj);

        res.send({
            message: "edit comment"
        });
    }

}

module.exports = new CommentController()