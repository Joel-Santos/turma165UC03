import { FilmeController } from "../controllers/FilmeController.js";
import express from "express";
const router = express.Router();

router.get("/",FilmeController.listarFilmes);
router.get("/:id", FilmeController.buscarPorId);
router.post("/", FilmeController.criarFilme);
router.put("/:id", FilmeController.atualizarFilme);
router.delete("/:id", FilmeController.deletarFilme);

export default router;
