const express = require("express");
const router = express.Router();

//handling income GET request to /sauces and /sauces/:id
const saucesCtrl = require("../controller/sauces");

router.get("/", saucesCtrl.saucesList);
router.get("/:id", saucesCtrl.saucesListId);
router.post("/", saucesCtrl.saucesListSave);
router.put("/:id", saucesCtrl.saucesListUpdate);
router.delete("/:id", saucesCtrl.saucesListDelete);
router.post("/:id/like", saucesCtrl.saucesListLike);

module.exports = router;
