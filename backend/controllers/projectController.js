const Project = require("../models/projectModel");
const factory = require("./handleFactory");

exports.getAllProjects = factory.getAll(Project);
exports.getProject = factory.getOne(Project, {
  path: "pages",
  select: "-__v",
});
exports.createProject = factory.createOne(Project);
exports.updateProject = factory.updateOne(Project);
exports.deleteProject = factory.deleteOne(Project);
