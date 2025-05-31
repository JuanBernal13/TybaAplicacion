const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

// Método para convertir a DTO (sin password)
userSchema.methods.toDTO = function() {
  return {
    id: this._id,
    nombre: this.nombre,
    email: this.email,
    fechaRegistro: this.createdAt
  };
};

module.exports = mongoose.model('User', userSchema); 