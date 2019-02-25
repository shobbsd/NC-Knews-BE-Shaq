const { fetchAllTopics, addNewTopic } = require('../models/topicsModel');

exports.getAllTopics = (req, res, next) => {
  fetchAllTopics().then((allTopics) => {
    res.status(200).json(allTopics);
  });
};

exports.postTopic = (req, res, next) => {
  addNewTopic(req.body).then((newTopic) => {
    res.status(201).json({ Added: newTopic });
  });
};
