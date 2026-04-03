const router = require("express").Router();
const { getAllTasks, createTask, taskComplete, editTask, deleteTask } = require("../controllers/taskController.js");
const authMiddleware = require("../middlewares/authMiddleware.js");

router.use(authMiddleware);

router.get("/", getAllTasks);

router.post("/add", createTask);

router.put("/complete/:id", taskComplete);

router.put("/edit/:id", editTask);

router.delete("/delete/:id", deleteTask);

module.exports = router;