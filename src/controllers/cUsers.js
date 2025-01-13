//Import Library
const modelUsers = require("../models/modelUsers");
const ExcelJS = require("exceljs");
const fs = require("fs");
const path = require("path");
const os = require("os");

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
    // Get Data Employee Ref
    const employees = await modelUsers.refEmpForUsers();

    // Create Workbook Excel
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Users");

    // Create Sheet Refrence
    const refSheet = workbook.addWorksheet("Ref");
    refSheet.state = "veryHidden";

    // Add Refrence Data
    refSheet.addRow(["Employee Name", "Employee ID"]);
    employees.forEach((employee) => {
      refSheet.addRow([employee.name, employee.id]);
    });

    // Header
    worksheet.columns = [
      { header: "id", key: "id" },
      { header: "Employee_id", key: "employee_id" },
      { header: "Name", key: "name" },
      { header: "Username", key: "username" },
      { header: "Password", key: "password" },
    ];

    // Create Data validation Name Employee
    worksheet.getColumn("name").eachCell((cell, rowNumber) => {
      if (rowNumber > 1) {
        cell.dataValidation = {
          type: "list",
          allowBlank: true,
          formula1: `Ref!$A$2:$A$${employees.length + 1}`,
        };
      }
    });

    //Lookup Employee ID From Name
    worksheet.getColumn("employee_id").eachCell((cell, rowNumber) => {
      if (rowNumber > 1) {
        cell.value = {
          formula: `IFERROR(VLOOKUP(C${rowNumber},Ref!$A$2:$B$${
            employees.length + 1
          },2,FALSE),"")`,
        };
        cell.style = { locked: true };
      }
    });

    // Protect ID Edited
    worksheet.protect("", {
      selectLockedCells: true,
      selectUnlockedCells: true,
    });

    // Save worksheet to file
    const downloadDir = path.join(os.homedir(), "Downloads");
    const createDate = new Date().toISOString();
    const filePath = path.join(
      downloadDir,
      `./Template_Users_${createDate}.xlsx`
    );
    await workbook.xlsx.writeFile(filePath);
    console.log(`Excel file successfully created at ${filePath}`);
  } catch (err) {
    console.error("Error generate Excel file:", err);
  }
};
module.exports = { getUsers, addUsers, refEmpUsers, deleteUser, templateUsers };
