const {
  fetchAllArticles,
  addArticle,
  fetchArticleById,
  updateArticle,
  removeArticle,
  fetchCommentsByArticleId,
  addCommentByArticleId,
} = require('../models/articlesModel');

exports.getAllArticles = (req, res, next) => {
  const query = {};
  let column = 'created_at';
  let sort = 'desc';
  if (req.query.author) query['articles.author'] = req.query.author;
  if (req.query.topic) query.topic = req.query.topic;
  if (req.query.sort_by) column = req.query.sort_by;
  if (req.query.order) {
    if (req.query.order === 'asc' || req.query.order === 'asc') {
      sort = req.query.order;
    } else {
      next({ status: 400, msg: 'That is not an accepted order, use "asc" or "desc"' });
    }
  }
  fetchAllArticles(query, column, sort)
    .then((articles) => {
      if (articles.length < 1) {
        next({ status: 400, msg: 'There are no articles associated with that author/topic' });
      } else res.status(200).json({ articles });
    })
    .catch((err) => {
      next(err);
    });
};

exports.postArticle = (req, res, next) => {
  const insert = req.body;
  insert.author = insert.username;
  delete insert.username;
  addArticle(insert)
    .then(([article]) => {
      res.status(201).json({ article });
    })
    .catch(next);
};

exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params;
  if (!Number.isNaN(+article_id)) {
    fetchArticleById({ article_id })
      .then(([article]) => res.status(200).json({ article }))
      .catch(next);
  } else {
    next({ status: 400, msg: 'article_id must be a number' });
  }
};

exports.patchArticle = (req, res, next) => {
  const { article_id } = req.params;
  const votes = req.body.inc_votes;
  updateArticle({ article_id, votes }).then(([article]) => {
    res.status(200).json({ article });
  });
};

exports.deleteArticle = (req, res, next) => {
  const { article_id } = req.params;
  removeArticle({ article_id }).then((response) => {
    res.sendStatus(204);
  });
};

exports.getCommentsByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  let column = 'created_at';
  let sort = 'desc';
  if (req.query.sort_by) column = req.query.sort_by;
  if (req.query.order) sort = req.query.order;
  fetchCommentsByArticleId({ article_id, column, sort }).then((comments) => {
    res.status(200).json({ comments });
  });
};

exports.postCommentByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  const { username: author, body } = req.body;
  addCommentByArticleId({ article_id, author, body }).then(([comment]) => {
    res.status(201).json({ comment });
  });
};
