exports.up = function(knex) {
  return knex.schema.createTable('users', function(table) {
      table.string('id').primary();
      table.string('name').notNullable();
      table.string('email').unique();
      table.string('password').notNullable();
      table.string('address').notNullable();
      table.string('city').notNullable();
      table.string('phoneNumber').notNullable();
      table.string('uf', 2).notNullable();
      table.decimal('latitude');
      table.decimal('longitude');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};