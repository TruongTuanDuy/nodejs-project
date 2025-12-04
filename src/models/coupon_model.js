const { Schema, model, default: mongoose } = require('mongoose');
var slugify = require('slugify');

const couponSchema = new Schema({
    code: {
        type: String,
        required: true,
        trim: true,
    },
    type: {
        type: String,
        default: "discount",
        enum: ["discount", "percent"]
    },
    discount: {
        type: Number,
        default: 0,
    },
    max_discount: {
        type: Number,
        default: 0,
    },
    percent: {
        type: Number,
        default: 0,
    },
    start_date: {
        type: Date,
    },
    end_date: {
        type: Date,
    },
    total: {
        type: Number,
        default: 0,
    },
    available: {
        type: Number,
        default: 0,
    },
    used: {
        type: Number,
        default: 0,
    },
    min_apply: {
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

