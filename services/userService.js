const User = require('../models/User');
const TransactionService = require('./transactionService');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');

// Blacklist de tokens invalidados (en producción usar Redis)
const tokenBlacklist = new Set();

class UserService {
  // Generar token JWT
  static generateToken(user) {
    const payload = {
      id: user._id,
      email: user.email,
      nombre: user.nombre
    };

    return jwt.sign(payload, jwtConfig.JWT_SECRET, {
      expiresIn: jwtConfig.JWT_EXPIRES_IN
    });
  }

  // Verificar token JWT
  static verifyToken(token) {
    try {
      if (tokenBlacklist.has(token)) {
        throw new Error('Token invalidado');
      }
      
      return jwt.verify(token, jwtConfig.JWT_SECRET);
    } catch (error) {
      throw new Error('Token inválido');
    }
  }

  static async logoutUser(token) {
    try {
      jwt.verify(token, jwtConfig.JWT_SECRET);
      
      // Agregar token a la blacklist para que quede invalidado
      tokenBlacklist.add(token);
      
      return { success: true };
    } catch (error) {
      throw new Error('Token inválido');
    }
  }

  // Registrar nuevo usuario
  static async registerUser(userData) {
    const { nombre, email, password } = userData;

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('El email ya está registrado');
    }

    // Crear nuevo usuario
    const newUser = new User({ nombre, email, password });
    const savedUser = await newUser.save();

    // Generar transacciones aleatorias para el nuevo usuario
    const transactions = await TransactionService.generateRandomTransactions(savedUser._id);

    return {
      user: savedUser,
      transactions: transactions
    };
  }

  // Obtener todos los usuarios con sus estadísticas de transacciones
  static async getAllUsers() {
    const users = await User.find();
    const usersWithStats = [];

    for (const user of users) {
      const stats = await TransactionService.getUserTransactionStats(user._id);
      usersWithStats.push({
        ...user.toDTO(),
        transactionStats: stats
      });
    }

    return usersWithStats;
  }

  // Obtener usuario por email
  static async getUserByEmail(email) {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Usuario no encontrado');
    }
    return user;
  }

  // Obtener usuario por ID con transacciones
  static async getUserById(userId) {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }
    
    const transactions = await TransactionService.getUserTransactions(userId);
    const stats = await TransactionService.getUserTransactionStats(userId);

    return {
      user: user.toDTO(),
      transactions,
      transactionStats: stats
    };
  }

  // Login de usuario con generación de token
  static async loginUser(email, password) {
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      throw new Error('Credenciales incorrectas');
    }

    // Generar token JWT
    const token = this.generateToken(user);

    return {
      user: user.toDTO(),
      token
    };
  }

  // Obtener total de usuarios
  static async getUserCount() {
    return await User.countDocuments();
  }
}

module.exports = UserService; 