import NaoEncontrado from "../erros/NaoEncontrado.js";
import { livros, autores } from "../models/index.js";

const CAMPOS_EDITAVEIS_LIVRO = ["titulo", "autor", "editora", "numeroPaginas"];

function filtrarCamposEditaveis(dados, camposPermitidos) {
  const dadosFiltrados = {};
  for (const campo of camposPermitidos) {
    if (Object.prototype.hasOwnProperty.call(dados, campo)) {
      dadosFiltrados[campo] = dados[campo];
    }
  }
  return dadosFiltrados;
}

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
      const dadosAtualizados = filtrarCamposEditaveis(req.body, CAMPOS_EDITAVEIS_LIVRO);

      const livroResultado = await livros.findByIdAndUpdate(id, {$set: dadosAtualizados}, {runValidators: true});
    
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

      // busca === null significa que o autor pesquisado não existe
      if (busca !== null) {
        // Passa a consulta (sem executar) para o middleware de paginação
        req.resultado = livros.find(busca).populate("autor", "nome");
        next();
      } else {
        res.status(200).json([]);
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

  const minPaginasNumero = Number(minPaginas);
  const maxPaginasNumero = Number(maxPaginas);
  const minPaginasValido = minPaginas !== undefined && !Number.isNaN(minPaginasNumero);
  const maxPaginasValido = maxPaginas !== undefined && !Number.isNaN(maxPaginasNumero);

  if(minPaginasValido || maxPaginasValido) busca.numeroPaginas = {};

  // gte = greater than or equal (maior ou igual)
  if(minPaginasValido) busca.numeroPaginas.$gte = minPaginasNumero;
  // lte = less than or equal (menor ou igual)
  if(maxPaginasValido) busca.numeroPaginas.$lte = maxPaginasNumero;

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