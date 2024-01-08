const {create} = require("express-handlebars");
const {join} = require("path");
const {view_path, mail} = require("../config");
const transport = require('../providers/mail-provider')

const sendForgotPasswordEmail = async (to, data, subject = "Forget password email") => {
    const html = await create().render(join(view_path, "forget.hbs"), data);
        let mailOptions = {
            from: mail.MAIL_FROM,
            to: to,
            subject: subject,
            html: html
        };
        transport.sendMail(mailOptions);
        return "Forget Password Email Send Successfully";
    };

    module.exports = {sendForgotPasswordEmail};