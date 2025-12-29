var express = require('express');
var router = express.Router();
var { asyncHandler } = require('../app/helpers/async_handler');

const CommentController = require('../controllers/comment_controller');
const { checkLogin } = require('../app/middlewares/check_login');
const { checkPermission } = require('../app/middlewares/check_permission');

/* GET home page. */
router.get('/:id/reply', asyncHandler(CommentController.getReplyByCommentId));

router.get('/product/:id', asyncHandler(CommentController.getCommentByProductId));

router.use(checkLogin);
router.get('/', asyncHandler(CommentController.getAllComment));

router.get('/:id', asyncHandler(CommentController.getCommentById));

router.post('/', asyncHandler(CommentController.addComment));

router.put('/:id', asyncHandler(CommentController.editCommentById));

router.post('/:id/like', asyncHandler(CommentController.likeComment));

router.use(checkPermission);
router.delete('/:id', asyncHandler(CommentController.deleteCommentById));

module.exports = router;
