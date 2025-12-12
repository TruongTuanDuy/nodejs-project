const { Schema, model, default: mongoose } = require('mongoose');

const shippingSchema = new Schema({
    code: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
        unique: true, //có cần không???
        trim: true,
    },
    status: {
        type: String,
        default: "active",
        enum: ["active", "inactive"]
    },
    fee: {
        type: Number,
        default: 0,
    },
},
    {
        timestamps: true,
    });

module.exports = model('shippings', shippingSchema);
