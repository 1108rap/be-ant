// Module Import
const express = require("express");
const cors = require("cors");
const pool = require("../config/db/pool");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const buildMenuTree = require("../services/menuTreeUtils");

const app = express();
app.use(cors());
app.use(bodyParser.json());

//Endpoint untuk Routes
app.get("/api/routes", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT *
      FROM menu
      WHERE is_active = true
      `);
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching Routes:", err);
    res.status(500).json({ error: "Failed to fetch Routes" });
  }
});

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
    res.status(500).json({ error: "Failed to fetch Navbar" });
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

// Endpoint untuk mengambil data user untuk table
app.get("/api/users", async (req, res) => {
  try {
    const result = await pool.query(`
      select *,
      CASE 
      WHEN active_at IS NOT NULL THEN 'active'
      ELSE 'inactive'
      END AS status
      from  "user" u
      left join employee e on e.id = u.employee_id 
      `);
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching data users :", err);
    res.status(500).json({ error: "Failed to fetch data users" });
  }
});

// Endpoint untuk mendapatkan semua users
app.get("/api/employees", async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM employee`);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Endpoint untuk data employee pada create users
app.get("/employeecreateusers", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT id, name
      FROM employee
      WHERE id NOT IN (select employee_id from "user")
      `);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// Enpoint untuk menambahkan data users
app.post("/adduser", async (req, res) => {
  const { employee_id, username, password } = req.body;

  if (!employee_id || !username || !password) {
    return res
      .status(400)
      .json({ error: "Employee ID, Username and Password are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      `INSERT INTO "user" (employee_id, username, password) VALUES ($1,$2,$3) RETURNING *`,
      [employee_id, username, hashedPassword]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is Running on Port ${PORT}`);
});
