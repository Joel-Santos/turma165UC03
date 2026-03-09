import db from "../config/db.js";

export class AlunoModel{
    static listarTodos(){
        const sql = `select * from alunos order by id`;
        return db.query(sql);
    }
    static criar(nome, curso, nota){
        const sql = `insert into alunos (nome, curso, nota) values($1, $2, $3)`;
        return db.query(sql, [nome, curso, nota]);
    }
    static buscarPorId(id){
        const sql = `select * from alunos where id = $1`;
        return db.query(sql, [id]);
    }
    static deletar(id){
        const sql = `delete from alunos where id = $1`;
        return db.query(sql, [id]);
    }
    static atualizar(id, nome, curso, nota){
        const sql = `update alunos set nome = $1, curso = $2, nota = $3 where id = $4`;
        return db.query(sql,[nome, curso, nota, id]);
    }

    static buscarPorCurso(curso){
        const sql = `select * from alunos where curso = $1`;
        return db.query(sql, [curso]);
    }


}