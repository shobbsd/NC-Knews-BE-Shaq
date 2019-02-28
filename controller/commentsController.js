const { updateCommentById, removeCommentById } = require('../models/commentsModel');

// if (typeof votes !== 'number') {
// next({ status: 400, msg: 'Either there are no votes, or the change in votes is not a number' });
// } else if (Object.keys(req.body).includes('inc_votes') && Object.keys(req.body).length < 2) {
//   updateArticle({ article_id, votes })
//     .then(([article]) => {
//       res.status(200).json({ article });
//     })
//     .catch(next);
// } else {
//   next({ status: 400, msg: 'There are too many items in the body' });
// }

exports.patchCommentById = (req, res, next) => {
  const { comment_id } = req.params;
  const votes = req.body.inc_votes;
  if (typeof votes !== 'number') {
    next({ status: 400, msg: 'Either there are no votes, or the change in votes is not a number' });
  } else if (Object.keys(req.body).includes('inc_votes') && Object.keys(req.body).length < 2) {
    updateCommentById({ comment_id, votes })
      .then(([comment]) => {
        if (!comment) {
          next({ status: 404, msg: 'This id doesnt exist' });
        } else res.status(200).json({ comment });
      })
      .catch(next);
  } else {
    next({ status: 400, msg: 'There are too many items in the body' });
  }
};

exports.deleteCommentById = (req, res, next) => {
  const { comment_id } = req.params;
  removeCommentById({ comment_id }).then(() => {
    res.sendStatus(204);
  });
};
