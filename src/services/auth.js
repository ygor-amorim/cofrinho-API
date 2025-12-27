const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = (app) => {
    const userService = require('./users')(app);

    const signin = async (email, password) => {
        if (!email) {
            const err = new Error('E-mail is required');
            err.status = 400;
            throw err;
        };
        if (!password) {
            const err = new Error('Password is required');
            err.status = 400;
            throw err;
        };
        
        const user = await userService.findOne({ email });
        if (!user){ 
            const err = new Error('Invalid e-mail or password');
            err.status = 401;
            throw err;
        } 

        const isMatch = bcrypt.compareSync(password, user.password);
        if(!isMatch) {
            const err = new Error('Invalid e-mail or password');
            err.status = 401;
            throw err;
        }

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
