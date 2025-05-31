const Transaction = require('../models/Transaction');

class TransactionService {
  // Generar transacciones aleatorias para un usuario
  static async generateRandomTransactions(userId) {
    const transactionsToCreate = Math.floor(Math.random() * 10) + 1; // Entre 1 y 10 transacciones
    const transactions = [];

    for (let i = 0; i < transactionsToCreate; i++) {
      const costo = Math.floor(Math.random() * 1000) + 10; // Entre 10 y 1010
      
      const transaction = new Transaction({
        userId,
        costo
      });

      const savedTransaction = await transaction.save();
      transactions.push(savedTransaction);
    }

    return transactions;
  }

  // Obtener todas las transacciones de un usuario
  static async getUserTransactions(userId) {
    return await Transaction.find({ userId }).sort({ createdAt: -1 });
  }

  // Obtener estadísticas de transacciones de un usuario
  static async getUserTransactionStats(userId) {
    const transactions = await Transaction.find({ userId });
    
    if (transactions.length === 0) {
      return {
        totalTransactions: 0,
        totalAmount: 0,
        averageAmount: 0
      };
    }

    const totalAmount = transactions.reduce((sum, tx) => sum + tx.costo, 0);
    const averageAmount = totalAmount / transactions.length;

    return {
      totalTransactions: transactions.length,
      totalAmount,
      averageAmount: Math.round(averageAmount * 100) / 100
    };
  }

  // Crear una nueva transacción manualmente
  static async createTransaction(userId, costo) {
    const transaction = new Transaction({
      userId,
      costo
    });

    return await transaction.save();
  }
}

module.exports = TransactionService; 