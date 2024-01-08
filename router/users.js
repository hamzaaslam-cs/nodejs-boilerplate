const express = require("express");
const router = express.Router();
const {asyncWrap} = require("../utils/asyncWrapper");
const {find, index} = require('../apis/controllers/user-controller')
const verifyToken = require('../middlewares/auth-middleware');

router.get("/", verifyToken, asyncWrap(index));
router.get("/:id", verifyToken, asyncWrap(find));

module.exports = router;
