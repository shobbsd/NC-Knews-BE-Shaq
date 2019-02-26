const connection = require('../db/connection');

exports.fetchArticleById = article_id => connection('articles')
  .select('articles.*')
  .count('comment_id AS comment_count')
  .innerJoin('comments', 'articles.article_id', 'comments.article_id')
  .groupBy('articles.article_id')
  .where({ article_id });
