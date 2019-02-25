const { topicData } = require('../data/index');

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('topics')
    .del()
    .then(() => knex('topics').insert(topicData));
};
