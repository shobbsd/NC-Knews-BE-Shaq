const { fetchAllTopics, addTopic } = require('../models/articlesModel');

exports.getAllTopics = (req, res, next) => {
  const query = {};
  let column = 'created_at';
  let sort = 'desc';
  if (req.query.author) query['articles.author'] = req.query.author;
  if (req.query.topic) query.topic = req.query.topic;
  if (req.query.sort_by) column = req.query.sort_by;
  if (req.query.order) sort = req.query.order;
  fetchAllTopics(query, column, sort).then((articles) => {
    res.status(200).json({ articles });
  });
};

exports.postTopic = (req, res, next) => {
  const insert = req.body;
  insert.author = insert.username;
  delete insert.username;
  addTopic(insert).then(topic => res.status(201).json({ topic }));
};
