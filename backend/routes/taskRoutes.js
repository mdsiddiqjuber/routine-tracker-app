const router = require("express").Router();
const { getAllTasks, createTask, taskComplete, editTask } = require("../controllers/taskController.js");

router.get("/", getAllTasks);

router.post("/add", createTask);

router.put("/complete/:id", taskComplete);

router.put("/edit/:id", editTask);

module.exports = router;