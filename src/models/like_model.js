const { Schema, model } = require('mongoose');

const likeSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    commentId: {
        type: Schema.Types.ObjectId,
        ref: 'comments',
        default: null
    },
}
    , {
        timestamps: true,
    });

module.exports = model('likes', likeSchema);