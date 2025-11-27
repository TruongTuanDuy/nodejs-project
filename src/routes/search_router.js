var express = require('express');
var router = express.Router();
var { asyncHandler } = require('../app/helpers/async_handler');
const SearchController = require('../controllers/search_controller');

/* GET home page. */

router.get('/', asyncHandler(SearchController.searchGlobal));

module.exports = router;