const router = require("express").Router();
const projectController = require("../controllers/projectController");
const pageRouter = require("./pageRoutes");

router.use("/:projectId/pages", pageRouter);

router
  .route("/")
  .get(projectController.getAllProjects)
  .post(projectController.createProject);

router
  .route("/:id")
  .patch(projectController.updateProject)
  .get(projectController.getProject)
  .delete(projectController.deleteProject);

module.exports = router;
