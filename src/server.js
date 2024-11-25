// Module Import
const express = require("express");
const cors = require("cors");
const pool = require("./db/pool");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const buildMenuTree = require("./services/menuTreeUtils");

const app = express();
app.use(cors());

//Endpoint untuk mengambil database NavBar Homepage
app.get("/api/navbar", async (req, res) => {
  try {
    const result = await pool.query(`
    select id, name, path, icon, parent_id
    from menu
    where is_active = true
    and type = 'T1'
    order by queue asc
    `);
    const menus = result.rows;
    const menuTree = buildMenuTree(menus);
    res.json(menuTree);
  } catch (error) {
    console.error("Error fetching NavBar:", error);
    req.status(500).json({ error: "Failed to fetch Navbar" });
  }
});

//Endpoint untuk mengambil database Menu Homepage
app.get("/api/menu", async (req, res) => {
  try {
    const result = await pool.query(`
      select id, name, path, icon, parent_id
      from menu
      where is_active = true
      and type = 'T2'
      order by queue asc
      `);
    const menus = result.rows;
    const menuTree = buildMenuTree(menus);
    res.json(menuTree);
  } catch (error) {
    console.error("Error fetching Menus:", error);
    res.status(500).json({ error: "Failed to fetch menus" });
  }
});

//Endpoint untuk mengambil database Menu Dashboard
app.get("/api/dashMenu", async (req, res) => {
  try {
    const result = await pool.query(`
      select id, name, path, icon, parent_id
      from menu
      where is_active = true
      and type = 'T3'
      order by queue asc
      `);
    const menus = result.rows;
    const menuTree = buildMenuTree(menus);
    res.json(menuTree);
  } catch (error) {
    console.error("Error fetching Dashboard Menus:", error);
    res.status(500).json({ error: "Failed to fetch Dash Menus" });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is Running on Port ${PORT}`);
});
