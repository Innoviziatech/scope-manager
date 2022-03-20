const Staff = require("../models/staffModel");
const factory = require("./handleFactory");

exports.getStaff = factory.getAll(Staff);
exports.getStaffMember = factory.getOne(Staff);
exports.createStaffMember = factory.createOne(Staff);
exports.updateStaffMember = factory.updateOne(Staff);
exports.deleteStaffMember = factory.deleteOne(Staff);
