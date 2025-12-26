module.exports = (app) => {
    const findAll = (userId) => {
        return app.db('accounts')
            .where({ user_id: userId })
            .select('id', 'name', 'user_id');
    };

    const findOne = (filter) => {
        return app.db('accounts').where(filter).first();
    };

    const create = async (account) => {
        if (!account.name) throw new Error('Account name is required');
        if (!account.user_id) throw new Error('User ID is required');

        const [ newAcc ] = await app.db('accounts')
            .insert(account)
            .returning('*');

        return newAcc;
    };

    const update = async (id, userId, data) => {
        const account = await findOne({ id, user_id: userId });
        if (!account) throw new Error('Account not found');

        const [updated] = await app.db('accounts')
            .where({ id, user_id: userId })
            .update(data)
            .returning('*');

        return updated;
    };

    const remove = async (id, userId) => {
        const account = await findOne({ id, user_id: userId });
        if (!account) throw new Error('Account not found');

        return app.db('accounts')
            .where({ id, user_id: userId })
            .del();
    };
    return { findAll, findOne, create, update, remove };
};

