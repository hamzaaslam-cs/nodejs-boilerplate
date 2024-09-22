const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');


const generateForgetPasswordToken = (payload) => {
    return jwt.sign(
        payload,
        jwtConfig.SECRET,
        {
            expiresIn: jwtConfig.EXPIRE_IN,
        }
    );
};
const generateAccessToken = (payload) => {
    return jwt.sign(
        payload,
        jwtConfig.JWT_ACCESS_TOKEN_SECRET,
        {
            expiresIn: jwtConfig.JWT_ACCESS_TOKEN_EXPIRE_IN,
        }
    );
};

const generateRefreshToken = (payload) => {
    return jwt.sign(
        payload,
        jwtConfig.JWT_REFRESH_TOKEN_SECRET,
        {
            expiresIn: jwtConfig.JWT_REFRESH_TOKEN_EXPIRE_IN,
        }
    );
};

const verifyForgetPasswordToken = (token) => {
    return jwt.verify(token, jwtConfig.SECRET);
}

const verifyAccessToken = (token) => {
    return jwt.verify(token, jwtConfig.JWT_ACCESS_TOKEN_SECRET);
}


const verifyRefreshToken = (token) => {
    return jwt.verify(token, jwtConfig.JWT_REFRESH_TOKEN_SECRET);
}
module.exports = {
    generateAccessToken,
    generateRefreshToken,
    verifyAccessToken,
    verifyRefreshToken,
    generateForgetPasswordToken,
    verifyForgetPasswordToken
};