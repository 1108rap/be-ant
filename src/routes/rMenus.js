// Import Library
const express = require("express");
const menuController = require("../controllers/cMenus");

//Initialize Library
const router = express.Router();

// Direction
router.get("/routes", menuController.getRoutes);
router.get("/navbar", menuController.getNavbar);
router.get("/menusl", menuController.getShopListMenus);
router.get("/dashmenu", menuController.getDashMenus);
router.get("/menus", menuController.getMenuData);

// Export Router
module.exports = router;
