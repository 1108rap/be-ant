//Import Library
const modelUsers = require("../models/modelUsers");
const ExcelJS = require("exceljs");
const fs = require("fs");
const path = require("path");

//Main Processs
const getUsers = async (req, res) => {
  try {
    const users = await modelUsers.getAllUsers();
    // res.status(200).json({ success: true, data: users });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const addUsers = async (req, res) => {
  //Source
  const { employee_id, username, password } = req.body;

  // Validasi Input required
  if (!employee_id || !username || !password) {
    return res
      .status(400)
      .json({ error: "Employee, Username, Password are required" });
  }

  // Process
  try {
    const newUsers = await modelUsers.createUsers(
      employee_id,
      username,
      password
    );
    res.status(201).json({ success: true, data: newUsers });
  } catch (err) {
    if (err.code === "23505") {
      return res
        .status(400)
        .json({ error: "Duplicate data", message: err.detail });
    }
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

const refEmpUsers = async (req, res) => {
  try {
    const refemp = await modelUsers.refEmpForUsers();
    // res.status(200).json({ success: true, data: refemp });
    res.status(200).json(refemp);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  const deleted_at = new Date().toISOString();
  try {
    const response = await modelUsers.removeUser(deleted_at, id);
    if (!response) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted", response });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Unfinish
const templateUsers = async (req, res) => {
  try {
    const employees = (await modelUsers.refEmpForUsers()).map(
      (emp) => `${emp.name}`
    );

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Template");

    worksheet.columns = [
      { header: "id", key: "id", width: 15 },
      { header: "Username", key: "username", width: 30 },
      { header: "Employee_id", key: "employee_id", width: 30 },
    ];

    worksheet.getColumn("employee_id").eachCell((cell, rowNumber) => {
      if (rowNumber > 1) {
        cell.dataValidation = {
          type: "list",
          allowBlank: true,
          formulae: [`"${employees.join(",")}"`],
          showErrorMessage: true,
          error: "Invalid choice, select from the list",
        };
      }
    });

    const filePath = path.join(__dirname, "users_.xlsx");
    await workbook.xlsx.writeFile(filePath);

    res.download(filePath);
  } catch (err) {}
};
module.exports = { getUsers, addUsers, refEmpUsers, deleteUser };
