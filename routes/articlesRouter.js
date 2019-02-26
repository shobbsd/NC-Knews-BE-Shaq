const articlesRouter = require('express').Router();
const {
  getAllArticles,
  postArticle,
  getArticleById,
  patchArticle,
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

module.exports = articlesRouter;
