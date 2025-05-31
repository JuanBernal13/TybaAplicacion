const bcrypt = require('bcrypt');

function encryptPassword(password) {
  return bcrypt.hash(password, 10);
}

  // Validar el email
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Validación de contraseña
function isValidPassword(password) {
    return password && password.length >= 8;
  }


module.exports = {
  encryptPassword,
  isValidEmail,
  isValidPassword
}
