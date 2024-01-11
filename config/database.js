module.exports = Object.freeze({
    DATABASE_NAME: env('DATABASE_NAME', 'default_db'),
    DATABASE_USERNAME: env('DATABASE_USERNAME', 'root'),
    DATABASE_PASSWORD: env('DATABASE_PASSWORD', ''),
    DATABASE_DRIVER: env('DATABASE_DRIVER'),
    DATABASE_HOST: env('DATABASE_HOST', 'localhost')
});