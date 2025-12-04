var { ErrorCustom, BadRequestError, AuthentificationError } = require('../app/core/error_custom');
const { checkMogooseObjectId } = require('../app/helpers/check');
let CategoryService = require('../services/category_service');
const cloudinary = require('../app/core/init_cloudinary');
let { deleteImg, deleteMultiImg } = require('../app/helpers/deleteImg');

class CategoryController {

    addCategory = async function (req, res, next) {
        await CategoryService.addCategory(req.body);
        res.send({
            message: "add category",
        });
    };

    getAllCategory = async function (req, res, next) {
        const data = await CategoryService.getAllCategory(req.query);
        res.send({
            message: "get all category",
            data
        });
    };

    getCategoryById = async function (req, res, next) {
        let id = req.params.id;
        if (!checkMogooseObjectId(id))
            throw new BadRequestError('không tìm thấy id');
        const data = await CategoryService.getCategoryById(id);
        if (!data) throw new Error('không tìm thấy id');
        res.send({
            message: "get one category",
            data
        });
    };

    getProductByCategory = async function (req, res, next) {
        let id = req.params.id;
        if (!checkMogooseObjectId(id))
            throw new BadRequestError('không tìm thấy id');
        const data = await CategoryService.getProductByCategory(id);
        if (!data) throw new Error('không tìm thấy id');
        res.send({
            message: "get product by category",
            data
        });
    };

    deleteCategoryById = async function (req, res, next) {
        // console.log(req.baseUrl, req.method); //get url and method

        let id = req.params.id;
        const data = await CategoryService.getCategoryById(id);
        if (!data) throw new BadRequestError('id không tìm thấy');
        await CategoryService.deleteCategoryById(id);
        res.send({
            message: "delete category"
        });
    }

    editCategoryById = async function (req, res, next) {
        let id = req.params.id;
        let obj = req.body;
        const data = await CategoryService.getCategoryById(id);
        if (!data) throw new Error('id không tìm thấy');

        await CategoryService.editCategoryById(id, obj);

        res.send({
            message: "edit category"
        });
    }

    uploadMultiImgCategory = async function (req, res, next) {
        let id = req.params.id;
        let obj = req.body;
        let array = req.files;
        let url = [];

        if (!checkMogooseObjectId(id)) {
            deleteMultiImg(array);
            throw new BadRequestError('không tìm thấy id');
        }

        const data = await CategoryService.getCategoryById(id);

        if (!data) {
            deleteMultiImg(array);
            throw new Error('id không tìm thấy');
        };

        for (let index = 0; index < array.length; index++) {

            let path = array[index].path;
            console.log(index);

            try {
                let result = await cloudinary.uploader
                    .upload(path, { folder: 'categories' });
                url.push(result.url);
                // console.log(path);

                deleteImg(path);
            } catch (error) {
                deleteImg(path);
                throw new ErrorCustom('Lỗi tải ảnh lên Cloudinary', 500, err);
            }
            // .then(result => console.log(result));
            // .then(result => {
            //     obj.thumb = result.url;
            //     CategoryService.edit(id, obj);
            // }).catch(err => {
            //     throw new ErrorCustom('Lỗi tải ảnh lên Cloudinary', 500, err);
            // })
            // .finally(() => {
            //     deleteImg(path);
            // })

        }

        CategoryService.editCategoryById(id, { images: url });

        res.send({
            message: "upload image category"
        });
    }

    uploadImgCategory = async function (req, res, next) {
        console.log(req.file);

        let id = req.params.id;
        let obj = req.body;
        let path = req.file.path;

        if (!checkMogooseObjectId(id)) {
            deleteImg(path);
            throw new BadRequestError('không tìm thấy id');
        }

        const data = await CategoryService.getCategoryById(id);

        if (!data) {
            deleteImg(path);
            throw new Error('id không tìm thấy');
        };

        cloudinary.uploader
            .upload(path, { folder: 'categories' })
            // .then(result => console.log(result));
            .then(result => {
                obj.thumb = result.url;
                CategoryService.editCategoryById(id, obj);
                deleteImg(path);

            }).catch(err => {
                deleteImg(path);
                throw new ErrorCustom('Lỗi tải ảnh lên Cloudinary', 500, err);
            })

        res.send({
            message: "upload image category"
        });
    }
}

module.exports = new CategoryController()