// Hình như sai, ko xài file này
// Service ko nên gọi đến Modle khác trực tiếp, mà nên thông qua các service tương ứng

const CategoryModel = require('../models/category_model');
const ProductModel = require('../models/product_model');

class SearchService {

    search = async (query) => {
        const { type, keyword } = query;
        const regex = new RegExp(keyword, 'i'); // tìm không phân biệt hoa thường
        const limit = 10;
        let data = {};
        let products = {};
        let categories = {};
        switch (type) {
            case 'category':
                categories = await CategoryModel.find({ name: regex }).limit(limit);
                data = {
                    ...data,
                    categories
                }
                break;
            case 'product':
                products = await ProductModel.find({
                    $or: [{ name: regex }, { description: regex }]
                }).limit(limit);
                data = {
                    ...data,
                    products
                }
                break;
            default:
                [products, categories] = await Promise.all([
                    ProductModel.find({
                        $or: [{ name: regex }, { description: regex }]
                    }).limit(limit),
                    CategoryModel.find({ name: regex }).limit(limit)
                ]);
                data = {
                    ...data,
                    products,
                    categories
                }
                break;
        }
        return data;
    };
}

module.exports = new SearchService();