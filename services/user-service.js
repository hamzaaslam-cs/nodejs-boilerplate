const User = require("../models/User");
const PersonalAccessToken = require("../models/PersonalAccessToken");
const bcrypt = require('bcrypt');
const AuthError = require("../errors/AuthError");
const {sendForgotPasswordEmail} = require('../mails')
const {logger} = require("../utils/logger");
const {BASE_URL} = require("../config/server");
const {generateAccessToken, generateForgetPasswordToken, generateRefreshToken} = require("../utils/jwtHelper")
const registerUser = async (data) => {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    let user = await User.create(
        {'name': data.name, 'email': data.email, 'password': hashedPassword}
    );

    const accessToken = generateAccessToken({userId: user.id})
    const refreshToken = generateRefreshToken({userId: user.id})

    await PersonalAccessToken.create({
        user_id: user.id,
        access_token: accessToken,
        refresh_token: refreshToken,
    });

    return {...user.dataValues, 'access_token': accessToken, 'refresh_token': refreshToken};
};

const loginUser = async (data) => {
    let user = await User.findOne(
        {where: {email: data.email}}
    );

    if (empty(user)) {
        throw new AuthError();
    }

    const passwordMatched = await bcrypt.compare(data.password, user.password);

    if (!passwordMatched) {
        throw new AuthError();
    }

    const accessToken = generateAccessToken({userId: user.id})
    const refreshToken = generateRefreshToken({userId: user.id})

    await PersonalAccessToken.create({
        user_id: user.id,
        access_token: accessToken,
        refresh_token: refreshToken,
    });

    return {...user.dataValues, 'access_token': accessToken, 'refresh_token': refreshToken};
}

const getUserDetail = async (id) => {
    let user = await User.findByPk(
        id
    );

    return user;
}

const getUsers = async (id) => {
    let users = await User.findAll();

    return users;
}

const forgetPassword = async (email) => {
    const token = generateForgetPasswordToken({email: email});

    let data = {
        pageTitle: 'Forget Password',
        token: token,
        reset_password_url: BASE_URL + "api/auth/reset/password"
    };

    sendForgotPasswordEmail(email, data).then(res => {
    }).catch(e => {
        logger.error(e);
    });

    return true;
}

const resetPassword = async (email, password) => {
    let user = await User.findOne(
        {where: {email}}
    );

    user.password = await bcrypt.hash(password, 10);

    await user.save();
}


module.exports = {registerUser, loginUser, getUserDetail, getUsers, forgetPassword, resetPassword}