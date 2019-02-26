const articlesRouter = require('express').Router();
const articleId = require('./articleIdRouter');
const { getAllTopics, postTopic } = require('../controller/articlesController');

articlesRouter
  .route('/')
  .get(getAllTopics)
  .post(postTopic);

articlesRouter.use('/:article_id', articleId);

module.exports = articlesRouter;
