export default function FilmeCard({filme}){
    return(
        <>
            <article>
                    <img
                    src={filme.imagem_url} 
                    alt={filme.titulo}
                    />
                    <div>
                        <h2>{filme.titulo}</h2>
                        <p>Gênero: {filme.genero}</p>
                         <p>Ano: {filme.ano}</p>
                    </div>
            </article>
        </>
    )
}