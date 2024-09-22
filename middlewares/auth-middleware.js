const {StatusCodes, UNAUTHORIZED} = require('http-status-codes');
const BaseError = require("../errors/BaseError");
const {verifyAccessToken} = require("../utils/jwtHelper");
const PersonalAccessToken = require("../models/PersonalAccessToken");
const {JsonWebTokenError} = require("jsonwebtoken");
const AuthError = require("../errors/AuthError");

async function verifyToken(req, res, next) {
    const token = req.header('Authorization');
    if (!token) return res.status(StatusCodes.UNAUTHORIZED).send(getErrorResponse(new BaseError("Access denied")));
    try {
        const decoded = verifyAccessToken(token);
        let result = await PersonalAccessToken.findOne({where: {access_token: token}});
        if (!result) {
            next(new AuthError());
        }
        req.authUserId = decoded.userId;
        next();
    } catch (error) {
        next(error)
    }
}

module.exports = verifyToken;