import mongoose from "mongoose";

export const init = async ()=> {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Conectado a la DB")
    } catch {
        console.error("Error no se pudo conectar a la DB")
    }
}