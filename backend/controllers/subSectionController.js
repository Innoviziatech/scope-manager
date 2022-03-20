const SubSection = require("../models/subSectionModel");
const factory = require("./handleFactory");

exports.getAllSubSections = factory.getAll(SubSection);

exports.setSubSectionId = (req, res, next) => {
  //! allow nested routes

  if (!req.body.section) req.body.section = req.params.sectionId;

  next();
};
exports.getSubSection = factory.getOne(SubSection);
exports.createSubSection = factory.createOne(SubSection);
exports.updateSubSection = factory.updateOne(SubSection);
exports.deleteSubSection = factory.deleteOne(SubSection);
