const handlerFindObj = require('../app/helpers/find_obj');
const CommentModel = require('../models/comment_model');
const LikeCommentModel = require('../models/like_comment_model');

class CommentService {

    addComment = async (data, userId) => {
        const { content, productId, commentId = null } = data;
        let newComment = new CommentModel({
            userId: userId,
            productId: productId,
            commentId: commentId,
            content: content
        });

        if (commentId) {
            let parentComment = await CommentModel.findById(commentId);
            if (!parentComment) throw new Error('không tìm thấy comment');
            newComment.left = parentComment.right;
            newComment.right = parentComment.right + 1;
            await CommentModel.updateMany(
                { productId: productId, right: { $gte: parentComment.right } },
                { $inc: { right: 2 } }
            );
            await CommentModel.updateMany(
                { productId: productId, left: { $gt: parentComment.right } },
                { $inc: { left: 2 } }
            );
        } else {
            let comment = await CommentModel.findOne({ productId: productId, commentId: null }).sort({ right: -1 });
            if (comment) {
                newComment.left = comment.right + 1;
                newComment.right = comment.right + 2;
            }
            else {
                newComment.left = 1;
                newComment.right = 2;
            }
        }
        newComment.save()
        // await CommentModel.create(data)
    };

    getAllComment = async (query) => {
        const { findObj, sortObj, skip, page, limit } = handlerFindObj(query);
        let count = await CommentModel.find(findObj).countDocuments();
        let data = await CommentModel.find(findObj).sort(sortObj).skip(skip).limit(limit);
        return {
            page,
            limit,
            total: count,
            data,
        };
    };

    getCommentByParams = async (params) => {
        let data = await CommentModel.findOne(params)
        return data
    };

    getCommentById = async (id) => {
        let data = await CommentModel.findById(id)
        return data
    };

    getReplyByCommentId = async (comment) => {
        let reply = await CommentModel.find({
            productId: comment.productId,
            left: { $gt: comment.left },
            right: { $lt: comment.right }
        });
        return reply
    };

    deleteCommentById = async (comment) => {
        const left = comment.left;
        const right = comment.right;
        const width = right - left + 1;

        await CommentModel.deleteMany({
            productId: comment.productId,
            left: { $gte: left },
            right: { $lte: right }
        });
        await CommentModel.updateMany(
            { productId: comment.productId, left: { $gt: left } },
            { $inc: { left: -width } }
        );
        await CommentModel.updateMany(
            { productId: comment.productId, right: { $gt: right } },
            { $inc: { right: -width } }
        );
    };

    editCommentById = async (id, obj) => {
        await CommentModel.findByIdAndUpdate(id, obj)
    };

    likeComment = async (userId, commentId) => {
        const like = await LikeCommentModel.findOne({ userId, commentId });
        console.log(like);
        if (like) {
            await LikeCommentModel.findByIdAndDelete(like._id);
            await CommentModel.findByIdAndUpdate(commentId, { $inc: { likeCount: -1 } });
        } else {
            await LikeCommentModel.create({ userId, commentId });
            await CommentModel.findByIdAndUpdate(commentId, { $inc: { likeCount: 1 } });
        }
    };

}
module.exports = new CommentService();