const commentsRouter = require('express').Router();
const { patchCommentById, deleteCommentById } = require('../controller/commentsController');
const { handle405 } = require('../errors');

commentsRouter
  .route('/:comment_id')
  .patch(patchCommentById)
  .delete(deleteCommentById)
  .all(handle405);

module.exports = commentsRouter;
