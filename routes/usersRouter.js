const usersRouter = require('express').Router();
const { postNewUser, getUsers, getUserById } = require('../controller/usersController');
const { handle405 } = require('../errors');

usersRouter
  .route('/')
  .get(getUsers)
  .post(postNewUser)
  .all(handle405);

usersRouter
  .route('/:username')
  .get(getUserById)
  .all(handle405);

module.exports = usersRouter;
