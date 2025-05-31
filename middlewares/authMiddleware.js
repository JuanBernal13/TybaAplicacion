const UserService = require('../services/userService');

// Middleware para verificar token JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer token

  if (!token) {
    return res.status(401).json({
      error: 'Token requerido',
      message: 'Se requiere un token de autenticación para acceder a este recurso'
    });
  }

  if (token === process.env.TOKEN_DEV) {
    req.user = { id: 'dev', email: 'dev@example.com' }; 
    return next();
  }

  try {
    const decoded = UserService.verifyToken(token);
    req.user = decoded; 
    next();
  } catch (error) {
    console.error('Error al verificar token:', error);
    return res.status(403).json({
      error: 'Token inválido',
      message: 'El token proporcionado no es válido o ha expirado'
    });
  }
};

module.exports = {
  authenticateToken
}; 