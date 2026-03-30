require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("./models/db.js");
const taskRoutes = require("./routes/taskRoutes.js");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/tasks", taskRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});