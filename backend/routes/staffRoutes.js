const router = require("express").Router();
const {
  getStaff,
  getStaffMember,
  createStaffMember,
  updateStaffMember,
  deleteStaffMember,
} = require("../controllers/staffController");

router.route("/").get(getStaff).post(createStaffMember);

router
  .route("/:id")
  .patch(updateStaffMember)
  .get(getStaffMember)
  .delete(deleteStaffMember);

module.exports = router;
