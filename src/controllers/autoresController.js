import NaoEncontrado from "../errors/NaoEncontrado.js";
import { autores } from "../models/index.js";

const autorController = {
    listarAutores: async (req, res, next) => {
        try {
            const data = autores.find();

            req.resultado = data;

            next();
        } catch (error) {
            next(error);
        }
    },

    atualizarAutor: async (req, res, next) => {
        try {
            const data = await autores.findOneAndUpdate({ _id: req.params.id }, req.body);

            if (data !== null) {
                res.status(201).send("Atualizado com sucesso!");
            } else {
                next(new NaoEncontrado("Id do Autor não localizado!"));
            }

        } catch (error) {
            next(error);
        }
    },

    cadastrarAutor: async (req, res, next) => {
        try {
            let autor = new autores(req.body);
            await autor.save();
            res.status(201).send({ mensagem: "Autor cadastrado com sucesso!" });
        } catch (error) {
            next(error);
        }
    },

    listarAutor: async (req, res, next) => {
        try {
            const id = req.params.id;
            const autor = await autores.findById(id);

            if (autor !== null) {
                res.status(200).send(autor);
            } else {
                next(new NaoEncontrado("Id do Autor não localizado!"))
            }

        } catch (error) {
            next(error);
        }
    },

    excluirAutor: async (req, res, next) => {
        const id = req.params.id;
        try {
            const data = await autores.findByIdAndDelete(id);
            if (data !== null) {
                res.status(200).send("Autor excluido com sucesso!");
            } else {
                next(new NaoEncontrado("Id do Autor não localizado!"))
            }

        } catch (error) {
            next(error);
        }
    }
};

export default autorController;