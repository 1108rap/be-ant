// Import Library
const express = require("express");
const menuController = require("../controllers/cMenus");

//Initialize Library
const router = express.Router();

// Direction
router.get("/api/routes", menuController.getRoutes);
router.get("/api/navbar", menuController.getNavbar);
router.get("/api/menusl", menuController.getShopListMenus);
router.get("/api/dashmenu", menuController.getDashMenus);
router.get("/api/menus", menuController.getMenuData);
router.post("/api/createmenu", menuController.addMenus);
router.get("/api/parentdata", menuController.getParentMenus);
router.put("/api/menus/:id/delete", menuController.deleteMenu);

// Export Router
module.exports = router;
