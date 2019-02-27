const commentsRouter = require('express').Router();
const { patchCommentById, deleteCommentById } = require('../controller/commentsController');

commentsRouter
  .route('/:comment_id')
  .patch(patchCommentById)
  .delete(deleteCommentById);

module.exports = commentsRouter;
