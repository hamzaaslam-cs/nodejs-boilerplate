const {app} = require('../../index')
const {registrationValidator} = require("../../apis/validators/registration-validator");
const {ValidationError} = require("joi");
const User = require("../../models/User");

describe("Registration validator", () => {

    it('Resetting tables', async () => {
        await User.sync({force: true});
    })

    it("Successful validation", async () => {

        let req = {
            body: {
                email: "hamza1@exampple.com", password: "12345678", name: 'hamza'
            },
        };
        let res = {};
        await registrationValidator(req, res, (next) => {
            expect(req.validated).toEqual(req.body)
        });
    });


    it("Invalid email validation", async () => {
        let req = {
            body: {
                email: "com", password: "12345678",
            },
        };
        await registrationValidator(req, {}, (error = null) => {
            expect(error).toBeInstanceOf(ValidationError)
        });
    });


});