const articlesRouter = require('express').Router();
const {
  getAllArticles,
  postArticle,
  getArticleById,
  patchArticle,
  deleteArticle,
  getCommentsByArticleId,
  postCommentByArticleId,
} = require('../controller/articlesController');

articlesRouter
  .route('/')
  .get(getAllArticles)
  .post(postArticle);

articlesRouter
  .route('/:article_id')
  .get(getArticleById)
  .patch(patchArticle)
  .delete(deleteArticle);

articlesRouter
  .route('/:article_id/comments')
  .get(getCommentsByArticleId)
  .post(postCommentByArticleId);

module.exports = articlesRouter;
