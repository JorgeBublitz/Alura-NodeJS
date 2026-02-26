import autor from "../models/Autor.js";

class AutorController {

    static async listarAutores(req, res) {
        try {
            const autores = await autor.find();
            res.status(200).json(autores);
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Erro ao listar os autores` });
        }
    };

    static async listarAutorPorId(req, res) {
        try {
            const id = req.params.id;
            const autorEncontrado = await autor.findById(id);
            res.status(200).json(autorEncontrado);
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Erro ao buscar autor por ID` });
        }
    };

    static async cadastrarAutor(req, res) {
        try {
            const autorNovo = await autor.create(req.body);
            res.status(201).json({ mensagem: 'Autor cadastrado com sucesso!', autor: autorNovo });
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Erro ao cadastrar autor` });
        }
    }

    static async atualizarAutor(req, res) {
        try {
            const id = req.params.id;
            const autorAtualizado = await autor.findByIdAndUpdate(id, { $set: req.body });
            res.status(200).json({ mensagem: 'Autor atualizado com sucesso!', autor: autorAtualizado });
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Erro ao atualizar autor` });
        }
    }

    static async deletarAutor(req, res) {
        try {
            const id = req.params.id;
            await autor.findByIdAndDelete(id);
            res.status(204).json({ mensagem: 'Autor deletado com sucesso!' });
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Erro ao deletar autor` });
        }
    }
};

export default AutorController;