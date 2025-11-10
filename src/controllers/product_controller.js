var { ErrorCustom, BadRequestError, AuthentificationError } = require('../app/core/error_custom');
const { checkMogooseObjectId } = require('../helpers/check');
let { readJsonFile, writeFile } = require('../helpers/helper_json_file');
let ProductService = require('../services/product_service');
const cloudinary = require('../app/init_cloudinary');
let { deleteImg, deleteMultiImg } = require('../helpers/deleteImg');

class ProductController {

    getAllProduct = async function (req, res, next) {
        // const data = await readJsonFile();
        console.log(req.query);
        const data = await ProductService.getAll(req.query);
        res.send({
            message: "get all product",
            data
        });
    };

    searchProduct = async function (req, res, next) {
        // const data = await readJsonFile();
        console.log(req.query);
        const data = await ProductService.searchProduct(req.query);
        res.send({
            message: "search product",
            data
        });
    };

    getOneProduct = async function (req, res, next) {
        console.log(req.params);
        // let id = req.params.id;
        // const data = await readJsonFile();
        // let result = data.find((e) => e.id == id);
        let id = req.params.id;
        if (!checkMogooseObjectId(id))
            throw new BadRequestError('không tìm thấy id');
        const data = await ProductService.getOne(id);
        if (!data) throw new Error('không tìm thấy id');
        res.send({
            message: "get one product",
            data
        });
    };

    addProduct = async function (req, res, next) {
        console.log(req.body);
        // const data = await readJsonFile();
        // data.push({
        //     "id": data.length + 1,
        //     "name": req.body.name,
        // });
        // writeFile(data);

        await ProductService.add(req.body);
        res.send({
            message: "add product",
        });
    }

    deleteProduct = async function (req, res, next) {
        console.log(req.params);
        // let id = req.params.id;
        // let data = await readJsonFile();
        // data = data.filter((e) => e.id !== id);
        // writeFile(data);

        let id = req.params.id;
        const data = await ProductService.getOne(id);
        if (!data) throw new BadRequestError('id không tìm thấy');
        await ProductService.delete(id);
        res.send({
            message: "delete product"
        });
    }

    editProduct = async function (req, res, next) {
        console.log(req.params);
        console.log(req.body);
        // let id = req.params.id;
        // let data = await readJsonFile();
        // let productIndex = data.findIndex((e) => e.id == id);
        // if (productIndex !== -1) {
        //     data[productIndex].name = name;
        // }
        // writeFile(data);

        let id = req.params.id;
        let obj = req.body;
        const data = await ProductService.getOne(id);
        if (!data) throw new Error('id không tìm thấy');

        await ProductService.edit(id, obj);

        res.send({
            message: "edit product"
        });
    }

    uploadMultiImgProduct = async function (req, res, next) {
        // console.log(123);
        // console.log(req.files);
        // console.log(req.body);

        let id = req.params.id;
        let obj = req.body;
        let array = req.files;
        let url = [];

        if (!checkMogooseObjectId(id)) {
            deleteMultiImg(array);
            throw new BadRequestError('không tìm thấy id');
        }

        const data = await ProductService.getOne(id);

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
            //     ProductService.edit(id, obj);
            // }).catch(err => {
            //     throw new ErrorCustom('Lỗi tải ảnh lên Cloudinary', 500, err);
            // })
            // .finally(() => {
            //     deleteImg(path);
            // })

        }
        ProductService.edit(id, { images: url });

        res.send({
            message: "upload image product"
        });
    }

    uploadImgProduct = async function (req, res, next) {
        console.log(req.file);
        // console.log(req.body);

        let id = req.params.id;
        let obj = req.body;
        let path = req.file.path;

        if (!checkMogooseObjectId(id)) {
            deleteImg(path);
            throw new BadRequestError('không tìm thấy id');
        }

        const data = await ProductService.getOne(id);

        if (!data) {
            deleteImg(path);
            throw new Error('id không tìm thấy');
        };

        cloudinary.uploader
            .upload(path, { folder: 'categories' })
            // .then(result => console.log(result));
            .then(result => {
                obj.thumb = result.url;
                ProductService.edit(id, obj);
                deleteImg(path);

            }).catch(err => {
                deleteImg(path);
                throw new ErrorCustom('Lỗi tải ảnh lên Cloudinary', 500, err);
            })

        res.send({
            message: "upload image product"
        });
    }

}

module.exports = new ProductController()