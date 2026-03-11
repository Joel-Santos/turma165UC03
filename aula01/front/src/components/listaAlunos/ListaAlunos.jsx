export default function ListaALunos({ alunos, onEditar, onExcluir }) {
    if (alunos.length === 0) {
        return (
            <section className="card list-card empty-state">
                <div className="card-header">
                    <span className="card-tag">Lista</span>
                    <h2>Alunos cadastrados</h2>
                    <p>Nenhum aluno foi cadastrado ainda. Use o formulário ao lado para começar.</p>
                </div>
            </section>
        );
    }

    return (
        <section className="card list-card">
            <div className="card-header">
                <span className="card-tag">Lista</span>
                <h2>Alunos cadastrados</h2>
                <p>Visualize os registros e faça ações rápidas de edição ou exclusão.</p>
            </div>

            <div className="table-wrapper">
                <table className="students-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Curso</th>
                        <th>Nota</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        alunos.map((aluno) => (
                            <tr key={aluno.id}>
                                <td>{aluno.id}</td>
                                <td>{aluno.nome}</td>
                                <td>{aluno.curso}</td>
                                <td>{aluno.nota}</td>
                                <td className="table-actions">
                                    <button className="button button-secondary" onClick={() => onEditar(aluno)}>
                                        Editar
                                    </button>
                                    <button className="button button-danger" onClick={() => onExcluir(aluno.id)}>
                                        Excluir
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
                </table>
            </div>
        </section>
    )
}