var express = require('express');
var router = express.Router();
var { asyncHandler } = require('../app/helpers/async_handler');

const LikeController = require('../controllers/like_controller');
const { checkLogin } = require('../app/middlewares/check_login');
const { checkPermission } = require('../app/middlewares/check_permission');

/* GET home page. */

router.use(checkLogin);

router.get('/', asyncHandler(LikeController.getAllLike));

router.get('/:id', asyncHandler(LikeController.getLikeById));

router.post('/', asyncHandler(LikeController.addLike));

router.put('/:id', asyncHandler(LikeController.editLikeById));


router.use(checkPermission);
router.delete('/:id', asyncHandler(LikeController.deleteLikeById));

module.exports = router;
