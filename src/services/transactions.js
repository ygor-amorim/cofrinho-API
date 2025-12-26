module.exports = (app) => {
    const accountsService = require('./accounts')(app);

    const findAll = async (accId, userId) => {
        const account = await accountsService.findOne({ id: accId, user_id: userId });
        if (!account) throw new Error('Account not found');
        return app.db('transactions').where({ acc_id: accId });
    };

    const findOne = (filter) => {
        return app.db('transactions').where(filter).first();
    }

    const create = async (transaction, userId) => {
        if (!transaction.description) throw new Error('Description is required');
        if (!transaction.amount) throw new Error('Amount is required');
        if (!transaction.type) throw new Error('Type is required');
        if (!transaction.acc_id) throw new Error('Account ID is required');
        if (!transaction.date) throw new Error('Date is required');

        const account = await accountsService.findOne({ id: transaction.acc_id, user_id: userId });
        if (!account) throw new Error('Account not found');

        const [ newTrans ] = await app.db('transactions')
            .insert(transaction)
            .returning('*');
        return newTrans;
    };

    const update = async (id, accId, userId, data) => {
        const account = await accountsService.findOne({ id: accId, user_id: userId });
        if (!account) throw new Error('Account not found');
        
        const transaction = await findOne({ id, acc_id: accId });
        if (!transaction) throw new Error('Transaction not found');

        const [updated] = await app.db('transactions')
            .where({ id, acc_id: accId })
            .update(data)
            .returning('*');
        return updated;
    };

    const remove = async (id, accId, userId) => {
        const account = await accountsService.findOne({ id: accId, user_id: userId });
        if (!account) throw new Error('Account not found');

        const transaction = await findOne({ id, acc_id: accId });
        if (!transaction) throw new Error('Transaction not found');

        const deleted = await app.db('transactions')
            .where({ id, acc_id: accId })
            .del();
        return deleted;
    };
    return { findAll, findOne, create, update, remove };
};
