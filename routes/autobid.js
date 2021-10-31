const router = require("express").Router();
const aBidController = require("../controllers/autobid.js");

router.post("/", aBidController.addNewAutobid);

module.exports = router;