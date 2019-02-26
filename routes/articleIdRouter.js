const articleId = require('express').Router();
const { getArticleById } = require('../controller/articleIdController');

articleId.route('/').get(getArticleById);

module.exports = articleId;
