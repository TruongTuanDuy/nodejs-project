const { Schema, model } = require('mongoose');


const itemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "inactive",
        enum: ["active", "inactive"]
    }
}, {
    timestamps: true,
});


module.exports = model('items', itemSchema);