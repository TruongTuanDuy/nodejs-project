const ProductModel = require('../models/product_model');

class ProductService {

    add = async (data) => {
        await ProductModel.create(data)
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

        let count = await ProductModel.find(findObj).countDocuments();
        let data = await ProductModel.find(findObj).sort(sortObj).skip(skip).limit(limit);
        return {
            page,
            limit,
            total: count,
            data,
        };
    };

    //HỎI RÕ THÊM YÊU CẦU
    searchProduct = async (query) => {
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