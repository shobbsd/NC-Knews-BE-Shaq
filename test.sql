\c nc_news

 SELECT articles.*, COUNT(comment_id) AS comment_count FROM articles
--  WHERE articles.author = '*'
 INNER JOIN comments ON articles.article_id = comments.article_id
 GROUP BY articles.article_id