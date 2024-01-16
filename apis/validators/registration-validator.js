const Joi = require('joi');
const User = require("../../models/User");
const {ValidationError} = require("joi");
const {StatusCodes} = require('http-status-codes')


const registrationValidator = async (req, res, next) => {
    try {
        const checkData = async (value) => {
            const user = await User.findOne({where: {email: value}});
            if (!empty(user)) {
                throw new ValidationError('Email is already in use');
            }
        }

        const schema = Joi.object({
            name: Joi.string().alphanum().min(3).max(30).required(),
            password: Joi.string().min(6).required(),
            email: Joi.string().email().required().external(checkData)
        })

        req.validated = await schema.validateAsync(req.body);
        next();
    } catch (e) {
        next(e);
    }
}

module.exports = {registrationValidator};