var { ErrorCustom, BadRequestError, AuthentificationError } = require('../app/core/error_custom');
const { checkMogooseObjectId } = require('../helpers/check');
let { readJsonFile, writeFile } = require('../helpers/helper_json_file');
let ProductService = require('../services/product_service');
const cloudinary = require('../app/init_cloudinary');
let { deleteImg, deleteMultiImg } = require('../helpers/deleteImg');

class ProductController {

    getAllProduct = async function (req, res, next) {
        // const data = await readJsonFile();
        const data = await ProductService.getAll(req.query);
        res.send({
            message: "get all product",
            data
        });
    };

    getOneProduct = async function (req, res, next) {
        console.log(req.params);

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
        let { price, sale_price, sale_percent } = req.body;
        if (sale_price) {
            sale_percent = ((price - sale_price) / price * 100).toFixed(0);
        } else if (sale_percent) {
            sale_price = price - (price * sale_percent / 100).toFixed(0);
        }
        req.body.sale_price = sale_price;
        req.body.sale_percent = sale_percent;
        console.log(req.body);

        await ProductService.add(req.body);
        res.send({
            message: "add product",
        });
    }

    deleteProduct = async function (req, res, next) {
        console.log(req.params);

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

        let id = req.params.id;
        let obj = req.body;
        const data = await ProductService.getOne(id);
        if (!data) throw new Error('id không tìm thấy');
        let { price, sale_price, sale_percent } = req.body;
        //phải khống chế khi sửa giá thì phải sửa sale_price hoặc sale_percent ở Đầu vào
        if (!price) {
            price = data.price;
        }
        if (sale_price) {
            sale_percent = ((price - sale_price) / price * 100).toFixed(0);
        } else if (sale_percent) {
            sale_price = price - (price * sale_percent / 100).toFixed(0);
        }
        req.body.sale_price = sale_price;
        req.body.sale_percent = sale_percent;
        console.log(req.body);

        await ProductService.edit(id, obj);

        res.send({
            message: "edit product"
        });
    }

    uploadMultiImgProduct = async function (req, res, next) {
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
            // console.log(index);
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