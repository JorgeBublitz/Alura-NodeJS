import mongoose from "mongoose";

const livroSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    autor: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "autores",
        required: true
    },
    preco: { type: Number, required: true },
    pagina: { type: Number }
}, { versionKey: false });

export default mongoose.model("livros", livroSchema);