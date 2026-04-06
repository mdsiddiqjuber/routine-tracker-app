require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("./models/db.js");
const taskRoutes = require("./routes/taskRoutes.js");
const authRoutes = require("./routes/authRoutes.js");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
  origin: "*",
  credentials: true,
}));
app.use(cookieParser());
app.use("/auth", authRoutes);
app.use("/task", taskRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});