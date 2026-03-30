const router = require("express").Router();
const { getAllTasks, createTask } = require("../controllers/taskController.js");

router.get("/", getAllTasks);

router.post("/add", createTask);

module.exports = router;