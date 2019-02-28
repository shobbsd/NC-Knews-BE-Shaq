const { fetchAllTopics, addNewTopic } = require('../models/topicsModel');

exports.getAllTopics = (req, res, next) => {
  fetchAllTopics()
    .then((topics) => {
      res.status(200).json({ topics });
    })
    .catch(next);
};

exports.postTopic = (req, res, next) => {
  addNewTopic(req.body)
    .then(([topic]) => {
      res.status(201).json({ topic });
    })
    .catch(next);
};
