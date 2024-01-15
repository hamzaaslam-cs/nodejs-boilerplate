const {StatusCodes} = require('http-status-codes')
const {registerUser, loginUser, forgetPassword, resetPassword} = require('../../services/user-service');
const authDto = require('../dtos/auth-dto');

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
        return res.status(StatusCodes.OK).send(getObjectResponse(true, "Forget password email send successfully", {}));
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
module.exports = {register, login, forget, reset}