const {Sequelize} = require('sequelize');
const database = require('../config/database');

const sequelize = new Sequelize(database.DATABASE_NAME, database.DATABASE_USERNAME, database.DATABASE_PASSWORD, {
    host: database.DATABASE_HOST, dialect: database.DATABASE_DRIVER, logging: database.DATABASE_LOGS
    /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
});

sequelize.authenticate().then(() => {
}).catch((error) => {
    console.log(error);
});


sequelize.sync().then(() => {
}).catch((error) => {
    console.log(error);
});


module.exports = sequelize;