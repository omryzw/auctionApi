const router = require("express").Router();
const aBidController = require("../controllers/autobid.js");

router.post("/", aBidController.addNewAutobid);

router.put("/product/:id", aBidController.setupAutoBidOnProduct);

router.put("/direct/:id", aBidController.bidOnProduct);

router.get("/won", aBidController.getBidsWon);


module.exports = router;