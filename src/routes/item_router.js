var express = require('express');
var router = express.Router();


const ItemController = require('../controllers/item_controller');

/* GET home page. */
router.get('/', ItemController.getAllItem);

router.get('/:id', ItemController.getOneItem);

router.post('/', ItemController.addItem);

router.delete('/:id', ItemController.deleteItem);

router.put('/:id', ItemController.editItem);

module.exports = router;
