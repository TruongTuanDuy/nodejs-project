var { ErrorCustom, BadRequestError, AuthentificationError } = require('../app/core/error_custom');
const { checkMogooseObjectId } = require('../helpers/check');
let { readJsonFile, writeFile } = require('../helpers/helper_json_file');
let SearchService = require('../services/search_service');
const cloudinary = require('../app/init_cloudinary');
let { deleteImg, deleteMultiImg } = require('../helpers/deleteImg');

class SearchController {

    searchGlobal = async function (req, res, next) {
        console.log(123);

        console.log(req.query);
        const data = await SearchService.search(req.query);
        res.send({
            message: "search global",
            data
        });
    };

}

module.exports = new SearchController()