import { UsuarioController } from "../controllers/UsuarioController.js";
import { autenticarToken, verficarAcesso } from "../middlewares/authMiddleware.js";
import { autorizarPapeis } from "../middlewares/autorizarPapeis.js";
import express from "express";
const router = express.Router();

//rotas públicas
router.post("/",UsuarioController.criarUsuario);
router.post("/login", UsuarioController.loginUsuario);

//rota privada
router.get("/", autenticarToken, autorizarPapeis("ADMIN"), UsuarioController.listarUsuarios);


router.get("/:id", autenticarToken, autorizarPapeis("ADMIN", "USER"), verficarAcesso, UsuarioController.buscarPorId);
router.put("/:id",  autenticarToken, autorizarPapeis("ADMIN", "USER"), verficarAcesso, UsuarioController.atualizarUsuario);
router.delete("/:id",  autenticarToken, autorizarPapeis("ADMIN", "USER"), verficarAcesso, UsuarioController.deletarUsuario);

export default router;

