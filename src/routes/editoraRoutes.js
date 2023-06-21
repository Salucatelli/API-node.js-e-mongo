import express from "express";
import editoraController from "../controllers/editoraController.js";

const router = express.Router();



//GET Routes
router.get("/editoras", editoraController.listarEditoras);

router.get("/editoras/:id", editoraController.listarEditora);



//POST Routes
router.post("/editoras", editoraController.cadastrarEditora);

//PUT Routes
router.put("/editoras/:id", editoraController.atualizarEditora);

//DELETE Routes
router.delete("/editoras/:id", editoraController.excluirEditora);


export default router;