import express from "express"
import clientController from "../controller/clientController.js"

const router = express.Router ();

router.route("/")
.get(clientController.getAllClients)

router.route("/:id")
.put(clientController.updateClient)
.delete(clientController.deleteClient)

export default router