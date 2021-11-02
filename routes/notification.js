const router = require("express").Router();
const nController = require('../controllers/notification');

router.get("/", nController.getUserNotifications);

router.put("/:id", nController.readNotification);


module.exports = router;