const router = require("express").Router();
const authController = require("../controllers/authController");
const controllersWrapper = require("../utils/controllersWrapper");

router.post("/login", controllersWrapper(authController.login));
router.post("/register", controllersWrapper(authController.register));
//TODO : WHEN WE INTEGRATE TOKENS
router.post("/refresh");
module.exports = router;
