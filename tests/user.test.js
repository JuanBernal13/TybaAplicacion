const request = require('supertest');
const app = require('../app');

describe('User Endpoints', () => {
  const testUser = {
    nombre: 'Test User',
    email: `test${Date.now()}@test.com`,
    password: '123456'
  };

  test('POST /api/v1/usuarios/registro should register a new user', async () => {
    const response = await request(app)
      .post('/api/v1/usuarios/registro')
      .send(testUser)
      .expect(201);

    expect(response.body).toHaveProperty('mensaje');
    expect(response.body).toHaveProperty('usuario');
    expect(response.body.usuario).toHaveProperty('email', testUser.email);
  });

  test('POST /api/v1/usuarios/login should login user', async () => {
    // First register the user
    await request(app)
      .post('/api/v1/usuarios/registro')
      .send({
        nombre: 'Login Test',
        email: 'login@test.com',
        password: '123456'
      });

    // Then login
    const response = await request(app)
      .post('/api/v1/usuarios/login')
      .send({
        email: 'login@test.com',
        password: '123456'
      })
      .expect(200);

    expect(response.body).toHaveProperty('mensaje');
    expect(response.body).toHaveProperty('token');
    expect(response.body).toHaveProperty('usuario');
  });

  test('POST /api/v1/usuarios/login should fail with wrong password', async () => {
    const response = await request(app)
      .post('/api/v1/usuarios/login')
      .send({
        email: 'login@test.com',
        password: 'wrongpassword'
      })
      .expect(401);

    expect(response.body).toHaveProperty('error');
  });
}); 