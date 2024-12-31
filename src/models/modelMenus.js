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
    ORDER BY type ASC, queue ASC
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

const createMenus = async (name, path, icon, type, parent_id, is_active) => {
  // Process system
  const created_at = new Date().toISOString();

  const resultQueue = await pool.query(
    `
    SELECT COALESCE(MAX(CAST(queue AS INTEGER)),0) AS max_position 
    FROM menus
    WHERE type = $1
    `,
    [type]
  );

  const newPosition = resultQueue.rows[0].max_position + 1;

  // Process
  const result = await pool.query(
    `
    INSERT INTO menus (name,path,icon,type,parent_id,is_active,created_at,queue)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
    `,
    [name, path, icon, type, parent_id, is_active, created_at, newPosition]
  );
  return result.rows;
};

const getParent = async () => {
  const result = await pool.query(`
    SELECT *,
    case
    WHEN type = 'T1' THEN 'Homepage Menu'
    WHEN type = 'T2' THEN 'Shoplist Menu'
    WHEN type = 'T3' THEN 'Dashboard Menu'
    ELSE type
    END AS grouptype
    FROM menus
    WHERE parent_id IS NULL
    ORDER BY type ASC, queue ASC
    `);
  return result.rows;
};

const removeMenu = async (id) => {
  // Process system
  const deleted_at = new Date().toISOString();

  // Process
  const result = await pool.query(
    `
    UPDATE menus 
    SET deleted_at = $1
    WHERE id = $2 RETURNING * 
    `,
    [deleted_at, id]
  );
  return result.rows;
};

// Export
module.exports = {
  routes,
  menuData,
  NavbarHP,
  sidebarSL,
  sidebarDS,
  createMenus,
  getParent,
  removeMenu,
};
