import FilmeCard from "../FilmeCard/FilmeCard"
export default function FilmeList({ filmes }) {
    return (

        <>
            {filmes.length === 0 ?
                (
                    <p> Nenhum filme cadastrado.</p>
                ) :

                <section>
                        {
                            filmes.map((filme) =>(
                                <FilmeCard
                                    key={filme.id}
                                    filme={filme}
                                />
                            ))
                        }
                </section>
            }
        </>
    )
}