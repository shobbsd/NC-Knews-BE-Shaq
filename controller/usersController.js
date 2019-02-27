const { addNewUser, fetchUsers, fetchUserById } = require('../models/usersModel');

exports.postNewUser = (req, res, next) => {
  const { username, avatar_url, name } = req.body;
  addNewUser({ username, avatar_url, name }).then(([user]) => res.status(201).json({ user }));
};

exports.getUsers = (req, res, next) => {
  fetchUsers().then(users => res.status(200).json({ users }));
};

exports.getUserById = (req, res, next) => {
  const { username } = req.params;
  fetchUserById({ username }).then(([user]) => {
    res.status(200).json({ user });
  });
};
