import NaoEncontrado from "../erros/NaoEncontrado.js";
import { livros, autores } from "../models/index.js";

class LivroController {

  static listarLivros = async (req, res, next) => {
    try {
      const buscaLivros = livros.find();
      req.resultado = buscaLivros;
      next();
    } catch (erro) {
      next(erro);
    }
  };

  static listarLivroPorId = async (req, res, next) => {
    try {
      const id = req.params.id;

      const livroResultado = await livros.findById(id)
        .populate("autor", "nome")
        .exec();

      if (livroResultado !== null) {
        res.status(200).send(livroResultado);
      } else {
        next(new NaoEncontrado("Id do livro não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static cadastrarLivro = async (req, res, next) => {
    try {
      let livro = new livros(req.body);

      const livroResultado = await livro.save();

      res.status(201).send(livroResultado.toJSON());
    } catch (erro) {
      next(erro);
    }
  };

  static atualizarLivro = async (req, res, next) => {
    try {
      const id = req.params.id;
    
      const livroResultado = await livros.findByIdAndUpdate(id, {$set: req.body});

      console.log(livroResultado);
    
      if (livroResultado !== null) {
        res.status(200).send({message: "Livro atualizado com sucesso"});
      } else {
        next(new NaoEncontrado("Id do livro não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static excluirLivro = async (req, res, next) => {
    try {
      const id = req.params.id;

      const livroResultado = await livros.findByIdAndDelete(id);

      console.log(livroResultado);
      
      if (livroResultado !== null) {
        res.status(200).send({message: "Livro removido com sucesso"});
      } else {
        next(new NaoEncontrado("Id do livro não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static listarLivroPorFiltro = async (req, res, next) => {
    try {
      const busca = await processaBusca(req.query);

      if(busca === null) {
        const livrosResultado = await livros
          .find(busca)
          .populate("autor");

        req.resultado = livrosResultado;

        next();
      }else{
        res.status(200).send("Nenhum livro encontrado com esse autor.");
      }
    } catch (erro) {
      next(erro);
    }
  };
}

async function processaBusca(parametros) {
  const {editora, titulo, minPaginas, maxPaginas, nomeAutor} = parametros;
  let busca = {};
  
  if(editora) busca.editora = {$regex: editora, $options: "i"};
  if(titulo) busca.titulo = {$regex: titulo, $options: "i"};

  if(minPaginas || maxPaginas) busca.numeroPaginas = {};

  // gte = greater than or equal (maior ou igual)
  if(minPaginas) busca.numeroPaginas.$gte = minPaginas;
  // lte = less than or equal (menor ou igual)
  if(maxPaginas) busca.numeroPaginas.$lte = maxPaginas;

  if(nomeAutor) {
    const autor = await autores.findOne({nome: {$regex: nomeAutor, $options: "i"}});
    if(autor !== null){ 
      busca.autor = autor._id;
    } else {
      busca = null;
    }
  }
  return busca;
}

export default LivroController;