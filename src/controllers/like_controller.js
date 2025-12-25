var { ErrorCustom, BadRequestError, AuthentificationError } = require('../app/core/error_custom');
const { checkMogooseObjectId } = require('../app/helpers/check');
let LikeService = require('../services/like_service');

class LikeController {

    getAllLike = async function (req, res, next) {
        const data = await LikeService.getAllLike(req.query);
        res.send({
            message: "get all like",
            data
        });
    };

    getLikeById = async function (req, res, next) {
        console.log(req.params);
        let id = req.params.id;
        if (!checkMogooseObjectId(id))
            throw new BadRequestError('không tìm thấy id');
        const data = await LikeService.getLikeById(id);
        if (!data) throw new Error('không tìm thấy id');
        res.send({
            message: "get one like",
            data
        });
    };

    addLike = async function (req, res, next) {
        const like = await LikeService.getLikeByParams({ commentId: req.body.commentId, userId: req.userId });
        if (like) {
            await LikeService.deleteLikeById(like._id);
            //xóa likeCount trong comment
        } else {
            await LikeService.addLike(req.body.commentId, req.userId);
            //tăng likeCount trong comment
        }
        res.send({
            message: "add like",
        });
    }

    deleteLikeById = async function (req, res, next) {
        let id = req.params.id;
        const like = await LikeService.getLikeById(id);
        if (!like) throw new BadRequestError('id không tìm thấy');

        await LikeService.deleteLikeById(like);
        res.send({
            message: "delete like"
        });
    }

    editLikeById = async function (req, res, next) {
        let id = req.params.id;
        let obj = req.body.content ? { content: req.body.content } : {};

        const data = await LikeService.getLikeByParams({ _id: id, userId: req.userId });
        if (!data) throw new Error('id không tìm thấy');

        await LikeService.editLikeById(id, obj);

        res.send({
            message: "edit like"
        });
    }

}

module.exports = new LikeController()