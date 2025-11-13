const handlerFindObj = require('../helpers/find_obj');
const ProductModel = require('../models/product_model');

class ProductService {

    add = async (data) => {
        await ProductModel.create(data)
    };

    getAll = async (query) => {
        const { findObj, sortObj, skip, page, limit } = handlerFindObj(query);

        let count = await ProductModel.find(findObj).countDocuments();
        let data = await ProductModel.find(findObj).sort(sortObj).skip(skip).limit(limit);
        return {
            page,
            limit,
            total: count,
            data,
        };
    };

    getOne = async (id) => {
        let data = await ProductModel.findById(id)
            .populate('category', 'name slug');//
        return data
    };

    edit = async (id, obj) => {
        await ProductModel.findByIdAndUpdate(id, obj)
    };

    delete = async (id) => {
        await ProductModel.findByIdAndDelete(id)
    };
}
module.exports = new ProductService();