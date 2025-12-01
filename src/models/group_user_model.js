const { Schema, model } = require('mongoose');

const itemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    permission_ids: [{
        type: Schema.Types.ObjectId,
        ref: 'permissions', //phải trùng với tên collection 
        required: true,
    },]
}, {
    timestamps: true,
});

module.exports = model('group_users', itemSchema);