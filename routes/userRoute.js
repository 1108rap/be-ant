const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

//Route untuk Create User
router.post("/users", userController.createUser);

//Route untuk Get User
router.get("/users", userController.getUsers);

module.exports = router;
