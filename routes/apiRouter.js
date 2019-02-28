const apiRouter = require('express').Router();
const topicsRouter = require('./topicsRouter');
const articlesRouter = require('./articlesRouter');
const commentsRouter = require('../routes/commentsRouter');
const usersRouter = require('../routes/usersRouter');
const { handle405 } = require('../errors');
const api = require('../api.json');

apiRouter.use('/topics', topicsRouter);
apiRouter.use('/articles', articlesRouter);
apiRouter.use('/comments', commentsRouter);
apiRouter.use('/users', usersRouter);

apiRouter
  .route('/')
  .get((req, res, next) => {
    res.status(200).json(api);
  })
  .all(handle405);

module.exports = apiRouter;
