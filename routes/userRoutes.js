const router = require("express").Router();
const userController = require("../controllers/userController");
const controllersWrapper = require("../utils/controllersWrapper");

//update user
router.put("/update", controllersWrapper(userController.update));

//get all the users (admin only)
router.get("/getUsers");

//get specific user(admin only)
//router.get("/getUser/:id");

module.exports = router;
