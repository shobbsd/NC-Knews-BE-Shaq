exports.up = function (knex, Promise) {
  console.log('creating articles table...');
  return knex.schema.createTable('articles', (articlesTable) => {
    articlesTable.increments('article_id');
    articlesTable.string('title');
    articlesTable.text('body', 500);
    articlesTable.integer('votes').defaultTo(0);
    articlesTable.string('topic');
    articlesTable.string('author');
    articlesTable.date('created_at');

    articlesTable
      .foreign('topic')
      .references('slug')
      .inTable('topics');

    articlesTable
      .foreign('author')
      .references('username')
      .inTable('users');
  });
};

exports.down = function (knex, Promise) {
  console.log('dropping articles table...');
  return knex.schema.dropTable('articles');
};
