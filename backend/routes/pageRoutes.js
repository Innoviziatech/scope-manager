const router = require("express").Router({ mergeParams: true });
const {
  getAllPages,
  createPage,
  updatePage,
  getPage,
  deletePage,
  setProjectId,
  // uploadScreenShot,
  // uploadScreenShotInCloud,
  // upload,
} = require("../controllers/pageController");
const sectionRouter = require("./sectionRoutes");

router.use("/:pageId/sections", sectionRouter);

router.route("/").get(getAllPages).post(
  setProjectId,
  // uploadScreenShot,
  // upload.array("screenShot"),
  // uploadScreenShotInCloud,
  createPage
);
router.route("/:id").get(getPage).patch(updatePage).delete(deletePage);

module.exports = router;
