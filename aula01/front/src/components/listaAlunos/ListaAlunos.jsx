export default function ListaALunos({alunos, onEditar, onExcluir}){

    if(alunos.length === 0){
        return <p> Nenhum Aluno cadastrado.</p>; 
    }
    return(
        <>
            <table border="1">
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
                        alunos.map((aluno)=>(
                           <tr key={aluno.id}>
                            <td>{aluno.id}</td>
                            <td>{aluno.nome}</td>
                            <td>{aluno.curso}</td>
                            <td>{aluno.nota}</td>
                            <td>
                                <button onClick={() => onEditar(aluno)}> Editar</button>
                                <button onClick={() => onExcluir(aluno.id)}> Editar</button>
                            </td>
                           </tr> 
                        ))
                    }
                </tbody>
            </table>
        </>
    )

}