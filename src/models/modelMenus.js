//Import Library
const pool = require("../config/database/pool");

//Main Process
const routes = async () => {
  const result = await pool.query(`
    SELECT *
    FROM menus
    WHERE is_active = true
    `);
  return result.rows;
};

const menuData = async () => {
  const result = await pool.query(`
    SELECT *
    FROM menus
    WHERE deleted_at is null
    `);
  return result.rows;
};

const NavbarHP = async () => {
  const result = await pool.query(`
    SELECT * 
    FROM menus
    WHERE is_active = true
    AND type = 'T1'
    ORDER BY queue asc 
    `);
  return result.rows;
};

const sidebarSL = async () => {
  const result = await pool.query(`
    SELECT * 
    FROM menus
    WHERE is_active = true
    AND type = 'T2'
    ORDER BY queue asc 
    `);
  return result.rows;
};

const sidebarDS = async () => {
  const result = await pool.query(`
    SELECT * 
    FROM menus
    WHERE is_active = true
    AND type = 'T3'
    ORDER BY queue asc 
    `);
  return result.rows;
};

// Export
module.exports = { routes, menuData, NavbarHP, sidebarSL, sidebarDS };
