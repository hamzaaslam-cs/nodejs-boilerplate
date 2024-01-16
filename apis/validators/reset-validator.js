const Joi = require('joi');
const jwt = require("jsonwebtoken");
const jwtConfig = require("../../config/jwt");
const User = require("../../models/User");
const {ValidationError} = require("joi");

const resetValidator = async (req, res, next) => {
    try {
        const isValidToken = async (token) => {
            try {
                const decoded = jwt.verify(token, jwtConfig.SECRET);
                req.body.email = decoded.email;
            } catch (error) {
                throw new ValidationError('Invalid token');
            }
        }

        const schema = Joi.object({
            password: Joi.string().min(6).required(),
            token: Joi.required().external(isValidToken)
        })

        req.validated = await schema.validateAsync(req.body);
        next();
    } catch (e) {
        return res.render('alert.hbs', {layout: 'alert.hbs', message: e.message});
    }

}

module.exports = {resetValidator};