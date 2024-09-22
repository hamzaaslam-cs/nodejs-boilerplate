module.exports = Object.freeze({
    SECRET: env('JWT_EMAIL_TOKEN_SECRET', 'emailtoken'),
    EXPIRE_IN: env('JWT_EMAIL_TOKEN_EXPIRE_IN', '180'),

    JWT_ACCESS_TOKEN_SECRET: env('JWT_ACCESS_TOKEN_SECRET', 'accesstoken'),
    JWT_ACCESS_TOKEN_EXPIRE_IN: env('JWT_ACCESS_TOKEN_EXPIRE_IN', "1h"),

    JWT_REFRESH_TOKEN_SECRET: env('JWT_REFRESH_TOKEN_SECRET', 'refreshtoken'),
    JWT_REFRESH_TOKEN_EXPIRE_IN: env('JWT_REFRESH_TOKEN_EXPIRE_IN', "7d")
});