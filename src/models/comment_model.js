const { Schema, model } = require('mongoose');

const commentSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'products',
        required: true
    },
    commentId: {
        type: Schema.Types.ObjectId,
        ref: 'comments',
        default: null
    },
    content: {
        type: String,
    },
    likeCount: {
        type: Number,
        default: 0
    },
    left: {
        type: Number,
    },
    right: {
        type: Number,
    }
}, {
    timestamps: true,
});




module.exports = model('comments', commentSchema);