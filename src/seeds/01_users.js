const bcrypt = require('bcryptjs');

exports.seed = async (knex) => {
    // Clear existind data (order matters - children first due to FKs)
    await knex('transactions').del();
    await knex('accounts').del();
    await knex('users').del();

    // Hash password once, reuse for all test users
    const hashedPass = await bcrypt.hash('123456', 10);

    // Insert test users
    await knex('users').insert([
        { id: 1, name: 'User 1', email: 'user1@test.com', password: hashedPass },
        { id: 2, name: 'User 2', email: 'user2@test.com', password: hashedPass },
        { id: 3, name: 'User 3', email: 'user3@test.com', password: hashedPass },

    ]);
    await knex.raw("SELECT setval('users_id_seq', (SELECT MAX(id) FROM users))");
}; 