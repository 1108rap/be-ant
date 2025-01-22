//Import Library
const pool = require("../config/database/pool");
const bcrypt = require("bcrypt");

//Main Process
const getAllUsers = async () => {
  const result = await pool.query(
    `SELECT u.*,e.name,
    CASE 
    WHEN u.active_at IS NOT NULL THEN 'Active'
    ELSE 'Inactive'
    END AS status
    FROM users u
    LEFT JOIN employees e on e.id = u.employee_id
    WHERE u.deleted_at is null`
  );
  return result.rows;
};

const createUsers = async (employee_id, username, password) => {
  // Process System
  const created_at = new Date().toISOString();

  // Encrypt Password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Process
  const result = await pool.query(
    `INSERT INTO users (employee_id, username, password, created_at) 
    VALUES ($1,$2,$3,$4) 
    RETURNING *`,
    [employee_id, username, hashedPassword, created_at]
  );
  return result.rows;
};

const refEmpForUsers = async () => {
  const result = await pool.query(`
    SELECT id,name
    FROM employees
    WHERE id NOT IN(SELECT employee_id FROM users where deleted_at is null)
    `);
  return result.rows;
};

const removeUser = async (deleted_at, id) => {
  const result = await pool.query(
    `
    UPDATE users
    SET deleted_at = $1
    WHERE id = $2 RETURNING *
    `,
    [deleted_at, id]
  );
  return result.rows;
};

module.exports = { getAllUsers, createUsers, refEmpForUsers, removeUser };
