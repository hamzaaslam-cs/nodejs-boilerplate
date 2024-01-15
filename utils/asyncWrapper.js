const {logger} = require("./logger");
const asyncWrap = (fn) => {
    return async function wrappedFn(req, res, next) {
        try {
            await fn(req, res, next);
        } catch (err) {
            next(err);
        }
    };
};

module.exports = {asyncWrap};
