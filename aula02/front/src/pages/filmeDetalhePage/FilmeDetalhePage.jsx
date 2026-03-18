import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { buscarFilmeId } from "../../services/filmeService";

export default function FilmeDetalhePage() {
    const { id } = useParams();
    const [filme, setFilme] = useState(null);

    async function carregarFilme() {
        try {
            const response = await buscarFilmeId(id);
            setFilme(response.data.filme);
        } catch (error) {
            console.error("Erro ao buscar o filme", error);
        }
    }
    useEffect(() => {
        carregarFilme();
    }, [id]);

    return (
        <>
            {!filme ?
                <>
                    <h2> Não foi possível exibir os dados do filme </h2>
                    <Link to="/">Voltar para Filmes.</Link>
                </>
                : (
                    <main>
                        <section>
                            <article>
                                <div>
                                    <img
                                        src={filme.imagem_url}
                                        alt={filme.titulo}
                                    />
                                </div>
                                <div>
                                    <h1>{filme.titulo}</h1>
                                    <p> Gênero: {filme.genero}</p>
                                    <p> Ano: {filme.ano}</p>
                                </div>
                                <Link to="/">Voltar para Filmes.</Link>
                            </article>
                        </section>
                    </main>
                )
            }
        </>
    )
}
