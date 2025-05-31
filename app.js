const express = require('express');
const connectDB = require('./config/database');
const routes = require('./routes');
const { notFoundHandler } = require('./middlewares/errorHandler');

// Conectar a la base de datos solo si no estamos en modo test
if (process.env.NODE_ENV !== 'test') {
  connectDB();
}

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', routes);

app.use('*', notFoundHandler);

// Manejo básico de errores
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({
    error: 'Error interno del servidor',
    message: 'Algo salió mal en el servidor',
    timestamp: new Date().toISOString()
  });
});

// Solo iniciar el servidor si no estamos en modo test
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  });
}

module.exports = app;