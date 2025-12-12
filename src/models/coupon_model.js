const { Schema, model, default: mongoose } = require('mongoose');

const couponSchema = new Schema({
    code: {
        type: String,
        required: true,
        unique: true, //có cần không???
        trim: true,
    },
    discountType: {
        type: String,
        default: "value",
        enum: ["value", "percent"]
    },
    discountValue: {
        type: Number,
        default: 0,
    },
    maxDiscount: {
        type: Number,
        default: 0,
    },
    discountPercent: {
        type: Number,
        default: 0,
    },
    startDate: {
        type: Date,
    },
    endDate: {
        type: Date,
    },
    quantity: {
        type: Number,
        default: 10,
    },
    available: {
        type: Number,
    },
    used: {
        type: Number,
        default: 0,
    },
    minOrderValue: {
        type: Number,
        default: 0,
    },
},
    {
        timestamps: true,
    });

module.exports = model('coupons', couponSchema);


// for (let index = 0; index < array.length; index++) {
//     const element = array[index];

// }

