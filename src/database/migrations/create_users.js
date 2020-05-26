exports.up = function(knex) {
  return knex.schema.createTable('users', function(table) {
      table.string('id').primary();
      table.string('name').notNullable();
      table.string('email').unique();
      table.string('password').notNullable();
      table.string('address').notNullable();
      table.string('city').notNullable();
      table.string('phoneNumber').notNullable();
      table.string('cpf').notNullable();
      table.string('cnh').notNullable();  
      table.string('uf', 2).notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};