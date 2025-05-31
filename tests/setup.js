// Test setup file
process.env.NODE_ENV = 'test';
process.env.MONGODB_URI = 'mongodb://localhost:27017/userdb_test';
process.env.JWT_SECRET = 'test_secret';
process.env.GOOGLE_MAPS_API_KEY = 'test_api_key';

// Increase timeout for async operations
jest.setTimeout(30000);

// Mock console.log to reduce noise during tests
global.console = {
  ...console,
  log: jest.fn(),
  error: console.error,
  warn: console.warn,
  info: console.info,
  debug: console.debug,
}; 