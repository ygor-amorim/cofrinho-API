const express = require('express');

module.exports = (app) => { 
    const router = express.Router();
    const accountsService = require('../services/accounts')(app);

    // GET /accounts - Get all accounts for the authenticated user
    router.get('/', async (req, res, next) => {
        try {
            const userId = req.user.id;
            const accounts = await accountsService.findAll(userId);
            res.json(accounts);
        } catch (err) {
            next(err);
        }
    });

    // POST /accounts - create an account for the authenticated user
    router.post('/', async (req, res, next) => {
        try {
            const userId = req.user.id;
            const accountData = { ...req.body, user_id: userId };
            const newAcc = await accountsService.create(accountData);
            res.status(201).json(newAcc);
        } catch (err) {
            next(err);
        }
    });
    // PUT /accounts/:id - update an account for the authenticated user
    router.put('/:id', async (req, res, next) => {
        try {
            const userId = req.user.id;
            const updatedAcc = await accountsService.update(req.params.id, userId, req.body);
            res.json(updatedAcc);
        } catch (err) {
            next(err);
        }
    });

    // DELETE /accounts/:id - delete an account for the authenticated user
    router.delete('/:id', async (req, res, next) => {
        try {
            const userId = req.user.id;
            await accountsService.remove(req.params.id, userId);
            res.status(204).send();
        } catch (err) {
            next(err);
        }
    });
    return router;
}
