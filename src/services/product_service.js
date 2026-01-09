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
            .populate('category', 'name slug');// lấy ra 2 trường name và slug của category
        return data
    };

    deleteProductById = async (id) => {
        await ProductModel.findByIdAndDelete(id)
    };

    editProductById = async (id, obj) => {
        await ProductModel.findByIdAndUpdate(id, obj)
    };

    //còn lủng củng chỗ này
    updateProductStock = async (items, increase = false) => {
        for (let index = 0; index < items.length; index++) {
            const element = items[index];
            await ProductModel.findByIdAndUpdate(element.productId, { $inc: { stock: increase ? element.quantity : -element.quantity } })
        }
    }
}
module.exports = new ProductService();