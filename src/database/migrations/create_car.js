exports.up = function(knex) {
  return knex.schema.createTable('cars', function(table) {
      table.string('id').primary();
      table.string('board').unique();
      table.string('model').notNullable();
      table.string('year').notNullable();
      table.string('color').notNullable();
      table.string('user_id').notNullable();
      table.string('value').notNullable();
      table.string('observation');
      table.string('user_reserved_id');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('cars');
};