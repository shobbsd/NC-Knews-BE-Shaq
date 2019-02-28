const articlesRouter = require('express').Router();
const {
  getAllArticles,
  postArticle,
  getArticleById,
  patchArticle,
  deleteArticle,
  getCommentsByArticleId,
  postCommentByArticleId,
} = require('../controllers/articlesController');
const { handle405 } = require('../errors');

articlesRouter
  .route('/')
  .get(getAllArticles)
  .post(postArticle)
  .all(handle405);

articlesRouter
  .route('/:article_id')
  .get(getArticleById)
  .patch(patchArticle)
  .delete(deleteArticle)
  .all(handle405);

articlesRouter
  .route('/:article_id/comments')
  .get(getCommentsByArticleId)
  .post(postCommentByArticleId)
  .all(handle405);

module.exports = articlesRouter;
