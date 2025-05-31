const TransactionService = require('../services/transactionService');

class TransactionController {
  /**
   * Obtener transacciones del usuario autenticado
   */
  static async getMyTransactions(req, res) {
    try {
      const userId = req.user.id;
      const transactions = await TransactionService.getUserTransactions(userId);
      const stats = await TransactionService.getUserTransactionStats(userId);

      res.json({
        success: true,
        data: {
          transactions,
          stats
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  /**
   * Obtener transacciones de un usuario específico por ID
   */
  static async getUserTransactions(req, res) {
    try {
      const { userId } = req.params;
      const transactions = await TransactionService.getUserTransactions(userId);
      const stats = await TransactionService.getUserTransactionStats(userId);

      res.json({
        success: true,
        data: {
          transactions,
          stats
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  /**
   * Crear una nueva transacción manual
   */
  static async createTransaction(req, res) {
    try {
      const userId = req.user.id;
      const { costo } = req.body;

      if (!costo || costo <= 0) {
        return res.status(400).json({
          success: false,
          message: 'El costo debe ser un número positivo'
        });
      }

      const transaction = await TransactionService.createTransaction(userId, costo);

      res.status(201).json({
        success: true,
        message: 'Transacción creada exitosamente',
        data: transaction
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  /**
   * Obtener estadísticas generales de transacciones
   */
  static async getTransactionStats(req, res) {
    try {
      const { userId } = req.params;
      const stats = await TransactionService.getUserTransactionStats(userId);

      res.json({
        success: true,
        data: stats
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
}

module.exports = TransactionController; 