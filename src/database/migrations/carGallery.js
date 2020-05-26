exports.up = function(knex) {
  return knex.schema.createTable('carGallery', function(table) {
      table.string('id').primary();
      table.string('name').notNullable();
      table.string('path').notNullable();
      table.string('car_id').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('carGallery');
};