import { UsuarioModel } from "../models/UsuarioModel.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";

export class UsuarioController {
    static async listarUsuarios(req, res) {
        try {
            const result = await UsuarioModel.listarUsuarios();
            if (result.rows.length === 0) {
                res.status(404).json({ msg: "Nenhum usuário cadastrado" });
                return;
            }
            res.status(200).json({ msg: "Usuários encontrados!", usuarios: result.rows });
        } catch (error) {
            res.status(500).json({ msg: "Erro interno ao listar os usuários", erro: error.message });
        }
    }
    static async criarUsuario(req, res) {
        try {
            const { nome, email, senha, role } = req.body;
            if (!nome || !email || !senha) {
                res.status(400).json({ msg: "Todos os campos devem ser preenchidos!" });
                return;
            }
            const existente = await UsuarioModel.buscarPorEmail(email);
            if (existente.rows.length > 0) {
                res.status(400).json({ msg: "Email inválido, já existente!" });
                return;
            }
            const senhaHash = await bcrypt.hash(senha, parseInt(process.env.SALT));
            const id = uuidv4();
            if (role) {
                await UsuarioModel.criarUsuario(id, nome, email, senhaHash, role);
                res.status(201).json({ msg: "Usuário admin criado com sucesso" })
                return
            }
            await UsuarioModel.criarUsuario(id, nome, email, senhaHash, "USER");
            res.status(201).json({ msg: "Usuário criado com sucesso!" });
        } catch (error) {
            res.status(500).json({ msg: "Erro interno ao cadastrar usuário", erro: error.message });
        }
    }
    static async buscarPorId(req, res){
        try {
            const {id} = req.params;
            const result = await UsuarioModel.buscarPorId(id);
            const usuario = result.rows[0];
            if(!usuario){
                res.status(404).json({msg: "Usuário não encontrado!"});
                return;
            }
            res.status(200).json({msg: "Usuário encontrado", usuario});
        } catch (error) {
            res.status(500).json({msg: "Erro interno ao buscar usuário", erro: error.message});
        }
    }
}
