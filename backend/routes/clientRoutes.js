const router = require("express").Router();
const clientController = require("../controllers/clientController");

router
  .route("/")
  .get(clientController.getAllClients)
  .post(clientController.createClient);

router
  .route("/:id")
  .patch(clientController.updateClient)
  .get(clientController.getClient)
  .delete(clientController.deleteClient);

module.exports = router;
