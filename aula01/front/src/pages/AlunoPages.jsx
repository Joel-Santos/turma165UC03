import { useEffect, useState } from "react";
import "./alunoPages.css";
import ListaALunos from "../components/listaAlunos/ListaAlunos";
import FormAluno from "../components/formAluno/FormAluno";

import { listarAlunos, criarAluno, atualizarAluno, excluirAluno } from "../services/alunoService";

export default function AlunosPage() {
    const [alunos, setAlunos] = useState([]);
    const [alunoEmEdicao, setAlunoEmEdicao] = useState(null);

    async function carregarAlunos() {
        try {
            const response = await listarAlunos();
            setAlunos(response.data.alunos);
        } catch (error) {
            console.error("Erro ao carregar alunos:", error.message);
        }
    }
    useEffect(() => {
        carregarAlunos();
    }, []);

    async function salvarAluno(dados) {
        try {
            if (alunoEmEdicao) {
                await atualizarAluno(alunoEmEdicao.id, dados);
                setAlunoEmEdicao(null);
            } else {
                await criarAluno(dados);
            }
            await carregarAlunos();
        } catch (error) {
            console.error("Erro ao salvar aluno:", error);
        }
    }
    async function removerAluno(id) {
        try {
            await excluirAluno(id);
            await carregarAlunos();
        } catch (error) {
            console.error("Erro ao excluir aluno:", error);
        }
    }
    function editarAluno(aluno) {
        setAlunoEmEdicao(aluno);
    }
    function cancelarEdicao() {
        setAlunoEmEdicao(null);
    }
    return (
        <main className="page-shell">
            <section className="page-hero">
                <div>
                    <p className="page-eyebrow">Gestão acadêmica</p>
                    <h1 className="page-title">Cadastro de alunos</h1>
                    <p className="page-description">
                        Cadastre, edite e acompanhe os alunos em uma interface mais clara,
                        organizada e fácil de usar.
                    </p>
                </div>
                <div className="page-summary">
                    <span className="summary-label">Total de alunos</span>
                    <strong className="summary-value">{alunos.length}</strong>
                </div>
            </section>

            <div className="container">
                <FormAluno
                    onSalvar={salvarAluno}
                    alunoEmEdicao={alunoEmEdicao}
                    onCancelar={cancelarEdicao}
                />
                <ListaALunos
                    alunos={alunos}
                    onEditar={editarAluno}
                    onExcluir={removerAluno}
                />
            </div>
        </main>
    )
}

