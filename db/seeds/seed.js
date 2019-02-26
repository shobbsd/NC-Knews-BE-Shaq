const {
  topicData, userData, articleData, commentData,
} = require('../data/index');
const { timeStamp, articleRef, formatComment } = require('../utils');

exports.seed = function (knex, Promise) {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => knex('topics').insert(topicData))
    .then(() => knex('users')
      .insert(userData)
      .returning('*'))
    .then(() => knex('articles')
      .insert(timeStamp(articleData))
      .returning('*'))
    .then((articles) => {
      const articleReference = articleRef(articles);
      const formatted = formatComment(commentData, articleReference);
      return knex('comments').insert(formatted);
    });
};

// console.log(topicData);
