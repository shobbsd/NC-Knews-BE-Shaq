const { topicData, userData, articleData } = require('../data/index');
const { timeStamp } = require('../utils');

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('topics')
    .del()
    .then(() => knex('users').del())
    .then(() => knex('articles').del())
    .then(() => knex('topics').insert(topicData))
    .then(() => knex('users').insert(userData))
    .then(() => knex('articles').insert(timeStamp(articleData)));
};
