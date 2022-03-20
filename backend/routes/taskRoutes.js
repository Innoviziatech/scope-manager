const router = require("express").Router();

const {
  getAllTasks,
  createTask,
  updateTask,
  getTask,
  deleteTask,
} = require("../controllers/taskController");

router.route("/").get(getAllTasks).post(createTask);

router.route("/:id").patch(updateTask).get(getTask).delete(deleteTask);

module.exports = router;
