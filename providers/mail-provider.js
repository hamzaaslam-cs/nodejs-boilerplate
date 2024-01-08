const {createTransport} = require("nodemailer");
const mail = require('../config/mail');
module.exports = createTransport({
    host: mail.MAIL_HOST,
    port: mail.MAIL_PORT,
    auth: {
        user: mail.MAIL_USER,
        pass: mail.MAIL_PASS
    }
});
