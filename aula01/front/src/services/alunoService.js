import api from "./api";

export async function listarAlunos() {
    return await api.get("/alunos");    
}
export async function criarAluno(dados) {
    return await api.post("/alunos", dados);
}
export async function atualizarAluno(id, dados) {
    return await api.put(`/alunos/${id}`, dados);
}

export async function excluirAluno(id) {
    return await api.delete(`/alunos/${id}`);
}

export async function buscarAluno(id) {
    return await api.get(`/alunos/${id}`);
}


