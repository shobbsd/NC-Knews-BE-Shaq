const connection = require('../db/connection');

exports.fetchAllTopics = () => connection('topics').select();

exports.addNewTopic = newTopic => connection('topics')
  .insert(newTopic)
  .returning('*');
