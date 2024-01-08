const Joi = require('joi');

const forgetValidator = async (req, res, next) => {
    try {
        const schema = Joi.object({
            email: Joi.string().email().required()
        })
        req.validated = await schema.validateAsync(req.params);
    } catch (e) {
        next(e);
    }
    next();
}

module.exports = {forgetValidator};