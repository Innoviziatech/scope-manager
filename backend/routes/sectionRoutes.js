const router = require("express").Router({ mergeParams: true });

const {
  getAllSections,
  createSection,
  updateSection,
  getSection,
  deleteSection,
  setPageId,
} = require("../controllers/sectionController");
// const subSectionRouter = require("./subSectionRoutes");
const selectorRouter = require("./selectorRoutes");

// router.use("/:sectionId/subSections", subSectionRouter);
router.use("/:sectionId?/selectors", selectorRouter);

router.route("/").get(getAllSections).post(setPageId, createSection);

router.route("/:id").patch(updateSection).get(getSection).delete(deleteSection);

module.exports = router;
