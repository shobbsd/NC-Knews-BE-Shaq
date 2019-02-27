const topicsRouter = require('express').Router();
const { getAllTopics, postTopic } = require('../controller/topicsController');
const { handle405 } = require('../errors');

topicsRouter
  .route('/')
  .get(getAllTopics)
  .post(postTopic)
  .all(handle405);

module.exports = topicsRouter;
