import express from "express";

const router = express.Router();

import employeeController from "../controllers/employeeController.js";

router.route("/")
.get(employeeController.getEmployees);
router.route("/:id")
.put(employeeController.updateEmployee)
.delete(employeeController.deleteEmployee);

export default router;