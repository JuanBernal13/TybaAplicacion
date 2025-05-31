// Middleware implementado para manejar rutas no encontradas
const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    error: 'Ruta no encontrada',
    message: `No se pudo encontrar ${req.method} ${req.originalUrl}`,
    timestamp: new Date().toISOString()
  });
};

module.exports = {
  notFoundHandler
}; 