const path = require("path");
const mail = require('./mail');
const jwt = require('./jwt');
const server = require('./server');
const crypt = require('./crypt');
const database = require('./database');


const root_path = path.join(__dirname, "../")
const view_path = path.join(__dirname, "../views/")


module.exports = {
    root_path,view_path, mail, jwt, server, crypt, database
}
