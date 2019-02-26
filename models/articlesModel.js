const connection = require('../db/connection');

// SELECT articles.*, COUNT(comment_id) AS comment_count FROM articles
// INNER JOIN comments ON articles.article_id = comments.article_id
// GROUP BY articles.article_id;

exports.fetchAllTopics = (query, column, sort) => connection('articles')
  .select('articles.*')
  .count('comment_id AS comment_count')
  .innerJoin('comments', 'articles.article_id', 'comments.article_id')
  .groupBy('articles.article_id')
  .where(query)
  .orderBy(column, sort);

exports.addTopic = insert => connection('articles')
  .insert(insert)
  .returning('*');
