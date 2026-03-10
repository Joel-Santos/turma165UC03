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
        <>
            <form onSubmit={handleSubmit}>
                <h2>{alunoEmEdicao ? "Editar Aluno" : "Cadastrar Aluno"}</h2>
                <input
                    type="text"
                    placeholder="Nome do Aluno"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Curso"
                    value={curso}
                    onChange={(e) => setCurso(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Nota"
                    step="0.01"
                    value={nota}
                    onChange={(e) => setNota(e.target.value)}
                />
                <button type="submit"> {alunoEmEdicao ? "Atualizar" : "Cadastrar"} </button>
                {
                    alunoEmEdicao && (
                        <button onClick={onCancelar}>Cancelar</button>
                    )
                }
            </form>
        </>
    )


}