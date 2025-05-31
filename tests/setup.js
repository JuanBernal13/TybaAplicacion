// Test setup file
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test_secret';
process.env.GOOGLE_MAPS_API_KEY = 'test_api_key';

// Reduce timeout for faster tests
jest.setTimeout(10000);

// Mock console.log to reduce noise during tests
global.console = {
  ...console,
  log: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
  info: jest.fn(),
  debug: jest.fn(),
}; 