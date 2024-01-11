const request = require('supertest')
const app = require('../index')
// describe('Post Endpoints', () => {
//   it('should create a new post', async () => {
//     const res = await request(app)
//         .post('/api/auth/login')
//         .send({
//           email: "test1@example.com",
//           password: "12345678"
//         })
//     expect(res.statusCode).toEqual(200)
//   })
// })

describe('Space test suite', () => {
    it('My Space Test', () => {
        expect(true).toEqual(true);
    });
});