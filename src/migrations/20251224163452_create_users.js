exports.up = function(knex) {
    return knex.schema.createTable('users', (table) => {
      table.increments('id').primary();
      table.string('name', 255).notNullable();
      table.string('email', 255).notNullable().unique();
      table.string('password', 255).notNullable();
      table.timestamps(true, true);  // created_at and updated_at
    });
  };

  exports.down = function(knex) {
    return knex.schema.dropTable('users');
  };
