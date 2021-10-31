const router = require("express").Router();
const prodController = require('../controllers/product');


router.post("/", prodController.addNewProduct);

router.get("/", prodController.getAllProducts);

router.get("/:id", prodController.getProductById);

router.put("/bid/:id", prodController.bidOnProduct);

router.put("/autoBid/:id", prodController.setupAutoBidOnProduct);

module.exports = router;
