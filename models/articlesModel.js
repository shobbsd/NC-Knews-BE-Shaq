const connection = require('../db/connection');

// SELECT articles.*, COUNT(comment_id) AS comment_count FROM articles
// INNER JOIN comments ON articles.article_id = comments.article_id
// GROUP BY articles.article_id;

exports.fetchAllArticles = (query, column, sort) => connection('articles')
  .select('articles.*')
  .count('comment_id AS comment_count')
  .innerJoin('comments', 'articles.article_id', 'comments.article_id')
  .groupBy('articles.article_id')
  .where(query)
  .orderBy(column, sort);

exports.addArticle = insert => connection('articles')
  .insert(insert)
  .returning('*');

exports.fetchArticleById = ({ article_id }) => connection('articles')
  .select('articles.*')
  .count('comment_id AS comment_count')
  .innerJoin('comments', 'articles.article_id', 'comments.article_id')
  .groupBy('articles.article_id')
  .where({ 'articles.article_id': article_id });

exports.updateArticle = ({ article_id, votes }) => connection('articles')
  .where({ article_id })
  .increment('votes', votes)
  .returning('*');

exports.removeArticle = () => {
  console.log('here');
};
