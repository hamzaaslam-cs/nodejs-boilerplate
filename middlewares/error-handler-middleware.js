const {ValidationError} = require("joi");
const {StatusCodes} = require('http-status-codes')
const {logger} = require("../utils/logger");
const {TokenExpiredError} = require("jsonwebtoken");
const errorhandler = (err, req, res, next) => {
    if (err) {
        let statusCode = err.status ?? StatusCodes.INTERNAL_SERVER_ERROR;

        if (err instanceof ValidationError) {
            statusCode = StatusCodes.BAD_REQUEST;
        } else if (err instanceof TokenExpiredError) {
            statusCode = StatusCodes.UNAUTHORIZED;
        } else {
            logger.error(err.stack);
        }

        return res.status(statusCode).send(getEmptyResponse(false, err.message));
    }
    next()
};

module.exports = errorhandler;