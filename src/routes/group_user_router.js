var express = require('express');
var router = express.Router();
var { asyncHandler } = require('../app/helpers/async_handler');

const ItemController = require('../controllers/group_user_controller');

/* GET home page. */
router.get('/', asyncHandler(ItemController.getAllItem));
router.get('/:id', asyncHandler(ItemController.getItemById));

router.post('/', asyncHandler(ItemController.addItem));
router.delete('/:id', asyncHandler(ItemController.deleteItemById));
router.put('/:id', asyncHandler(ItemController.editItemById));

module.exports = router;
