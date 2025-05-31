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
    console.log(`[UserService] Generando token JWT para usuario: ${user.email}`);
    return jwt.sign(payload, jwtConfig.JWT_SECRET, {
      expiresIn: jwtConfig.JWT_EXPIRES_IN
    });
  }

  // Verificar token JWT
  static verifyToken(token) {
    try {
      if (tokenBlacklist.has(token)) {
        console.warn('[UserService] Intento de uso de token invalidado');
        throw new Error('Token invalidado');
      }
      const decoded = jwt.verify(token, jwtConfig.JWT_SECRET);
      console.log('[UserService] Token verificado correctamente:', decoded);
      return decoded;
    } catch (error) {
      console.error('[UserService] Error al verificar token:', error.message);
      throw new Error('Token inválido');
    }
  }

  static async logoutUser(token) {
    try {
      jwt.verify(token, jwtConfig.JWT_SECRET);
      // Agregar token a la blacklist para que quede invalidado
      tokenBlacklist.add(token);
      console.log('[UserService] Token agregado a la blacklist y usuario deslogueado');
      return { success: true };
    } catch (error) {
      console.error('[UserService] Error al desloguear usuario:', error.message);
      throw new Error('Token inválido');
    }
  }

  // Registrar nuevo usuario
  static async registerUser(userData) {
    const { nombre, email, password } = userData;
    console.log(`[UserService] Intentando registrar usuario: ${email}`);

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.warn(`[UserService] Registro fallido: el email ${email} ya está registrado`);
      throw new Error('El email ya está registrado');
    }

    // Crear nuevo usuario
    const newUser = new User({ nombre, email, password });
    const savedUser = await newUser.save();
    console.log(`[UserService] Usuario registrado exitosamente: ${savedUser.email} (ID: ${savedUser._id})`);

    // Generar transacciones aleatorias para el nuevo usuario
    const transactions = await TransactionService.generateRandomTransactions(savedUser._id);

    return {
      user: savedUser,
      transactions: transactions
    };
  }

  // Obtener todos los usuarios con sus estadísticas de transacciones
  static async getAllUsers() {
    console.log('[UserService] Obteniendo todos los usuarios con estadísticas de transacciones');
    const users = await User.find();
    const usersWithStats = [];

    for (const user of users) {
      const stats = await TransactionService.getUserTransactionStats(user._id);
      usersWithStats.push({
        ...user.toDTO(),
        transactionStats: stats
      });
      console.log(`[UserService] Usuario procesado: ${user.email} (ID: ${user._id})`);
    }

    console.log(`[UserService] Total de usuarios obtenidos: ${usersWithStats.length}`);
    return usersWithStats;
  }

  // Obtener usuario por email
  static async getUserByEmail(email) {
    console.log(`[UserService] Buscando usuario por email: ${email}`);
    const user = await User.findOne({ email });
    if (!user) {
      console.warn(`[UserService] Usuario no encontrado con email: ${email}`);
      throw new Error('Usuario no encontrado');
    }
    console.log(`[UserService] Usuario encontrado: ${user.email} (ID: ${user._id})`);
    return user;
  }

  // Obtener usuario por ID con transacciones
  static async getUserById(userId) {
    console.log(`[UserService] Buscando usuario por ID: ${userId}`);
    const user = await User.findById(userId);
    if (!user) {
      console.warn(`[UserService] Usuario no encontrado con ID: ${userId}`);
      throw new Error('Usuario no encontrado');
    }
    const transactions = await TransactionService.getUserTransactions(userId);
    const stats = await TransactionService.getUserTransactionStats(userId);

    console.log(`[UserService] Usuario encontrado: ${user.email} (ID: ${user._id}), transacciones: ${transactions.length}`);
    return {
      user: user.toDTO(),
      transactions,
      transactionStats: stats
    };
  }

  // Login de usuario con generación de token
  static async loginUser(email, password) {
    console.log(`[UserService] Intentando login para usuario: ${email}`);
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      console.warn(`[UserService] Login fallido para usuario: ${email}`);
      throw new Error('Credenciales incorrectas');
    }

    // Generar token JWT
    const token = this.generateToken(user);
    console.log(`[UserService] Login exitoso para usuario: ${email}, token generado`);

    return {
      user: user.toDTO(),
      token
    };
  }

  // Obtener total de usuarios
  static async getUserCount() {
    const count = await User.countDocuments();
    console.log(`[UserService] Total de usuarios en la base de datos: ${count}`);
    return count;
  }
}

module.exports = UserService; 