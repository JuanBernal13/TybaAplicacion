const request = require('supertest');
const app = require('../app');

describe('Restaurant Endpoints', () => {
  test('POST /api/v1/restaurants/nearby should return restaurants', async () => {
    const response = await request(app)
      .post('/api/v1/restaurants/nearby')
      .send({
        latitud: 4.7110,
        longitud: -74.0721,
        radius: 1000
      })
      .expect(200);

    expect(response.body).toHaveProperty('success', true);
    expect(response.body).toHaveProperty('data');
    expect(response.body).toHaveProperty('meta');
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  test('POST /api/v1/restaurants/nearby should fail with invalid coordinates', async () => {
    const response = await request(app)
      .post('/api/v1/restaurants/nearby')
      .send({
        latitud: 999,
        longitud: 999,
        radius: 1000
      })
      .expect(400);

    expect(response.body).toHaveProperty('success', false);
    expect(response.body).toHaveProperty('error');
  });

  test('GET /api/v1/restaurants/test should verify API connection', async () => {
    const response = await request(app)
      .get('/api/v1/restaurants/test')
      .expect(200);

    expect(response.body).toHaveProperty('success', true);
    expect(response.body).toHaveProperty('data');
  });
}); 