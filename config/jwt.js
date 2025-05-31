module.exports = {
  JWT_SECRET: process.env.JWT_SECRET || '123',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '24h'
}; 