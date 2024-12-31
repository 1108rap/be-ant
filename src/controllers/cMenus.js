// Import Library
const pool = require("../config/database/pool");
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

const addMenus = async (req, res) => {
  // Source
  const { name, path, icon, type, parentId, isActive = false } = req.body;

  // Validation Require Input
  if (!name || !path || !type) {
    return res.status(400).json({ error: "Name, Path, Type, are required" });
  }

  // process
  try {
    const newMenus = await modelMenus.createMenus(
      name,
      path,
      icon,
      type,
      parentId,
      isActive
    );
    res.status(201).json({ success: true, data: newMenus });
  } catch (err) {
    if (err.code === "23505") {
      return res
        .status(400)
        .json({ error: "Duplicate data", message: err.detail });
    }
    res.status(500).json({ success: false, message: err.message });
  }
};

const getParentMenus = async (req, res) => {
  try {
    const parentData = await modelMenus.getParent();
    res.status(200).json(parentData);
  } catch (err) {
    console.error("Error fetch parent:", err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};

const deleteMenu = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await modelMenus.removeMenu(id);
    if (!response) {
      return res.status(404).json({ message: "Menu not found" });
    }
    res.json({ message: "Menu deleted", response });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Export
module.exports = {
  getRoutes,
  getMenuData,
  getNavbar,
  getShopListMenus,
  getDashMenus,
  addMenus,
  getParentMenus,
  deleteMenu,
};
