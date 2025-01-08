// Import Library
const express = require("express");
const userController = require("../controllers/cUsers");

//Initialize Library
const router = express.Router();

// Direction
router.get("/api/users", userController.getUsers);
router.post("/api/createuser", userController.addUsers);
router.get("/api/refuseremp", userController.refEmpUsers);
router.put("/api/users/:id/delete", userController.deleteUser);
router.get("/api/generateTemplate", userController.templateUsers);

// Export Router
module.exports = router;
