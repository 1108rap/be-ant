// Import Library
const express = require("express");
const empController = require("../controllers/cEmployees");

// Initialize Library
const router = express.Router();

// Direction
router.get("/api/employees", empController.getEmployees);

// Export
module.exports = router;
