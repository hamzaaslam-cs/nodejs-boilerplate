require("./utils/loadEnv");
require("./globals");
// const server = require("./config/server");
const express = require("express");
require("./providers/database-provider");
const router = require("./router/index");
const errorhandler = require("./middlewares/error-handler-middleware");
const {logger} = require("./utils/logger");
const path = require("path");
const app = express();
const {engine} = require('express-handlebars');
const cors = require('cors')

// const port = server.SERVER_PORT;
// const host = server.SERVER_HOST;


app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, "views"));

app.use(cors({
    origin: '*', // use your actual domain name (or localhost), using * is not recommended
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Origin', 'X-Requested-With', 'Accept', 'x-client-key', 'x-client-token', 'x-client-secret', 'Authorization'],
    credentials: true
}))

app.use(express.urlencoded());

app.use(express.json());

app.use("/api", router);

app.use(errorhandler)


// if the Promise is rejected this will catch it
process.on('unhandledRejection', error => {
    logger.error(error.stack);
    throw error
})

process.on('uncaughtException', error => {
    logger.error(error.stack);
    process.exit(1)
})


module.exports= {app};