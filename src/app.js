require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const userRoutes = require("./routes/rUsers");
const menuRoutes = require("./routes/rMenus");
const empRoutes = require("./routes/rEmployees");

const app = express();

//Middleware Global
app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));

// V2
app.use(express.json());
// app.use("/api", userRoutes);
app.use(userRoutes);
app.use(menuRoutes);
app.use(empRoutes);

// Export
module.exports = app;
