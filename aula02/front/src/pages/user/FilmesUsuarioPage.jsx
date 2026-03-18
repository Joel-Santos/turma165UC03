import { useEffect, useState } from "react";
import FilmeList from "../../components/FilmeList/FilmeList";
import {listarFilmes} from "../../services/filmeService";
import "./FilmesUsuarioPage.css";


export default function FilmesUsuarioPage() {
    const [filmes, setFilmes] = useState([]);
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
    }, [])

    return (
        <>
        <main className="usuario-container">
            <section className="cabecalho-usuario">
                <h1>Catálogo de Filmes</h1>
                <p>Confira os filmes disponíveis no catálogo.</p>
            </section>
            <FilmeList filmes={filmes} />
        </main>   
        </>
    )


}