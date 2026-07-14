import mongoose from "mongoose";
import { config } from "../backend/config.js"

mongoose.connect(config.db.uri);

const connection = mongoose.connection;

connection.on("disconnected", () => {
    console.error("Desconectado de MongoDB");
});

connection.once("open", () => {
    console.log("Conectado a MongoDB");
});

connection.on("error", (error) => {
    console.error("Error de conexión a MongoDB:"+ error);
});