const {StatusCodes} = require('http-status-codes');
const BaseError = require("./BaseError");

class AuthError extends BaseError {
    constructor(name="UNAUTHORIZED", httpCode = StatusCodes.UNAUTHORIZED, description = 'Authentication failed', isOperational = true) {
        super(name, httpCode,description, isOperational);
    }
}

module.exports = AuthError;