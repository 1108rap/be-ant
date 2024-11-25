const express = require("express");
const app = express();
const userRoutes = require("../routes/userRoute");
const cors = require("cors");
require("dotenv").config();

//Middleware
app.use(express.json());
app.use(cors());

//Route
app.use("/api", userRoutes);

//Server Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
