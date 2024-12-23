// Import Library
const modelMenus = require("../models/modelMenus");
const buildMenuTree = require("../utils/menuTreeUtils");

// Processs
const getRoutes = async (req, res) => {
  try {
    const route = modelMenus.routes();
    res.status(200).json({ success: true, data: route });
  } catch (err) {
    console.error("Error fetching Routes:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

const getMenuData = async (req, res) => {
  try {
    const dataMenus = await modelMenus.menuData();
    // res.status(200).json({ success: true, data: dataMenus });
    res.status(200).json(dataMenus);
  } catch (err) {
    console.error("Error fetching menu data:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

const getNavbar = async (req, res) => {
  try {
    const navbar = await modelMenus.NavbarHP();
    const menuTree = buildMenuTree(navbar);
    // res.status(200).json({ success: true, data: menuTree });
    res.status(200).json(menuTree);
  } catch (err) {
    console.error("Error fetching navbar:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

const getShopListMenus = async (req, res) => {
  try {
    const shopMenus = await modelMenus.sidebarSL();
    const menuTree = buildMenuTree(shopMenus);
    // res.status(200).json({ success: true, data: menuTree });
    res.status(200).json(menuTree);
  } catch (err) {
    console.error("Error fetching Shopping Menus:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

const getDashMenus = async (req, res) => {
  try {
    const dashMenus = await modelMenus.sidebarDS();
    const menuTree = buildMenuTree(dashMenus);
    // res.status(200).json({ success: true, data: menuTree });
    res.status(200).json(menuTree);
  } catch (err) {
    console.error("Error fetch menu dashboard:", err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Export
module.exports = {
  getRoutes,
  getMenuData,
  getNavbar,
  getShopListMenus,
  getDashMenus,
};
