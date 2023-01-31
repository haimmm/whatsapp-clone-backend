const router = require("express").Router();
const productController = require("../controllers/productController");
const controllersWrapper = require("../utils/controllersWrapper");


//add to cart
router.post("/cart/:id", controllersWrapper(productController.addToCart))
//delete specific item
router.delete("/cart/:id", controllersWrapper(productController.removeFromCart))
//delete all items from cart
router.delete("/cart")
//get cart
router.get("/cart")
//getOrders
router.get("/orders")
//set order
router.post("/order")

module.exports = router;
