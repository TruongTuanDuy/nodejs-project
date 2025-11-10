const handlerFindObj = require('../helpers/find_obj');
const CategoryModel = require('../models/category_model');
const ProductModel = require('../models/product_model');

class CategoryService {

    add = async (data) => {
        await CategoryModel.create(data)
    };

    getAll = async (query) => {
        const { findObj, sortObj, skip, page, limit } = handlerFindObj(query);

        let count = await CategoryModel.find(findObj).countDocuments();
        let data = await CategoryModel.find(findObj).sort(sortObj).skip(skip).limit(limit);
        return {
            page,
            limit,
            total: count,
            data,
        };
    };

    getOne = async (id) => {
        // let data = CategoryModel.findById(id).then(data => data)
        // console.log(data);

        // try {
        // } catch (error) {
        //     throw
        // }

        let data = await CategoryModel.findById(id)
        return data
    };

    getProduct = async (id) => {
        // let data = await ProductModel.find({ category: id })
        // let count = await ProductModel.find({ category: id }).countDocuments();

        let [data, count] = await Promise.all([
            ProductModel.find({ category: id }),
            ProductModel.find({ category: id }).countDocuments()
        ]);

        return {
            // page,
            // limit,
            total: count,
            data,
        };
    };

    edit = async (id, obj) => {
        await CategoryModel.findByIdAndUpdate(id, obj)
    };

    delete = async (id) => {
        await CategoryModel.findByIdAndDelete(id)
    };
}
module.exports = new CategoryService();