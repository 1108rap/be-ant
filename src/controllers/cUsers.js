//Import Library
const modelUsers = require("../models/modelUsers");

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
  const { employe_id, username, password } = req.body;
  const createAt = new Date().toISOString();

  // Validasi Input required
  if (!employe_id || !username || !password) {
    return res
      .status(400)
      .json({ error: "Employee, Username, Password are required" });
  }

  // Process
  try {
    const newUsers = await modelUsers.createUsers(
      employe_id,
      username,
      password,
      createAt
    );
    res.status(201).json({ success: true, data: newUsers });
  } catch (err) {
    if (err.code === "23505") {
      return res
        .status(400)
        .json({ error: "Duplicate date", message: err.detail });
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
module.exports = { getUsers, addUsers, refEmpUsers };
