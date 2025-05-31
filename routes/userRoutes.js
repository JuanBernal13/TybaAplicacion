const express = require('express');
const router = express.Router();
const { registerUser, getAllUsers, getUserByEmail, loginUser, logoutUser } = require('../controllers/userController');
const { validateUserRegistration } = require('../middlewares/validation');
const { authenticateToken } = require('../middlewares/authMiddleware');

// Endpoint para registrar usuario
router.post('/registro', validateUserRegistration, registerUser);
console.log('Endpoint registrada: POST v1/api/usuarios/registro - Registro de usuarios');

// Endpoint para login
router.post('/login', loginUser);
console.log('Endpoint registrada: POST v1/api/usuarios/login - Login de usuarios');

// Endpoint para logout (requiere autenticación)
router.post('/logout', authenticateToken, logoutUser);
console.log('Endpoint registrada: POST v1/api/usuarios/logout - Logout de usuarios (Auth)');

// Endpoint Auth para obtener todos los usuarios (requiere autenticación)
router.get('/', authenticateToken, getAllUsers);
console.log('Endpoint registrada: GET v1/api/usuarios/ - Obtener todos los usuarios (Auth)');

// Endpoint Auth para obtener usuario por email (requiere autenticación)
router.get('/:email', authenticateToken, getUserByEmail);
console.log('Endpoint registrada: GET v1/api/usuarios/:email - Obtener usuario por email (Auth)');

module.exports = router; 