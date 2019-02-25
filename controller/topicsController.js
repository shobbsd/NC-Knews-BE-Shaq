const { fetchAllTopics } = require('../models/topicsModel');

exports.getAllTopics = (req, res, next) => {
  fetchAllTopics();
};
