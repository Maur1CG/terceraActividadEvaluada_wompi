import express from "express"
import compraBoletosController from "../controller/CompraBoletosController.js"
import { validationAuthCookie } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", validationAuthCookie(["Admin"]), compraBoletosController.getCompra)
router.post("/id",validationAuthCookie(["Cliente"]), compraBoletosController.insertCompra)
router.delete("/id",validationAuthCookie(["Admin"]), compraBoletosController.deleteCompra)
router.put("/:id",validationAuthCookie(["Admin"]), compraBoletosController.updateCompra)

export default router