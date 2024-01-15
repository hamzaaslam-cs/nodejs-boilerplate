const {app} = require('../../index')
const request = require('supertest')
const User = require("../../models/User")

describe('Register End Point', () => {

    it('Resetting tables', async () => {
        await User.sync({force: true});
    })

    it('Should register the user', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                name: "hamza", password: "12345678", email: "test1@example.com"
            })
        expect(res.statusCode).toEqual(200)
        expect(res.body.data).toHaveProperty('id')
        expect(res.body.data).toHaveProperty('name')
        expect(res.body.data).toHaveProperty('email')
        expect(res.body.data).toHaveProperty('token')

    })

    it('Trying to register user with already used email', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                name: "hamza", password: "12345678", email: "test1@example.com"
            })
        expect(res.statusCode).toEqual(400)
    })

})

describe('Login End Point', () => {

    it('Should loggedIn the user', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: "test1@example.com", password: "12345678"
            })
        expect(res.statusCode).toEqual(200);
        expect(res.body.data).toHaveProperty('id')
        expect(res.body.data).toHaveProperty('name')
        expect(res.body.data).toHaveProperty('email')
        expect(res.body.data).toHaveProperty('token')
    })

    it('Trying to login user with wrong password', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: "test1@example.com", password: "1234567893"
            })
        expect(res.statusCode).toEqual(500)
    })
})

describe('Forget End Point', () => {
    it('Should send Email in case user forget his/her password', async () => {
        const res = await request(app)
            .get('/api/auth/forget/test1@example.com');
        expect(res.statusCode).toEqual(200)
    })

})

