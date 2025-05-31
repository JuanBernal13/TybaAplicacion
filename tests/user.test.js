const request = require('supertest');
const app = require('../app');

jest.mock('../config/database', () => jest.fn());

jest.mock('../services/userService', () => ({
  registerUser: jest.fn(),
  loginUser: jest.fn()
}));

const userService = require('../services/userService');

describe('User Endpoints', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('POST /api/v1/usuarios/registro should handle registration request', async () => {
    userService.registerUser.mockResolvedValue({
      user: {
        id: 'test123',
        nombre: 'Test User',
        email: 'test@test.com'
      },
      transactions: []
    });

    const response = await request(app)
      .post('/api/v1/usuarios/registro')
      .send({
        nombre: 'Test User',
        email: 'test@test.com',
        password: '123456'
      });

    expect(response.status).toBe(201);
    expect(userService.registerUser).toHaveBeenCalled();
  });

  test('POST /api/v1/usuarios/login should handle login request', async () => {
    userService.loginUser.mockResolvedValue({
      user: {
        id: 'test123',
        nombre: 'Test User',
        email: 'test@test.com'
      },
      token: 'fake-jwt-token'
    });

    const response = await request(app)
      .post('/api/v1/usuarios/login')
      .send({
        email: 'test@test.com',
        password: '123456'
      });

    expect(response.status).toBe(200);
    expect(userService.loginUser).toHaveBeenCalled();
  });

  test('POST /api/v1/usuarios/login should handle invalid credentials', async () => {
    userService.loginUser.mockRejectedValue(new Error('Credenciales incorrectas'));

    const response = await request(app)
      .post('/api/v1/usuarios/login')
      .send({
        email: 'test@test.com',
        password: 'wrongpassword'
      });

    expect(response.status).toBe(401);
    expect(userService.loginUser).toHaveBeenCalled();
  });
}); 