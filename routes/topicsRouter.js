const topicsRouter = require('express').Router();
const { getAllTopics, postTopic } = require('../controller/topicsController');

topicsRouter
  .route('/')
  .get(getAllTopics)
  .post(postTopic);

module.exports = topicsRouter;
