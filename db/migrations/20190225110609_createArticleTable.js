exports.up = function (knex, Promise) {
  return knex.schema.createTable('articles', (articlesTable) => {
    articlesTable.increments('article_id');
    articlesTable.string('title');
    articlesTable.text('body', 500);
    articlesTable.integer('votes').defaultTo(0);
    articlesTable.string('topic');
    articlesTable.string('author');
    articlesTable.timestamp('created_at').defaultTo(knex.fn.now());

    articlesTable
      .foreign('topic')
      .references('slug')
      .inTable('topics')
      .onDelete('CASCADE');

    articlesTable
      .foreign('author')
      .references('username')
      .inTable('users')
      .onDelete('CASCADE');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('articles');
};
