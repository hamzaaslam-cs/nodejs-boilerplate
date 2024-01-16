const {resetValidator} = require("../../apis/validators/reset-validator");
const {ValidationError} = require("joi");
const request = require("supertest");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const jwtConfig = require("../../config/jwt");

describe("Reset password validator", () => {

    it('Resetting tables', async () => {
        await User.sync({force: true});
    })

    it("Successful validation", async () => {

        let password="12345678";
        let email="hamza@example.com"

        const token = jwt.sign({email: email}, jwtConfig.SECRET, {
            expiresIn: jwtConfig.EXPIRE_IN,
        });

        let req = {
            body: {
                token, password,
            },
        };
        let res = jest.fn();
        await resetValidator(req, res, (data) => {
            // expect(error).notToBeInstanceOf(ValidationError)
        });
    });

});
