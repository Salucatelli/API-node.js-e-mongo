/* eslint-disable indent */
import NaoEncontrado from "../errors/NaoEncontrado.js";
import editoras from "../models/Editora.js";

const editoraController = {
  listarEditoras: async (req, res, next) => {
    try {
      const data = await editoras.find();
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  },

  atualizarEditora: async (req, res, next) => {
    try {
      const data = await editoras.findOneAndUpdate({ _id: req.params.id }, req.body);
      if (data !== null) {
        res.status(201).send("Atualizado com sucesso!");
      } else {
        next(new NaoEncontrado("Id da Editora Não localizado!"));
      }
    } catch (error) {
      next(error);
    }
  },

  cadastrarEditora: async (req, res, next) => {
    try {
      let editora = new editoras(req.body);
      await editora.save();
      res.status(201).send({ mensagem: "Editora cadastrada com sucesso!" });
    } catch (error) {
      next(error);
    }
  },

  listarEditora: async (req, res, next) => {
    try {
      const id = req.params.id;
      let editora = await editoras.findById(id);
      if (editora !== null) {
        res.send(editora);
      } else {
        next(new NaoEncontrado("Id da Editora não localizado!"));
      }
    } catch (error) {
      next(error);
    }
  },

  excluirEditora: async (req, res, next) => {
    const id = req.params.id;
    try {
      const data = await editoras.findByIdAndDelete(id);
      if (data !== null) {
        res.status(200).send("Editora excluido com sucesso!");
      } else {
        next(new NaoEncontrado("Id da Editora não localizado!"));
      }
    } catch (error) {
      next(error);
    }
  }
};

export default editoraController;