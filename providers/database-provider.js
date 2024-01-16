const {Sequelize} = require('sequelize');
const database = require('../config/database');
const server = require('../config/server');


const getDatabaseDriver = () => {
    if (server.NODE_ENV === "test") {
        return new Sequelize('sqlite::memory:',{
            logging: database.DATABASE_LOGS
        })
    } else {
        return new Sequelize(database.DATABASE_NAME, database.DATABASE_USERNAME, database.DATABASE_PASSWORD, {
            host: database.DATABASE_HOST, dialect: database.DATABASE_DRIVER, logging: database.DATABASE_LOGS
            /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
        });
    }
};

const sequelize = getDatabaseDriver();

sequelize.authenticate().then(() => {
}).catch((error) => {
    console.log(error);
});


sequelize.sync().then(() => {
}).catch((error) => {
    console.log(error);
});


module.exports = sequelize;