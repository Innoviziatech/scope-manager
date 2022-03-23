const router = require("express").Router({ mergeParams: true });
const {
  getAllPages,
  createPage,
  updatePage,
  getPage,
  deletePage,
  setProjectId,
  uploadScreenShots,
  uploadScreenShotsOnCloudinary,
} = require("../controllers/pageController");
const sectionRouter = require("./sectionRoutes");

router.use("/:pageId/sections", sectionRouter);

router
  .route("/")
  .get(getAllPages)
  .post(setProjectId, uploadScreenShotsOnCloudinary, createPage);
router
  .route("/:id")
  .get(getPage)
  .put(uploadScreenShotsOnCloudinary, updatePage)
  .delete(deletePage);

module.exports = router;
