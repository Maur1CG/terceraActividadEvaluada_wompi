import mongoose, { Schema, model} from "mongoose"

const compraBoletosSchema = new Schema({
    clienteId: {
        type: mongoose.Types.ObjectId,
        ref: "Client"
    },
    quantity: {type: String},
    purchaseDate: {type: Date},
    total: {type: Number},
    paymentStatus: {type: Number},
    transaccionId: {
        type: mongoose.Types.ObjectId,
        ref: "Wompi"
    },
},{
    timestamps: true,
    strict: false
})

export default model ("CompraBoletos", compraBoletosSchema)