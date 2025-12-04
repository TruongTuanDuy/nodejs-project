var { ErrorCustom, BadRequestError, AuthentificationError } = require('../app/core/error_custom');
const { checkMogooseObjectId } = require('../app/helpers/check');
let ProductService = require('../services/product_service');
const cloudinary = require('../app/core/init_cloudinary');
let { deleteImg, deleteMultiImg } = require('../app/helpers/deleteImg');

class ProductController {

    addProduct = async function (req, res, next) {
        let { price, sale_price, sale_percent } = req.body;
        if (sale_price) {
            sale_percent = ((price - sale_price) / price * 100).toFixed(0);
        } else if (sale_percent) {
            sale_price = price - (price * sale_percent / 100).toFixed(0);
        }
        req.body.sale_price = sale_price;
        req.body.sale_percent = sale_percent;

        await ProductService.add(req.body);
        res.send({
            message: "add product",
        });
    }

    getAllProduct = async function (req, res, next) {
        const data = await ProductService.getAllProduct(req.query);
        res.send({
            message: "get all product",
            data
        });
    };

    getProductById = async function (req, res, next) {
        let id = req.params.id;
        if (!checkMogooseObjectId(id))
            throw new BadRequestError('không tìm thấy id');
        const data = await ProductService.getProductById(id);
        if (!data) throw new Error('không tìm thấy id');
        res.send({
            message: "get one product",
            data
        });
    };


    deleteProductById = async function (req, res, next) {
        let id = req.params.id;
        const data = await ProductService.getProductById(id);
        if (!data) throw new BadRequestError('id không tìm thấy');
        await ProductService.deleteProductById(id);
        res.send({
            message: "delete product"
        });
    }

    editProductById = async function (req, res, next) {
        let id = req.params.id;
        let obj = req.body;
        const data = await ProductService.getProductById(id);
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

        await ProductService.editProductById(id, obj);

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

        const data = await ProductService.getProductById(id);

        if (!data) {
            deleteMultiImg(array);
            throw new Error('id không tìm thấy');
        };

        for (let index = 0; index < array.length; index++) {
            let path = array[index].path;
            try {
                let result = await cloudinary.uploader
                    .upload(path, { folder: 'categories' });
                url.push(result.url);
                deleteImg(path);
            } catch (error) {
                deleteImg(path);
                throw new ErrorCustom('Lỗi tải ảnh lên Cloudinary', 500, err);
            }
        }
        ProductService.editProductById(id, { images: url });

        res.send({
            message: "upload image product"
        });
    }

    uploadImgProduct = async function (req, res, next) {
        let id = req.params.id;
        let obj = req.body;
        let path = req.file.path;

        if (!checkMogooseObjectId(id)) {
            deleteImg(path);
            throw new BadRequestError('không tìm thấy id');
        }

        const data = await ProductService.getProductById(id);

        if (!data) {
            deleteImg(path);
            throw new Error('id không tìm thấy');
        };

        cloudinary.uploader
            .upload(path, { folder: 'products' })
            .then(result => {
                obj.thumb = result.url;
                ProductService.editProductById(id, obj);
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