import express from "express"
import adminController from "../controller/adminController.js"

const router = express.Router ();

router.route("/")
.get(adminController.getAllAdmin)

router.route("/:id")
.put(adminController.updateAdmin)
.delete(adminController.deleteAdmin)

export default router