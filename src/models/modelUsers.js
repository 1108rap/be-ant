//Import Library
const { SELECT } = require("sequelize/lib/query-types");
const pool = require("../config/database/pool");
const bcrypt = require("bcrypt");

//Main Process
const getAllUsers = async () => {
  const result = await pool.query(
    `SELECT * 
    FROM users 
    WHERE deleted_at is null`
  );
  return result.rows;
};

const createUsers = async (employee_id, username, password, created_at) => {
  // Encrypt Password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Process
  const result = await pool.query(
    `INSERT INTO users (employees_id, username, password, created_at) 
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
    WHERE id NOT IN(SELECT employee_id FROM users)
    `);
  return result.rows;
};

module.exports = { getAllUsers, createUsers, refEmpForUsers };
