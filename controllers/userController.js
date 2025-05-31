const UserService = require('../services/userService');

// Registrar usuario
const registerUser = async (req, res) => {
  try {
    const userData = req.body;
    const newUser = await UserService.registerUser(userData);

    res.status(201).json({
      mensaje: 'Usuario registrado exitosamente',
      usuario: `Id del usuario: ${newUser.id}`
    });

  } catch (error) {
    console.error('Error en registro de usuario:', error);
    
    if (error.message === 'El email ya está registrado') {
      return res.status(409).json({
        error: 'El email ya está registrado',
        message: 'Ya existe un usuario con este email'
      });
    }

    res.status(500).json({
      error: 'Error interno del servidor',
      message: 'Ocurrió un error al registrar el usuario'
    });
  }
};

// Obtener todos los usuarios
const getAllUsers = async (req, res) => {
  try {
    const dtoUsers = await UserService.getAllUsers();
    const total = await UserService.getUserCount();

    res.json({
      usuarios: dtoUsers,
      total: total
    });
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({
      error: 'Error interno del servidor',
      message: 'Ocurrió un error al obtener los usuarios'
    });
  }
};

// Obtener usuario por email
const getUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await UserService.getUserByEmail(email);
    
    res.json(user.toDTO());
  } catch (error) {
    console.error('Error al obtener usuario:', error);
    
    if (error.message === 'Usuario no encontrado') {
      return res.status(404).json({ 
        error: 'Usuario no encontrado',
        message: 'No existe un usuario con ese email'
      });
    }

    res.status(500).json({
      error: 'Error interno del servidor',
      message: 'Ocurrió un error al obtener el usuario'
    });
  }
};

// Login de usuario con token JWT
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const loginResult = await UserService.loginUser(email, password);
    
    res.json({
      mensaje: 'Login exitoso',
      token: loginResult.token,
      expiresIn: '24h'
    });
  } catch (error) {
    console.error('Error en login:', error);
    
    if (error.message === 'Credenciales incorrectas') {
      return res.status(401).json({ 
        error: 'Credenciales incorrectas',
        message: 'Email o contraseña incorrectos'
      });
    }

    res.status(500).json({
      error: 'Error interno del servidor',
      message: 'Ocurrió un error al realizar el login'
    });
  }
};

// Logout de usuario
const logoutUser = async (req, res) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer token

    if (!token) {
      return res.status(401).json({
        error: 'Token requerido',
        message: 'Se requiere un token de autenticación para realizar el logout'
      });
    }

    await UserService.logoutUser(token);
    
    res.json({
      mensaje: 'Logout exitoso',
      message: 'Sesión cerrada correctamente'
    });
  } catch (error) {
    console.error('Error en logout:', error);
    
    if (error.message === 'Token inválido') {
      return res.status(401).json({ 
        error: 'Token inválido',
        message: 'El token proporcionado no es válido'
      });
    }

    res.status(500).json({
      error: 'Error interno del servidor',
      message: 'Ocurrió un error al realizar el logout'
    });
  }
};

module.exports = {
  registerUser,
  getAllUsers,
  getUserByEmail,
  loginUser,
  logoutUser
}; 