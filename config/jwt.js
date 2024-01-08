module.exports = Object.freeze({
    SECRET: env('JWT_SECRET', 'secret'),
    EXPIRE_IN: env('EXPIRE_IN', '1h')
});