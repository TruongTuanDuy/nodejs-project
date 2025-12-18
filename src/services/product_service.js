const handlerFindObj = require('../app/helpers/find_obj');
const ProductModel = require('../models/product_model');

class ProductService {

    addProduct = async (data) => {
        await ProductModel.create(data)
    };

    getAllProduct = async (query) => {
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

    getProductById = async (id) => {
        let data = await ProductModel.findById(id)
            .populate('category', 'name slug');//
        return data
    };

    deleteProductById = async (id) => {
        await ProductModel.findByIdAndDelete(id)
    };

    editProductById = async (id, obj) => {
        await ProductModel.findByIdAndUpdate(id, obj)
    };

    // Chưa kịp làm hàm này
    updateProductStock = async (id) => {
        await ProductModel.findByIdAndUpdate(id, { $inc: { stock: -1 } })
    }
}
module.exports = new ProductService();