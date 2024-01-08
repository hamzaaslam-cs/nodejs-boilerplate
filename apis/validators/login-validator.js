const Joi = require('joi');

const loginValidator = async (req, res, next) => {
    try {
        const schema = Joi.object({
            password: Joi.string().min(6).required(),
            email: Joi.string().email().required()
        })
        req.validated = await schema.validateAsync(req.body);
    } catch (e) {
        next(e);
    }
    next();
}

module.exports = {loginValidator};