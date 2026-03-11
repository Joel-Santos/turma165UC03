import { useEffect, useState } from "react";

export default function FormAluno({ onSalvar, alunoEmEdicao, onCancelar }) {
    const [nome, setNome] = useState("");
    const [curso, setCurso] = useState("");
    const [nota, setNota] = useState("");
    useEffect(() => {
        if (alunoEmEdicao) {
            setNome(alunoEmEdicao.nome);
            setCurso(alunoEmEdicao.curso);
            setNota(alunoEmEdicao.nota);
        } else {
            setNome("");
            setCurso("");
            setNota("");
        }
    }, [alunoEmEdicao]);

    function handleSubmit(e) {
        e.preventDefault();
        onSalvar({ nome, curso, nota });
        setNome("");
        setCurso("");
        setNota("");
    }

    return (
        <section className="card form-card">
            <div className="card-header">
                <span className="card-tag">Formulário</span>
                <h2>{alunoEmEdicao ? "Editar aluno" : "Cadastrar aluno"}</h2>
                <p>
                    Preencha os campos abaixo para {alunoEmEdicao ? "atualizar os dados do aluno" : "registrar um novo aluno"}.
                </p>
            </div>

            <form className="student-form" onSubmit={handleSubmit}>
                <label className="field-group">
                    <span>Nome do aluno</span>
                    <input
                        type="text"
                        placeholder="Ex.: Ana Souza"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                    />
                </label>

                <label className="field-group">
                    <span>Curso</span>
                    <input
                        type="text"
                        placeholder="Ex.: Desenvolvimento Web"
                        value={curso}
                        onChange={(e) => setCurso(e.target.value)}
                        required
                    />
                </label>

                <label className="field-group">
                    <span>Nota</span>
                    <input
                        type="number"
                        placeholder="0,00"
                        step="0.01"
                        min="0"
                        value={nota}
                        onChange={(e) => setNota(e.target.value)}
                        required
                    />
                </label>

                <div className="form-actions">
                    <button className="button button-primary" type="submit">
                        {alunoEmEdicao ? "Salvar alterações" : "Cadastrar aluno"}
                    </button>
                    {alunoEmEdicao && (
                        <button className="button button-secondary" type="button" onClick={onCancelar}>
                            Cancelar edição
                        </button>
                    )}
                </div>
            </form>
        </section>
    )
}