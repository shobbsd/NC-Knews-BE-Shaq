exports.up = function (knex, Promise) {
  return knex.schema.createTable('comments', (commentsTable) => {
    commentsTable.increments('comment_id');
    commentsTable.string('author');
    commentsTable.integer('article_id');
    commentsTable.integer('votes').defaultTo(0);
    commentsTable.timestamp('created_at').defaultTo(knex.fn.now());
    commentsTable.string('body', 500);

    commentsTable
      .foreign('author')
      .references('username')
      .inTable('users')
      .onDelete('CASCADE');
    commentsTable
      .foreign('article_id')
      .references('article_id')
      .inTable('articles')
      .onDelete('CASCADE');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('comments');
};
