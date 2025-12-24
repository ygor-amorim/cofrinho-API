exports.up = function(knex) {
    return knex.schema.createTable('accounts', (table) => {
      table.increments('id').primary();
      table.string('name', 255).notNullable();
      table.integer('user_id').unsigned().notNullable();
      table.timestamps(true, true);

      // Foreign key: links to users table
      table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE');
    });
  };

  exports.down = function(knex) {
    return knex.schema.dropTable('accounts');
  };