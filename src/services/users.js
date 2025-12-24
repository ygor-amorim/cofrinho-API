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
        if (!user.name) throw new Error('Username is required');
        if (!user.email) throw new Error('Email is required');
        if (!user.password) throw new Error('Password is required');

        // check for existing e-mail
        const existingUser = await findOne({ email: user.email });
        if (existingUser) throw new Error('Email already in use');

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