const {app} = require('../../index')
const {loginValidator} = require("../../apis/validators/login-validator");
const {ValidationError} = require("joi");
const request = require("supertest");
const User = require("../../models/User");

describe("Login validator", () => {

    it('Resetting tables', async () => {
        await User.sync({force: true});
    })

    it("Successful validation", async () => {
        await request(app)
            .post('/api/auth/register')
            .send({
                name: "hamza", password: "12345678", email: "hamza@exampple.com"
            })

        let req = {
            body: {
                email: "hamza@exampple.com", password: "12345678",
            },
        };
        let res = {};
        await loginValidator(req, res, (next) => {
            expect(req.validated).toEqual(req.body)
        });
    });


    it("Invalid email validation", async () => {
        let req = {
            body: {
                email: "com", password: "12345678",
            },
        };
        await loginValidator(req, {}, (error = null) => {
            expect(error).toBeInstanceOf(ValidationError)
        });
    });

});
