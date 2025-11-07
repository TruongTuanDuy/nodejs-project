const { Schema, model } = require('mongoose');
var slugify = require('slugify');

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    slug: {
        type: String,
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
        default: "inactive",
        enum: ["active", "inactive"]
    },
    product_count: {
        type: Number,
        default: 0,
    }
},
    {
        timestamps: true,
    });

categorySchema.pre('save', function (next) {
    console.log(this.name);
    this.slug = slugify(this.name, { lower: true });
    next();

})

module.exports = model('categories', categorySchema);