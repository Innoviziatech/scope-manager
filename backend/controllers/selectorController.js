const Selector = require("../models/selectorModel");
const factory = require("./handleFactory");

exports.getAllSelectors = factory.getAll(Selector);

exports.setSectionId = (req, res, next) => {
  //! allow nested routes
  if (!req.body.section)
    req.body.section = req.params.sectionId ? req.params.sectionId : "";

  next();
};
exports.setSubSectionId = (req, res, next) => {
  //! allow nested routes
  if (!req.body.subSection)
    req.body.subSection = req.params.subSectionId
      ? req.params.subSectionId
      : "";

  next();
};

exports.getSelector = factory.getOne(Selector);
exports.createSelector = factory.createOne(Selector);
exports.updateSelector = factory.updateOne(Selector);
exports.deleteSelector = factory.deleteOne(Selector);
