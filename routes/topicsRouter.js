const topicsRouter = require('express').Router();
const { getAllTopics } = require('../controller/topicsController');

topicsRouter.route('/').get(getAllTopics);

module.exports = topicsRouter;
