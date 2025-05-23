import express from "express";

const router = express.Router();

import clientController from "../controllers/clientController.js";


router.route("/")
.get(clientController.getClients);
router.route("/:id")
.put(clientController.updateClient)
.delete(clientController.deleteClients);

export default router;
