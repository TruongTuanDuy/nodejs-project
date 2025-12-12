const { Schema, model, default: mongoose } = require('mongoose');

const orderSchema = new Schema({
    code: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        trim: true,
    },
    address: {
        type: String,
        trim: true,
    },
    status: {
        type: String,
        default: "confirmed",
        enum: ["complete", "shipping", "confirmed", "canceled"]
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    shippingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'shippings',
        required: true,
    },
    couponId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'coupons',
        required: true,
    },
    total: {
        type: Number,
        required: true,
    },
    items:
        [{
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'products',
            },
            price: Number,
            quantity: Number
        }]
    ,

    cancelToken: { type: String },
    cancelTokenExpire: { type: Number },
},
    {
        timestamps: true,
    });

module.exports = model('orders', orderSchema);
