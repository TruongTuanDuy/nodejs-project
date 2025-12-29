const { Schema, model, default: mongoose } = require('mongoose');
var slugify = require('slugify');

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    slug: {
        type: String,
    },
    description: {
        type: String,
        default: null,
    },
    sku: {
        type: String,
        trim: true,
    },
    ordering: {
        type: Number,
        default: 0,
    },
    thumb: {
        type: String,
        default: null,
    },
    images: {
        type: Array,
        default: [],
    },
    status: {
        type: String,
        default: "active",
        enum: ["active", "inactive"]
    },
    price: {
        type: Number,
        default: 0,
    },
    sale_price: {
        type: Number,
        default: 0,
    },
    sale_percent: {
        type: Number,
        default: 0,
    },
    is_special: {
        type: Boolean,
        default: false,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categories', //phải trùng với tên collection trong category_model.js
        required: true,
    },
    stock: {
        type: Number,
        default: 10,
    }
},
    {
        timestamps: true,
    });

productSchema.pre('save', function (next) {
    this.slug = slugify(this.name, { lower: true });
    next();
})

productSchema.index({ name: 'text' });

module.exports = model('products', productSchema);