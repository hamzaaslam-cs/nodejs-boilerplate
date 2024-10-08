const express = require("express");
const router = express.Router();
const {register, login, forget, reset, refreshToken} = require("../apis/controllers/auth-controller")
const {registrationValidator, loginValidator, forgetValidator, resetValidator} = require("../apis/validators");
const {asyncWrap} = require("../utils/asyncWrapper");

router.post("/register", registrationValidator, asyncWrap(register));
router.post("/login", loginValidator, asyncWrap(login));
router.get("/forget/:email", forgetValidator, asyncWrap(forget));
router.post("/reset/password", resetValidator, asyncWrap(reset));
router.get("/refresh-token/:refresh_token", asyncWrap(refreshToken));

module.exports = router;
