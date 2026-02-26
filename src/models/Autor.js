import mongoose from "mongoose";

const autorSchema = new mongoose.Schema({
    nome: { type: mongoose.Schema.Types.String, required: true },
    nacionalidade: { type: mongoose.Schema.Types.String, required: true }
}, { versionKey: false });

const autor = mongoose.model("autores", autorSchema);

export default autor;