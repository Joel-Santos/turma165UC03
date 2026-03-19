import { useEffect, useState } from "react";
import FilmeList from "../../components/FilmeList/FilmeList";
import { listarFilmes } from "../../services/filmeService";
import "./FilmesUsuarioPage.css";


export default function FilmesUsuarioPage() {
    const [filmes, setFilmes] = useState([]);
    const [busca, setBusca] = useState("");
    async function carregarFilmes() {
        try {
            const response = await listarFilmes();
            setFilmes(response.data.filmes);
        } catch (error) {
            console.error("Erro interno ao carregar filmes:", error);
        }
    }
    useEffect(() => {
        carregarFilmes();
    }, []);
    //Filtro de busca
    const filmesFiltrados = filmes.filter((filme) =>
        filme.titulo.toLowerCase().includes(busca.toLowerCase())
    );


    return (
        <>
            <main className="usuario-container">
                <section className="cabecalho-usuario">
                    <h1>Catálogo de Filmes</h1>
                    <p>Confira os filmes disponíveis no catálogo.</p>
                    <div className="busca-box">
                        <input 
                            type="text"
                            value={busca}
                            placeholder="Buscar filme..."
                            onChange={(e)=> setBusca(e.target.value)}
                        />
                    </div>
                </section>
                <FilmeList filmes={filmesFiltrados} />
            </main>
        </>
    )


}