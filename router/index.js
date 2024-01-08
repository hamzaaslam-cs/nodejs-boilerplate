const express = require("express");
const router = express.Router();
const auth = require("./auth")
const users = require("./users")
const {httpMiddleware} = require("../middlewares/http-middleware");

router.use('/auth', auth)
router.use('/users', httpMiddleware,users)
router.all('/*', function(req,res,next){
    res.status(404).send(getErrorResponse(false,"Invalid url"));
})


module.exports = router;