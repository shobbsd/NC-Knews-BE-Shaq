const { articleData } = require('../data/index');

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('articles')
    .del()
    .then(() => knex('articles').insert(articleData));
};
