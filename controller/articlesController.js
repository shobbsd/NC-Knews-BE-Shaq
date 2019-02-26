const {
  fetchAllArticles,
  addArticle,
  fetchArticleById,
  updateArticle,
} = require('../models/articlesModel');

exports.getAllArticles = (req, res, next) => {
  const query = {};
  let column = 'created_at';
  let sort = 'desc';
  if (req.query.author) query['articles.author'] = req.query.author;
  if (req.query.topic) query.topic = req.query.topic;
  if (req.query.sort_by) column = req.query.sort_by;
  if (req.query.order) sort = req.query.order;
  fetchAllArticles(query, column, sort).then((articles) => {
    res.status(200).json({ articles });
  });
};

exports.postArticle = (req, res, next) => {
  const insert = req.body;
  insert.author = insert.username;
  delete insert.username;
  addArticle(insert).then((article) => {
    res.status(201).json({ article });
  });
};

exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params;
  fetchArticleById({ article_id }).then(article => res.status(200).json({ article }));
};

exports.patchArticle = (req, res, next) => {
  const { article_id } = req.params;
  const votes = req.body.inc_votes;
  updateArticle({ article_id, votes }).then((article) => {
    res.status(201).json({ article });
  });
};

exports.deleteArticle = (req, res, next) => {};
