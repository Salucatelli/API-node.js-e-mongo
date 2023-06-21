/* eslint-disable indent */
import NaoEncontrado from "../errors/NaoEncontrado.js";
import { autores, livros } from "../models/index.js";

const livroController = {
  listarLivros: async (req, res, next) => {
    try {
      const buscaLivros = livros.find()
        .populate("autor")
        .populate("editora");;

      req.resultado = buscaLivros;

      next();
    } catch (error) {
      next(error);
    }
  },

  atualizarLivro: async (req, res, next) => {
    try {
      const data = await livros.findOneAndUpdate({ _id: req.params.id }, req.body);
      if (data !== null) {
        console.log("teste");

        res.status(201).send("Atualizado com sucesso!");
      } else {
        next(new NaoEncontrado("Id do livro não localizado!"))
      }
    } catch (error) {
      console.log("teste2")
      next(error);
    }
  },

  cadastrarLivro: async (req, res, next) => {
    try {
      let livro = new livros(req.body);
      const resultado = await livro.save();
      res.status(201).send({ mensagem: "Livro cadastrado com sucesso!" });
    } catch (error) {
      next(error);
    }
  },

  listarLivro: async (req, res, next) => {
    try {
      const id = req.params.id;
      let livro = await livros.findById(id).populate("autor").populate("editora");
      if (livro === null) {
        next(new NaoEncontrado("Id do livro não localizado!"))
      } else {
        res.status(200).send(livro);
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  excluirLivro: async (req, res, next) => {
    const id = req.params.id;
    try {
      const data = await livros.findByIdAndDelete(id);
      if (data !== null) {
        res.status(200).send("Livro excluido com sucesso!");
      } else {
        next(new NaoEncontrado("Id do livro não localizado!"))
      }

    } catch (error) {
      next(error);
    }
  },

  listarPorFiltro: async (req, res, next) => {

    try {
      const busca = await processaBusca(req.query);

      if (busca !== null) {
        const livro = livros.find(busca)
          .populate("autor")
          .populate("editora");

        req.resultado = livro;

        next();
      } else {
        res.status(200).send({ message: "Não encontramos o que você procurou." });
      }
    } catch (error) {
      next(error);
    }
  }
};

async function processaBusca(query) {
  const { editora, titulo, maxPaginas, minPaginas, nomeAutor } = query;

  let busca = {};

  if (editora) busca.editora = editora;
  if (titulo) busca.titulo = { $regex: titulo, $options: "i" };
  if (minPaginas && maxPaginas) {
    busca.numeroPaginas = {
      $gte: minPaginas,
      $lte: maxPaginas
    }
  } else {
    if (minPaginas) busca.numeroPaginas = { $gte: minPaginas };
    if (maxPaginas) busca.numeroPaginas = { $lte: maxPaginas };
  }

  if (nomeAutor) {
    const autor = await autores.findOne({ nome: { $regex: nomeAutor, $options: "i" } });

    if (autor !== null) {
      busca.autor = autor._id;
    } else {
      busca = null;
    }
  }

  return busca;
}

export default livroController;
