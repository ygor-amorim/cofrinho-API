exports.seed = async (knex) => {
    // Insert two transactions to each account. 
    // Checking Account && Savings: $100 In, $50 Out.
    await knex('transactions').insert([
        { id: 1, description: 'User1 Checking Account Income', type: 'I', amount: 100, date: '2025-12-26', acc_id: 1 },
        { id: 2, description: 'User1 Checking Account Outcome', type: 'O', amount: 50, date: '2025-12-26', acc_id: 1 },
        { id: 3, description: 'User1 Savings Account Income', type: 'I', amount: 100, date: '2025-12-26', acc_id: 2 },
        { id: 4, description: 'User1 Savings Account Outcome', type: 'O', amount: 50, date: '2025-12-26', acc_id: 2 },
        { id: 5, description: 'User2 Checking Account Income', type: 'I', amount: 100, date: '2025-12-26', acc_id: 3 },
        { id: 6, description: 'User2 Checking Account Outcome', type: 'O', amount: 50, date: '2025-12-26', acc_id: 3 },
        { id: 7, description: 'User2 Savings Account Income', type: 'I', amount: 100, date: '2025-12-26', acc_id: 4 },
        { id: 8, description: 'User2 Savings Account Outcome', type: 'O', amount: 50, date: '2025-12-26', acc_id: 4 },
        { id: 9, description: 'User3 Checking Account Income', type: 'I', amount: 100, date: '2025-12-26', acc_id: 5 },
        { id: 10, description: 'User3 Checking Account Outcome', type: 'O', amount: 50, date: '2025-12-26', acc_id: 5 },
        { id: 11, description: 'User3 Savings Account Income', type: 'I', amount: 100, date: '2025-12-26', acc_id: 6 },
        { id: 12, description: 'User3 Savings Account Outcome', type: 'O', amount: 50, date: '2025-12-26', acc_id: 6 },
    ]);
    await knex.raw("SELECT setval('transactions_id_seq', (SELECT MAX(id) FROM transactions))");
};