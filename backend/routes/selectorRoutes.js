const router = require("express").Router({ mergeParams: true });
const {
  getAllSelectors,
  createSelector,
  getSelector,
  updateSelector,
  deleteSelector,
  setSectionId,
} = require("../controllers/selectorController");
const { setSubSectionId } = require("../controllers/subSectionController");

router
  .route("/")
  .get(getAllSelectors)
  .post(setSectionId, setSubSectionId, createSelector);
router
  .route("/:id")
  .get(getSelector)
  .patch(updateSelector)
  .delete(deleteSelector);

module.exports = router;
