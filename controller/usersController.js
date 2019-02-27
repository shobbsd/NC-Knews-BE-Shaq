const { addNewUser, fetchUsers } = require('../models/usersModel');

exports.postNewUser = (req, res, next) => {
  const { username, avatar_url, name } = req.body;
  addNewUser({ username, avatar_url, name }).then(user => res.status(201).json({ user }));
};

exports.getUsers = (req, res, next) => {
  fetchUsers().then(users => res.status(200).json({ users }));
};
