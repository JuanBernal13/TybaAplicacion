const User = require('../models/User');
const { isValidEmail, isValidPassword } = require('../utils/userUtils');

const validateUserRegistration = (req, res, next) => {
  const { nombre, email, password } = req.body;
  const errors = [];

  // Validar campos requeridos
  if (!nombre || !email || !password) {
    errors.push({
      field: 'required',
      message: 'Todos los campos son requeridos',
      campos: ['nombre', 'email', 'password']
    });
  }

  if (email && isValidEmail(email)) {
    errors.push({
      field: 'email',
      message: 'El formato del email no es válido'
    });
  }


  if(password && isValidPassword(password)){
    errors.push({
      field: 'password',
      message: 'La contraseña debe tener al menos 8 caracteres'
    });
  }
  
  next();
};

module.exports = {
  validateUserRegistration
}; 