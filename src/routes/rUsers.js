// Import Library
const express = require("express");
const userController = require("../controllers/cUsers");

//Initialize Library
const router = express.Router();

// Direction
router.get("/users", userController.getUsers);
router.post("/createuser", userController.addUsers);
router.get("/refuseremp", userController.refEmpUsers);

// Export Router
module.exports = router;
