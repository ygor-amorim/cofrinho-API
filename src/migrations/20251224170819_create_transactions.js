 exports.up = function(knex) {
    return knex.schema.createTable('transactions', (table) => {
      table.increments('id').primary();
      table.string('description', 255).notNullable();
      table.enu('type', ['I', 'O']).notNullable();  // I = Income, O = Outcome
      table.decimal('amount', 15, 2).notNullable();
      table.date('date').notNullable();
      table.boolean('status').defaultTo(false);
      table.integer('acc_id').unsigned().notNullable();
      table.timestamps(true, true);

      table.foreign('acc_id').references('id').inTable('accounts').onDelete('CASCADE');
    });
  };

  exports.down = function(knex) {
    return knex.schema.dropTable('transactions');
  };