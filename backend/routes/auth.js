const express = require("express");
const router = express.Router();

const authCtrl = require("../controller/auth");

router.post("/", authCtrl.signUp);
router.post("/", authCtrl.login);

module.exports = router;
