import express from "express";
import autorController from "../controllers/autoresController.js";
import paginar from "../middlewares/paginar.js";

const router = express.Router();

//GET Routes
router.get("/autores", autorController.listarAutores, paginar);

router.get("/autores/:id", autorController.listarAutor);



//POST Routes
router.post("/autores", autorController.cadastrarAutor);

//PUT Routes
router.put("/autores/:id", autorController.atualizarAutor);

//DELETE Routes
router.delete("/autores/:id", autorController.excluirAutor);


export default router;