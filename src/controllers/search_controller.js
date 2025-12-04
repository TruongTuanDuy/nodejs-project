var { ErrorCustom, BadRequestError, AuthentificationError } = require('../app/core/error_custom');
//từ controller ko gọi thẳng model, mà phải gọi service tương ứng
const product_service = require('../services/product_service');
const category_service = require('../services/category_service');

class SearchController {

    searchGlobal = async function (req, res, next) {
        const { type, keyword, limit = 10 } = req.query;

        const [products, categories] = await Promise.all([
            product_service.getAllProduct({ findValue: keyword, limit }),
            category_service.getAllCategory({ findValue: keyword, limit }),

        ]);

        let resolve = {
            products: products.data,
            categories: categories.data
        }

        // const data = await SearchService.search(req.query); //Ko nên xài SearchService
        res.send({
            message: "search global",
            data: type ? { [type]: resolve[type] } : resolve
        });
    };
}

module.exports = new SearchController()