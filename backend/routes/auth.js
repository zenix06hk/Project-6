const express = require("express");
const router = express.Router();

const authCtrl = require("../controller/auth");

router.post("/signUp", authCtrl.signUp);
router.post("/login", authCtrl.login);

module.exports = router;
