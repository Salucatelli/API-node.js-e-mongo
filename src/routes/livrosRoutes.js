import express from "express";
import livroController from "../controllers/livrosController.js";
import paginar from "../middlewares/paginar.js"

const router = express.Router();

//GET Routes
router.get("/livros", livroController.listarLivros, paginar);

router.get("/livros/busca", livroController.listarPorFiltro, paginar);

router.get("/livros/:id", livroController.listarLivro);


//POST Routes
router.post("/livros", livroController.cadastrarLivro);

//PUT Routes
router.put("/livros/:id", livroController.atualizarLivro);

//DELETE Routes
router.delete("/livros/:id", livroController.excluirLivro);


export default router;
