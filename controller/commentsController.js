const { updateCommentById, removeCommentById } = require('../models/commentsModel');

exports.patchCommentById = (req, res, next) => {
  const { comment_id } = req.params;
  const votes = req.body.inc_votes;
  updateCommentById({ comment_id, votes }).then((comment) => {
    res.status(201).json({ comment });
  });
};

exports.deleteCommentById = (req, res, next) => {
  const { comment_id } = req.params;
  removeCommentById({ comment_id }).then(() => {
    res.sendStatus(204);
  });
};
