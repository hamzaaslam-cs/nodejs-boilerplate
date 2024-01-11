const {app} = require('../index')
const request = require('supertest')

describe('Login End Point', () => {
  it('should loggedIn the user', async () => {
    const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: "test1@example.com",
          password: "12345678"
        })
    expect(res.statusCode).toEqual(200)
  })
})
