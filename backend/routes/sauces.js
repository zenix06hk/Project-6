const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
//handling income GET request to /sauces and /sauces/:id
const saucesCtrl = require("../controller/sauces");

router.get("/", auth, saucesCtrl.saucesList);
router.post("/", auth, multer, saucesCtrl.saucesSave);
router.get("/:id", auth, saucesCtrl.saucesListId);
router.put("/:id", auth, multer, saucesCtrl.saucesListUpdate);
router.delete("/:id", auth, saucesCtrl.saucesDelete);
// router.post("/:id/like", auth, saucesCtrl.saucesListLike);

module.exports = router;
