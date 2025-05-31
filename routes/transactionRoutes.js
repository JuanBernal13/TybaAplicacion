const express = require('express');
const { authenticateToken } = require('../middlewares/authMiddleware');
const TransactionController = require('../controllers/transactionController');

const router = express.Router();

router.get('/my-transactions', authenticateToken, TransactionController.getMyTransactions);

router.get('/user/:userId', TransactionController.getUserTransactions);

router.post('/create', authenticateToken, TransactionController.createTransaction);

router.get('/stats/:userId', TransactionController.getTransactionStats);

module.exports = router; 