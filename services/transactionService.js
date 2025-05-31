const Transaction = require('../models/Transaction');

class TransactionService {
  // Generar transacciones aleatorias para un usuario
  static async generateRandomTransactions(userId) {
    console.log(`[TransactionService] Generando transacciones aleatorias para usuario: ${userId}`);
    const transactionsToCreate = Math.floor(Math.random() * 10) + 1; // Entre 1 y 10 transacciones
    const transactions = [];

    for (let i = 0; i < transactionsToCreate; i++) {
      const costo = Math.floor(Math.random() * 1000) + 10; // Entre 10 y 1010
      console.log(`[TransactionService] Creando transacción aleatoria #${i + 1} para usuario ${userId} con costo: ${costo}`);
      
      const transaction = new Transaction({
        userId,
        costo
      });

      const savedTransaction = await transaction.save();
      console.log(`[TransactionService] Transacción guardada: ${savedTransaction._id}`);
      transactions.push(savedTransaction);
    }

    console.log(`[TransactionService] Total de transacciones generadas para usuario ${userId}: ${transactions.length}`);
    return transactions;
  }

  // Obtener todas las transacciones de un usuario
  static async getUserTransactions(userId) {
    console.log(`[TransactionService] Obteniendo transacciones para usuario: ${userId}`);
    const result = await Transaction.find({ userId }).sort({ createdAt: -1 });
    console.log(`[TransactionService] Se encontraron ${result.length} transacciones para usuario ${userId}`);
    return result;
  }

  // Obtener estadísticas de transacciones de un usuario
  static async getUserTransactionStats(userId) {
    console.log(`[TransactionService] Obteniendo estadísticas de transacciones para usuario: ${userId}`);
    const transactions = await Transaction.find({ userId });
    
    if (transactions.length === 0) {
      console.log(`[TransactionService] No se encontraron transacciones para usuario ${userId}`);
      return {
        totalTransactions: 0,
        totalAmount: 0,
        averageAmount: 0
      };
    }

    const totalAmount = transactions.reduce((sum, tx) => sum + tx.costo, 0);
    const averageAmount = totalAmount / transactions.length;

    console.log(`[TransactionService] Estadísticas para usuario ${userId}: totalTransactions=${transactions.length}, totalAmount=${totalAmount}, averageAmount=${Math.round(averageAmount * 100) / 100}`);
    return {
      totalTransactions: transactions.length,
      totalAmount,
      averageAmount: Math.round(averageAmount * 100) / 100
    };
  }

  // Crear una nueva transacción manualmente
  static async createTransaction(userId, costo) {
    console.log(`[TransactionService] Creando transacción manual para usuario: ${userId} con costo: ${costo}`);
    const transaction = new Transaction({
      userId,
      costo
    });

    const savedTransaction = await transaction.save();
    console.log(`[TransactionService] Transacción manual guardada: ${savedTransaction._id}`);
    return savedTransaction;
  }
}

module.exports = TransactionService; 