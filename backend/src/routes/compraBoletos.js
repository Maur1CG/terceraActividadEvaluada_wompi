import express from "express"
import compraBoletosController from "../controller/CompraBoletosController.js"

const router = express.Router();

router.get("/", compraBoletosController.getCompra)
router.post("/id", compraBoletosController.insertCompra)
router.delete("/id", compraBoletosController.deleteCompra)
router.put("/:id", compraBoletosController.updateCompra)

export default router