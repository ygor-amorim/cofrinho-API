const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config();


const db = require('./config/database');
const app = express();
const authMiddleware = require('./middlewares/auth');


// Sec middleware
app.use(helmet());
app.use(cors());

// Body parser
app.use(express.json());

// Make the database accessible to routes
// reminder: can be accessed in routes via req.app.db to run queries

app.db = db;

// Routes

app.get('/health', (req, res) => {
    res.json({ status: 'OK' });
})

app.get('/', (req, res) => {
    res.send('Cofrinho API is running');
});

app.use('/users', require('./routes/users')(app));
app.use('/auth', require('./routes/auth')(app));
app.use('/accounts', authMiddleware, require('./routes/accounts')(app));
app.use('/transactions', authMiddleware, require('./routes/transactions')(app));
module.exports = app;