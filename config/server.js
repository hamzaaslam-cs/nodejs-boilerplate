const host = '127.0.0.1';
const port = '3003';

const NODE_ENV=env('NODE_ENV','development')

const SERVER_HOST = env('SERVER_HOST', host);
const SERVER_PORT = env('SERVER_PORT', port);

module.exports = Object.freeze({
    SERVER_HOST: SERVER_HOST,
    SERVER_PORT: SERVER_PORT,
    BASE_URL: env('BASE_URL', 'http://' + SERVER_HOST + ':' + SERVER_PORT+"/"),
    NODE_ENV
});