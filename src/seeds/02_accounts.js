exports.seed = async (knex) => {
    // Insert account data, two accounts for each user: CheckingAccount & Savings.
    await knex('accounts').insert([
        { id: 1, name: 'CheckingAccount', user_id: 1 },
        { id: 2, name: 'Savings', user_id: 1 },
        { id: 3, name: 'CheckingAccount', user_id: 2 },
        { id: 4, name: 'Savings', user_id: 2 },
        { id: 5, name: 'CheckingAccount', user_id: 3 },
        { id: 6, name: 'Savings', user_id: 3 },
    ]);
    await knex.raw("SELECT setval('accounts_id_seq', (SELECT MAX(id) FROM accounts))");
};
