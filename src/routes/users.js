const express = require('express');

module.exports = (app) => {
    const router = express.Router();
    const usersService = require('../services/users')(app);

    // GET /users - List all users
    router.get('/', async (req, res, next) => {
        try {
            const users = await usersService.findAll();
            res.json(users);
        } catch (err) {
            next(err);
        }
    });

    // Post /users - Create a new user
    router.post('/', async (req, res, next) => {
        try {
            const user = await usersService.create(req.body);
            res.status(201).json(user);
        } catch (err) {
            next(err);
        }
    });

    return router;
};