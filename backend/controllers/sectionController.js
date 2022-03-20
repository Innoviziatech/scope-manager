const Section = require("../models/sectionModel");
const factory = require("./handleFactory");

exports.setPageId = (req, res, next) => {
  //! allow nested routes
  if (!req.body.page) req.body.page = req.params.pageId;

  next();
};

exports.getAllSections = factory.getAll(Section);
exports.getSection = factory.getOne(Section, {
  path: "selectors subSections",
});
exports.createSection = factory.createOne(Section);
exports.updateSection = factory.updateOne(Section);
exports.deleteSection = factory.deleteOne(Section);
