const Joi = require('joi');
const {ValidationError} = require("joi");
const {verifyForgetPasswordToken} = require("../../utils/jwtHelper");

const resetValidator = async (req, res, next) => {
    try {
        const isValidToken = async (token) => {
            try {

                const decoded = verifyForgetPasswordToken(token);
                req.body.email = decoded.email;
            } catch (error) {
                throw new ValidationError('Invalid token');
            }
        }

        const schema = Joi.object({
            password: Joi.string().min(6).required(), token: Joi.required().external(isValidToken)
        })

        req.validated = await schema.validateAsync(req.body);
        next();
    } catch (e) {
        return res.render('alert', {message: e.message});
    }

}

module.exports = {resetValidator};