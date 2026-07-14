import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/wompidb")

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