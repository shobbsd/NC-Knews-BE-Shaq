exports.up = function (knex, Promise) {
  return knex.schema.createTable('comments', (commentsTable) => {
    commentsTable.increments('comment_id');
    commentsTable.string('author');
    commentsTable.integer('article_id');
    commentsTable.integer('votes').defaultTo(0);
    commentsTable.date('created_at');
    commentsTable.string('body', 500);

    commentsTable
      .foreign('author')
      .references('username')
      .inTable('users');
    commentsTable
      .foreign('article_id')
      .references('article_id')
      .inTable('articles');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('comments');
};
