import livro from "../models/Livro.js";

class LivroController {

    static async listarLivros(req, res) {
        try {
            const livros = await livro.find();
            res.status(200).json(livros);
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Erro ao listar os livros` });
        }
    };

    static async listarLivroPorId(req, res) {
        try {
            const id = req.params.id;
            const livroEncontrado = await livro.findById(id);
            res.status(200).json(livroEncontrado);
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Erro ao buscar livro por ID` });
        }
    };

    static async cadastrarLivro(req, res) {
        try {
            console.log("ID recebido:", req.body.autor);

            const autorEncontrado = await autor.findById(req.body.autor);

            console.log("Autor encontrado:", autorEncontrado);

            if (!autorEncontrado) {
            return res.status(400).json({
                message: "Autor não encontrado. Verifique o ID do autor."
            });
            }

            const novoLivro = await livros.create(req.body);
            res.status(201).json(novoLivro);

        } catch (erro) {
            res.status(500).json({ message: erro.message });
        }
    }

    static async atualizarLivro(req, res) {
        try {
            const id = req.params.id;
            const livroAtualizado = await livro.findByIdAndUpdate(id, { $set: req.body });
            res.status(200).json({ mensagem: 'Livro atualizado com sucesso!', livro: livroAtualizado });
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Erro ao atualizar livro` });
        }
    }

    static async deletarLivro(req, res) {
        try {
            const id = req.params.id;
            await livro.findByIdAndDelete(id);
            res.status(204).json({ mensagem: 'Livro deletado com sucesso!' });
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Erro ao deletar livro` });
        }
    }
};

export default LivroController;