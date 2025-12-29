var { ErrorCustom, BadRequestError, AuthentificationError } = require('../app/core/error_custom');
const { checkMogooseObjectId } = require('../app/helpers/check');
let CommentService = require('../services/comment_service');

class CommentController {

    getAllComment = async function (req, res, next) {
        const data = await CommentService.getAllComment(req.query);
        res.send({
            message: "get all comment",
            data
        });
    };

    getCommentByProductId = async function (req, res, next) {
        console.log(req.params.id);

        console.log(req.query);
        const data = await CommentService.getAllComment({ ...req.query, productId: req.params.id });
        res.send({
            message: "get all comment by product id",
            data
        });
    };

    getReplyByCommentId = async function (req, res, next) {
        let id = req.params.id;
        if (!checkMogooseObjectId(id))
            throw new BadRequestError('không tìm thấy id');
        const comment = await CommentService.getCommentById(id);
        if (!comment) throw new Error('không tìm thấy id');
        const reply = await CommentService.getReplyByCommentId(comment);
        res.send({
            message: "get reply comment",
            reply
        });
    };

    getCommentById = async function (req, res, next) {
        console.log(req.params);
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
        let id = req.params.id;
        const comment = await CommentService.getCommentById(id);
        if (!comment) throw new BadRequestError('id không tìm thấy');

        await CommentService.deleteCommentById(comment);
        res.send({
            message: "delete comment"
        });
    }

    editCommentById = async function (req, res, next) {
        let id = req.params.id;
        let { content } = req.body

        const data = await CommentService.getCommentByParams({ _id: id, userId: req.userId });
        if (!data) throw new Error('id không tìm thấy');

        await CommentService.editCommentById(id, { content });

        res.send({
            message: "edit comment"
        });
    }

    likeComment = async function (req, res, next) {
        await CommentService.likeComment(req.userId, req.params.id);

        res.send({
            message: "like comment"
        });
    }
}

module.exports = new CommentController()