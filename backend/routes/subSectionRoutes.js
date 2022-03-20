const router = require("express").Router({ mergeParams: true });

const {
  getAllSubSections,
  createSubSection,
  updateSubSection,
  getSubSection,
  deleteSubSection,
  setSubSectionId,
} = require("../controllers/subSectionController");
const selectorRouter = require("./selectorRoutes");

router.use("/:subSectionId?/selectors", selectorRouter);

router
  .route("/")
  .get(getAllSubSections)
  .post(setSubSectionId, createSubSection);

router
  .route("/:id")
  .patch(updateSubSection)
  .get(getSubSection)
  .delete(deleteSubSection);

module.exports = router;
