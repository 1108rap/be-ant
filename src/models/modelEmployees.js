//Import Library
const pool = require("../config/database/pool");

//Main Processs
const getAllEmployees = async () => {
  const result = await pool.query(`
    SELECT e.*, r.name as profession
    FROM employees e
    LEFT JOIN roles r ON e.profession_id = r.id
    `);
  return result.rows;
};

//Export
module.exports = { getAllEmployees };
