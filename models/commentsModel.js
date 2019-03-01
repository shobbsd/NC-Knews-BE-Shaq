const connection = require('../db/connection');

exports.updateCommentById = ({ comment_id, votes }) => connection('comments')
  .where({ comment_id })
  .increment('votes', votes)
  .returning('*');

exports.removeCommentById = ({ comment_id }) => connection('comments')
  .where({ comment_id })
  .del();

exports.fetchCommentById = ({ comment_id }) => connection('comments')
  .select('*')
  .where({ comment_id });
