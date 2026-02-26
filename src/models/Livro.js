import mongoose from "mongoose";

const livroSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    titulo: { type: mongoose.Schema.Types.String, required: true },
    autor: { type: mongoose.Schema.Types.String, required: true },
    preco: { type: mongoose.Schema.Types.Number, required: true },
    pagina: { type: mongoose.Schema.Types.Number}
}, { versionKey: false });

const livros = mongoose.model('livros', livroSchema);

export default livros;