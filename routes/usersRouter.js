const usersRouter = require('express').Router();
const { postNewUser, getUsers } = require('../controller/usersController');

usersRouter
  .route('/')
  .get(getUsers)
  .post(postNewUser);

module.exports = usersRouter;
