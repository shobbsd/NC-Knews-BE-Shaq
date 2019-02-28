\c nc_news_test

-- .select('articles.*')
--   .count('comment_id AS comment_count')
--   .innerJoin('comments', 'articles.article_id', 'comments.article_id')
--   .groupBy('articles.article_id')
--   .where(query)
--   .orderBy(column, sort)
--   .limit(limit);

SELECT articles.*, COUNT('comment_id AS comment_count'), count(*) OVER() AS total_count FROM articles
LEFT JOIN comments ON articles.article_id = comments.article_id
GROUP BY articles.article_id;

SELECT * FROM articles;
