import compraBoletos from "../models/compraboletos.js"

import compraBoletosModel from "../models/compraboletos.js"

const compraBoletosController = {};

compraBoletosController.getCompra = async (req, res) => {
    const compra = await compraBoletosModel.find();
    res.json(compra);
}

compraBoletosController.insertCompra = async (req, res) => {
    const {
        clientId,
        quantity,
        purchaseDate,
        total,
        paymentStatus,
        transactionId
    } = req.body;

    const compra = new compraBoletosModel({
        clientId,
        quantity,
        purchaseDate,
        total,
        paymentStatus,
        transactionId
    })

    await compra.save();
    res.json({message: "Compra guardada"})
}
compraBoletosController.deleteCompra = async (req, res) => {
    try {
        await compraBoletosController.findByAndDelete(req.params.id)
        res.json({message: "Compra eliminada"})
    } catch (error) {
       console.log("error"+error)
       return res.status(500).json({message: "Internal server error"})
    }
}

compraBoletosController.updateCompra = async (req, res) => {
    try {
        const {
        clientId,
        quantity,
        purchaseDate,
        total,
        paymentStatus,
        transactionId
        } = req.body

        const updateData = {
        clientId,
        quantity,
        purchaseDate,
        total,
        paymentStatus,
        transactionId
        }

        await compraBoletos.findByIdAndUpdate(
            req.params.id,
            updateData,
            {new:true}
        )
        return res.status(200).json({message: "Compra actualizada"})
    } catch (error) {
        console.log("error"+error)
        return res.status(500).json({message: "Internal server error"})
    }
}

export default compraBoletosController;