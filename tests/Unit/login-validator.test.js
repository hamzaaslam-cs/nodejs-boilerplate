const {loginValidator} = require("../../apis/validators/login-validator");
const {ValidationError} = require("joi");

describe("Login validator", () => {
    it("Successful validation", async () => {
        let req = {
            body: {
                email: "hamza@exampple.com",
                password: "12345678",
            },
        };
        let res = {};
        let next = {}
        await loginValidator(req, res, next => {
            expect(req.validated).toEqual(req.body)
        });
    });


    it("Invalid email validation", async () => {
        let req = {
            body: {
                email: "com",
                password: "12345678",
            },
        };
        await loginValidator(req, {}, (error = null) => {
            expect(error).toBeInstanceOf(ValidationError)
        });
    });

});
