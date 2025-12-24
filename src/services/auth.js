const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = (app) => {
    const userService = require('./users')(app);

    const signin = async (email, password) => {
        if (!email) throw new Error('E-mail is required');
        if (!password) throw new Error('Password is required');
        
        const user = await userService.findOne({ email });
        if (!user) throw new Error('Invalid e-mail or password');

        const isMatch = bcrypt.compareSync(password, user.password);
        if(!isMatch) throw new Error('Invalid e-mail or password');

        // Create JWT token
        const token = jwt.sign(
            { id: user.id, name: user.name, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        return { token };
    };

    return { signin };
};
