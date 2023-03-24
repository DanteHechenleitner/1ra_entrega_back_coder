import mongoose from "mongoose";

export const init = async ()=> {
    try {
        const URI= "mongodb+srv://Dante:Dante3284@cluster0.o6ehdpy.mongodb.net/ecommerce?retryWrites=true&w=majority"
        await mongoose.connect(URI)
        console.log("Conectado a la DB")
    } catch {
        console.error("Error no se pudo conectar a la DB")
    }
}