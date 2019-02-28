const {
  fetchAllArticles,
  addArticle,
  fetchArticleById,
  updateArticle,
  removeArticle,
  fetchCommentsByArticleId,
  addCommentByArticleId,
  countArticles,
} = require('../models/articlesModel');

const { queryCreator, checker } = require('./tools');

exports.getAllArticles = (req, res, next) => {
  const query = queryCreator(req, res, next);

  return Promise.all([fetchAllArticles(query), countArticles(query), checker(req, res, next)])
    .then(([articles, count, topicExists]) => {
      if (!topicExists) next({ status: 404, msg: `"${req.query.topic}" does not exist as a topic` });
      const total_count = count.length;
      if (articles.length < 1) {
        next({ status: 400, msg: 'There are no articles associated with that author/topic' });
      } else res.status(200).json({ total_count, articles });
    })
    .catch(next);
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
      .then(([article]) => {
        if (article === undefined) next({ status: 404, msg: `The article_id (${article_id}) does not exist` });
        res.status(200).json({ article });
      })
      .catch(next);
  } else {
    next({ status: 400, msg: 'article_id must be a number' });
  }
};

exports.patchArticle = (req, res, next) => {
  const { article_id } = req.params;
  const votes = req.body.inc_votes;
  if (typeof votes !== 'number') {
    next({ status: 400, msg: 'Either there are no votes, or the change in votes is not a number' });
  } else if (Object.keys(req.body).includes('inc_votes') && Object.keys(req.body).length < 2) {
    updateArticle({ article_id, votes })
      .then(([article]) => {
        res.status(200).json({ article });
      })
      .catch(next);
  } else {
    next({ status: 400, msg: 'There are too many items in the body' });
  }
};

exports.deleteArticle = (req, res, next) => {
  const { article_id } = req.params;
  if (!Number.isNaN(+article_id)) {
    removeArticle({ article_id })
      .then((response) => {
        if (response < 1) {
          next({ status: 404, msg: 'This id doesnt exist' });
        } else res.sendStatus(204);
      })
      .catch(next);
  } else {
    next({ status: 400, msg: 'The article_id must be a number' });
  }
};

exports.getCommentsByArticleId = (req, res, next) => {
  const query = queryCreator(req, res, next);
  if (!Number.isNaN(+query.article_id)) {
    fetchCommentsByArticleId(query)
      .then((comments) => {
        if (comments.length < 1) {
          next({
            status: 404,
            msg:
              'There are no messages associated with this article, or there is no article with this ID',
          });
        } else res.status(200).json({ comments });
      })
      .catch(next);
  } else {
    next({ status: 400, msg: 'The article_id must be a number' });
  }
};

exports.postCommentByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  const { username: author, body } = req.body;
  if (!Number.isNaN(+article_id)) {
    addCommentByArticleId({ article_id, author, body })
      .then(([comment]) => {
        res.status(201).json({ comment });
      })
      .catch(next);
  } else {
    next({ status: 400, msg: 'The article_id must be a number' });
  }
};