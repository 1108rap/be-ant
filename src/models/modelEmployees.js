//Import Library
const pool = require("../config/database/pool");

//Main Processs
const getAllEmployees = async () => {
  const result = await pool.query(`
    SELECT *
    FROM employees
    `);
  return result.rows;
};

//Export
module.exports = { getAllEmployees };
