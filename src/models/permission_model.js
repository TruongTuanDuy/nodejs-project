const { Schema, model } = require('mongoose');

const permissionSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    router: {
        type: String,
        default: "",
    },
    method: {
        type: String,
    },
}, {
    timestamps: true,
});

module.exports = model('permissions', permissionSchema);