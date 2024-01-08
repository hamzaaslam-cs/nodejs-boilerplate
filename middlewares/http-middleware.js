const {logger} = require("../utils/logger");
const {DISABLE_HTTP_LOG}=require("../config/logger")
const httpMiddleware = (req, res, next) => {
    next()
    if(DISABLE_HTTP_LOG){
        return;
    }
    let oldWrite = res.write,
        oldEnd = res.end;

    let resChunks = [];
    let resPayload;

    res.write = function (chunk) {
        resChunks.push(chunk);

        return oldWrite.apply(res, arguments);
    };

    res.end = function (chunk) {
        if (chunk)
            resChunks.push(chunk);

        resPayload = Buffer.concat(resChunks).toString('utf8');

        oldEnd.apply(res, arguments);
    };



    const requestStart = Date.now();

    let errorMessage = null;
    let body = [];
    req.on("data", chunk => {
        body.push(chunk);
    });
    req.on("end", () => {
        body = Buffer.concat(body);
        body = body.toString();
    });
    req.on("error", error => {
        errorMessage = error.message;
    });

    res.on("finish", () => {
        const {rawHeaders, httpVersion, method, socket, originalUrl} = req;
        const {remoteAddress, remoteFamily} = socket;

        logger.http(
            {
                processingTime: Date.now() - requestStart,
                rawHeaders,
                body,
                errorMessage,
                httpVersion,
                method,
                remoteAddress,
                remoteFamily,
                url:originalUrl,
                authUserId: req.authUserId ?? undefined,
                response:JSON.parse(resPayload)
            }
        );
    });

};

module.exports = {httpMiddleware};