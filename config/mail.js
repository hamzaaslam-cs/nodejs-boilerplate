module.exports = Object.freeze({
    MAIL_HOST: env('MAIL_HOST', 'sandbox.smtp.mailtrap.io'),
    MAIL_PORT: env('MAIL_PORT', 2525),
    MAIL_USER: env('MAIL_USER', ''),
    MAIL_PASS: env('MAIL_PASS', ''),
    MAIL_FROM: env('MAIL_FROM', 'node@example.com')
});