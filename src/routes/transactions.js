const express = require('express');

module.exports = (app) => {
    const router = express.Router();
    const transactionsService = require('../services/transactions')(app);

    // GET /transactions/account/:accId - List all transactions for an account
    router.get('/account/:accId', async (req, res, next) => {
        try {
            const userId = req.user.id;
            const transactions = await transactionsService.findAll(req.params.accId, userId);
            res.json(transactions);
        } catch (err) {
            next(err);
        }
    });

    // POST /transactions - Create a new transaction
    router.post('/', async (req, res, next) => {
        try {
            const userId = req.user.id;
            const transactionData = req.body;
            const newTrans = await transactionsService.create(transactionData, userId);
            res.status(201).json(newTrans);
        } catch (err) {
            next(err);
        }
    });

    // PUT  /transactions/:accId/:id - Update a transaction
    router.put('/:accId/:id', async (req, res, next) => {
        try {
            const userId = req.user.id; 
            const updatedTrans = await transactionsService.update(
                req.params.id,
                req.params.accId,
                userId,
                req.body
            );
            res.json(updatedTrans);
        } catch (err) {
            next(err);
        }
    });

    // DELETE /transactions/:accId/:id - Delete a transaction
    router.delete('/:accId/:id', async (req, res, next) => {
        try {
            const userId = req.user.id; 
            await transactionsService.remove(
                req.params.id,
                req.params.accId,
                userId
            );
            res.status(204).send();
        } catch (err) {
            next(err);
        }
    });
    return router;
};