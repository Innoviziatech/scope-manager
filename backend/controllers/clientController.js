const Client = require("../models/clientModel");
const factory = require("./handleFactory");

exports.getAllClients = factory.getAll(Client);
exports.getClient = factory.getOne(Client, {
  path: "projects",
  select: "-staff projectName -client",
});
exports.createClient = factory.createOne(Client);
exports.updateClient = factory.updateOne(Client);
exports.deleteClient = factory.deleteOne(Client);
