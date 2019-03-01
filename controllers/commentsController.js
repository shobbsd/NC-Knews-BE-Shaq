const {
  updateCommentById,
  removeCommentById,
  fetchCommentById,
} = require('../models/commentsModel');

exports.patchCommentById = (req, res, next) => {
  const { comment_id } = req.params;
  const votes = req.body.inc_votes;

  if (!req.body.inc_votes) {
    return fetchCommentById({ comment_id }).then(([response]) => {
      res.status(200).json({ response });
    });
  }
  if (typeof votes !== 'number') {
    return next({
      status: 400,
      msg: 'Either there are no votes, or the change in votes is not a number',
    });
  }
  if (Object.keys(req.body).includes('inc_votes') && Object.keys(req.body).length < 2) {
    return updateCommentById({ comment_id, votes })
      .then(([comment]) => {
        if (!comment) {
          next({ status: 404, msg: 'This id doesnt exist' });
        } else res.status(200).json({ comment });
      })
      .catch(next);
  }
  return next({ status: 400, msg: 'There are too many items in the body' });
};

// const { article_id } = req.params;
// const votes = req.body.inc_votes;
// const allowedPatches = ['inc_votes'];
// if (!votes) {
//   return fetchArticleById({ article_id })
//     .then(([article]) => {
//       if (article === undefined) {
//         next({ status: 404, msg: `The article_id (${article_id}) does not exist` });
//       } else res.status(200).json({ article });
//     })
//     .catch(next);
// }
// if (typeof votes !== 'number') {
//   return next({
//     status: 400,
//     msg: 'Either there are no votes, or the change in votes is not a number',
//   });
// }
// if (Object.keys(req.body).includes('inc_votes') && Object.keys(req.body).length < 2) {
//   return updateArticle({ article_id, votes })
//     .then(([article]) => {
//       res.status(200).json({ article });
//     })
//     .catch(next);
// }
// return next({ status: 400, msg: 'There are too many items in the body' });

exports.deleteCommentById = (req, res, next) => {
  const { comment_id } = req.params;
  if (!Number.isNaN(+comment_id)) {
    removeCommentById({ comment_id })
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
