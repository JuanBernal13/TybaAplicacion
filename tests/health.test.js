const request = require('supertest');
const app = require('../app');

describe('Health Endpoint', () => {
  test('GET /api/v1/health should return OK status', async () => {
    const response = await request(app)
      .get('/api/v1/health')
      .expect(200);

    expect(response.body).toHaveProperty('status', 'OK');
    expect(response.body).toHaveProperty('uptime');
    expect(response.body).toHaveProperty('timestamp');
  });
}); 