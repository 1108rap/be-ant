//Import Library
const modelEmployees = require("../models/modelEmployees");

//Main Processs
const getEmployees = async (req, res) => {
  try {
    const employees = await modelEmployees.getAllEmployees();
    // res.status(200).json({ success: true, data: employees });
    res.status(200).json(employees);
  } catch (err) {
    console.error("Error fetching employee data:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

//Export
module.exports = { getEmployees };
