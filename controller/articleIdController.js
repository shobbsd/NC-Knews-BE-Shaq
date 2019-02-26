const { fetchArticleById } = require('../models/articleIdModel');

exports.getArticleById = (req, res, next) => {
  console.log(req.params);
  // fetchArticleById(article_id).then(console.log);
};
