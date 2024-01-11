const {app} = require('../index')
const request = require('supertest')

describe('Post Endpoints', () => {
  it('should create a new post', async () => {
    const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: "test1@example.com",
          password: "12345678"
        })
    expect(res.statusCode).toEqual(200)
  })
})
