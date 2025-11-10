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
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categories', //phải trùng với tên collection trong category_model.js
        required: true,
    },
},
    {
        timestamps: true,
    });

productSchema.pre('save', function (next) {
    // console.log(this.name);
    this.slug = slugify(this.name, { lower: true });
    next();

})

module.exports = model('products', productSchema);