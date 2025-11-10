const CategoryModel = require('../models/category_model');
const ProductModel = require('../models/product_model');

class CategoryService {

    add = async (data) => {
        await CategoryModel.create(data)
    };

    getAll = async (query) => {
        const { sortField = 'createdAt', sortDir = "asc", findField = 'name', findValue, status, page, limit } = query
        let findObj = {};
        let sortObj = {};
        const skip = (page - 1) * limit;
        if (status == 'active' || status == 'inactive') {
            findObj = {
                ...findObj,
                status
            }
        };
        if (findField) {
            findObj[findField] = new RegExp(findValue, 'i');
        };
        if (sortField) {
            sortObj[sortField] = sortDir;
        };

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
        let data = await ProductModel.find({ category: id })
        return data
    };

    edit = async (id, obj) => {
        await CategoryModel.findByIdAndUpdate(id, obj)
    };

    delete = async (id) => {
        await CategoryModel.findByIdAndDelete(id)
    };
}
module.exports = new CategoryService();