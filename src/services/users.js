const bcrypt = require('bcryptjs');

module.exports = (app) => {
    const findAll = () => {
        return app.db('users').select('id', 'name', 'email'); // Achtung! Never return password
        };
    const findOne = (filter) => {
        return app.db('users').where(filter).first();
        };
    
    const create = async (user) => {
        // validate required fields
        if (!user.name) {
            const err = new Error('Username is required');
            err.status = 400;
            throw err;
        };
        if (!user.email) {
            const err = new Error('Email is required');
            err.status = 400;
            throw err;
        };
        if (!user.password) {
            const err = new Error('Password is required');
            err.status = 400;
            throw err;
        };

        // check for existing e-mail
        const existingUser = await findOne({ email: user.email });
        if (existingUser) {
            const err = new Error('E-mail already in use');
            err.status = 400;
            throw err;
        };

        // hash password
        const salt = await bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hashSync(user.password, salt);

        // insert & return user (w/ password)
        const [newUser] = await app.db('users')
            .insert({ ...user, password:hashedPassword },
                ['id', 'name', 'email']);

        return newUser;
    };
    return { findAll, findOne, create };  
};