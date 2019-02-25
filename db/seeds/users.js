const { userData } = require('../data/index');

console.log(userData);
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(() => knex('users').insert(userData));
};
