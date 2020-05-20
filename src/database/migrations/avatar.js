exports.up = function(knex) {
  return knex.schema.createTable('avatar', function(table) {
      table.string('id').primary();
      table.string('name').notNullable();
      table.string('path').notNullable();
      table.string('user_id').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('avatar');
};