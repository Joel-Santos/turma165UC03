import { AlunoModel } from "../models/AlunoModel.js";

export class AlunoController {

    static async listar(req, res) {
        try {
            const result = await AlunoModel.listarTodos();
            if (!result.rows || result.rows.length === 0) {
                res.status(404).json({ msg: "Nenhum aluno no banco." });
                return;
            }
            res.status(200).json({ msg: "Alunos encontrados!", alunos: result.rows });
        } catch (error) {
            res.status(500).json({ msg: "Erro interno ao listar os alunos", erro: error.message });
        }
    }
    static async buscarPorId(req, res) {
        try {
            const { id } = req.params;
            const result = await AlunoModel.buscarPorId(id);
            if (result.rows.length === 0) {
                res.status(404).json({ msg: "Nenhum aluno encontrado com este ID" });
                return;
            }
            res.status(200).json({ msg: "Aluno encontrado", Aluno: result.rows[0] });
        } catch (error) {
            res.status(500).json({ msg: "Erro interno ao buscar aluno por ID", erro: error.message });
        }
    }
    static async criar(req, res) {
        try {
            const { nome, curso, nota } = req.body;
            if (!nome || !curso || !nota) {
                res.status(400).json({ msg: "Todos os campos devem ser preenchidos" });
                return;
            }
            const result = await AlunoModel.criar(nome, curso, nota);
            if (result) {
                res.status(201).json({ msg: "Aluno cadastrado com sucesso!" });
                return;
            }
        } catch (error) {
            res.status(500).json({ msg: "Erro interno ao cadastrar o aluno", erro: error.message });
        }
    }

    static async deletar(req, res) {
        try {
            const { id } = req.params;
            const result = await AlunoModel.deletar(id);
            if (result.rowCount === 0) {
                res.status(404).json({ msg: "Nenhum aluno com este id" });
                return;
            }
            res.status(200).json({ msg: "Aluno deletado com sucesso!" });
        } catch (error) {
            res.status(500).json({ msg: "Erro interno ao deletar aluno", erro: error.message });
        }
    }
    static async atualizar(req, res) {
        try {
            const {id} = req.params;
            const {nome, curso, nota} = req.body;
            if(!nome || !curso || !nota){
                res.status(400).json({msg: "Todos os campos devem ser preenchidos"});
                return;
            }
            const result = await AlunoModel.atualizar(id, nome, curso, nota);
            if(result.rowCount === 0){
                res.status(404).json({msg: "Nenhum aluno com este id"});
                return;
            }
            res.status(201).json({msg: "Aluno atualizado com sucesso"});
        } catch (error) {
            res.status(500).json({msg: "Erro interno ao atualizar aluno", erro: error.message});
        }
    }
    static async buscarPorCurso(req, res){
        try {
            const {curso} = req.params;
            const result = await AlunoModel.buscarPorCurso(curso);
            if(result.rowCount === 0){
                res.status(404).json({msg: "Nenhum curso com este nome"});
                return
            }
            res.status(200).json({msg: "Alunos encontrados", alunos: result.rows});
        } catch (error) {
            res.status(500).json({msg: "Erro interno ao buscar alunos por curso", erro: error.message});
        }
    }

}