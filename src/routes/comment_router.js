var express = require('express');
var router = express.Router();
var { asyncHandler } = require('../app/helpers/async_handler');

const CommentController = require('../controllers/comment_controller');
const { checkLogin } = require('../app/middlewares/check_login');

/* GET home page. */
router.get('/:id/comment', asyncHandler(CommentController.getCommentByCommentId));

router.use(checkLogin);

router.get('/', asyncHandler(CommentController.getAllComment));

router.get('/:id', asyncHandler(CommentController.getCommentById));

router.post('/', asyncHandler(CommentController.addComment));

router.delete('/:id', asyncHandler(CommentController.deleteCommentById));

router.put('/:id', asyncHandler(CommentController.editCommentById));

module.exports = router;
