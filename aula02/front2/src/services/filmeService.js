import api from "./api.js";

export function listarFilmes() {
  return api.get("/filmes");
}

export function criarFilme(dados) {
  return api.post("/filmes", dados);
}

export function atualizarFilme(id, dados) {
  return api.put(`/filmes/${id}`, dados);
}

export function deletarFilme(id) {
  return api.delete(`/filmes/${id}`);
}