const {StatusCodes} = require('http-status-codes')
const {registerUser, loginUser, forgetPassword, resetPassword} = require('../../services/user-service');
const authDto = require('../dtos/auth-dto');
const {verifyRefreshToken, generateAccessToken, verifyAccessToken} = require("../../utils/jwtHelper");
const User =require("../../models/User");
const PersonalAccessToken = require("../../models/PersonalAccessToken");
const AuthError = require("../../errors/AuthError");
const {JsonWebTokenError} = require("jsonwebtoken");
const register = async (req, res, next) => {
    try {
        let data = await registerUser(req.validated);
        return res.status(StatusCodes.OK).send(getObjectResponse(true, "User registered successfully", authDto(data)));
    } catch (e) {
        next(e);
    }
};

const login = async (req, res, next) => {
    try {
        let data = await loginUser(req.validated);
        return res.status(StatusCodes.OK).send(getObjectResponse(true, "Successfully logged in", authDto(data)));
    } catch (e) {
        next(e);
    }
};

const forget = async (req, res, next) => {
    try {
        await forgetPassword(req.params.email);
        return res.status(StatusCodes.OK).send(getObjectResponse(true, "Email sent successfully", {}));
    } catch (e) {
        next(e);
    }
};
const reset = async (req, res, next) => {
    try {
        await resetPassword(req.body.email, req.body.password)
        return res.render('alert.hbs', {layout: 'alert.hbs', message: "Password updated successfully"});
        // return  res.status(StatusCodes.OK).send(getObjectResponse(true, "Password updated successfully",{}));
    } catch (e) {
        return res.render('alert.hbs', {layout: 'alert.hbs', message: e.message});
    }
};

const refreshToken = async (req, res, next) => {
    try {
        const access_token = req.header('Authorization')??null;
        const refreshToken = req.params.refresh_token;
        const token = await PersonalAccessToken.findOne({ where: { access_token: access_token,refresh_token:refreshToken } });

        if(!token){
            return res.status(StatusCodes.UNAUTHORIZED).send(getObjectResponse(false, "jwt expired", null));
        }

        verifyRefreshToken(refreshToken);
        let accessToken = generateAccessToken({userId: token.user_id});

        let resPayload={"access_token": accessToken, "refresh_token": refreshToken};

        return res.status(StatusCodes.OK).send(getObjectResponse(true, "Token refreshed successfully", resPayload));
    } catch (e) {
        next(e);
    }
};


module.exports = {register, login, forget, reset, refreshToken}