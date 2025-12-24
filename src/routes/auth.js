const express = require('express');

module.exports = (app) => {
    const router = express.Router();
    const authService = require('../services/auth')(app);
    const usersService = require('../services/users')(app);

    // POST /auth/signin - Register new user
    router.post('/signup', async (req, res, next) => {
        try {
            const user = await usersService.create(req.body);
            res.status(201).json(user);
        } catch (err) {
            next(err);
        }
    });

    // POST /auth/signin - Login
    router.post('/signin', async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const result = await authService.signin(email, password);
            res.json(result);
        } catch (err) {
            next(err);
        }
    });

    return router;
};

