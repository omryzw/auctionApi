const router = require("express").Router();
const prodController = require('../controllers/product');


router.post("/", prodController.addNewProduct);

router.get("/", prodController.getAllProducts);

module.exports = router;
