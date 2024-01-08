const jwt = require('jsonwebtoken');
const {StatusCodes} = require('http-status-codes');
const jwtConfig = require('../config/jwt');
const BaseError = require("../errors/BaseError");

function verifyToken(req, res, next) {
    const token = req.header('Authorization');
    if (!token) return res.status(StatusCodes.UNAUTHORIZED).send(getErrorResponse(new BaseError("Access denied")));
    try {
        const decoded = jwt.verify(token, jwtConfig.SECRET);
        req.authUserId = decoded.userId;
        next();
    } catch (error) {
        next(error)
    }
}

module.exports = verifyToken;