var { ErrorCustom, BadRequestError, AuthentificationError } = require('../app/core/error_custom');
const { checkMogooseObjectId } = require('../helpers/check');
let { readJsonFile, writeFile } = require('../helpers/helper_json_file');
let SearchService = require('../services/search_service');
const cloudinary = require('../app/init_cloudinary');
let { deleteImg, deleteMultiImg } = require('../helpers/deleteImg');
const product_service = require('../services/product_service');
const category_service = require('../services/category_service');

class SearchController {

    searchGlobal = async function (req, res, next) {
        console.log(123);

        console.log(req.query);
        const { type, keyword, limit = 10 } = req.query;

        const [products, categories] = await Promise.all([
            product_service.getAll({ findValue: keyword, limit }),
            category_service.getAll({ findValue: keyword, limit }),

        ]);
        let resolve = {
            products: products.data,
            categories: categories.data
        }

        // const data = await SearchService.search(req.query);
        res.send({
            message: "search global",
            data: type ? { [type]: resolve[type] } : resolve
        });
    };

}

module.exports = new SearchController()