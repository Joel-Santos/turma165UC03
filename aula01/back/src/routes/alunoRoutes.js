import { AlunoController } from "../controllers/AlunoController.js";
import express from "express";
const router = express.Router();

router.get("/", AlunoController.listar);
router.get("/:id", AlunoController.buscarPorId);
router.post("/", AlunoController.criar);
router.delete("/:id", AlunoController.deletar);
router.put("/:id", AlunoController.atualizar);
router.get("/curso/:curso", AlunoController.buscarPorCurso);



export default router;
