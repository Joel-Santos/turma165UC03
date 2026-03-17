import { useEffect, useState } from "react";
import FilmeList from "../../components/FilmeList/FilmeList";
import {
    listarFilmes
} from "../../services/filmeService";


export default function FilmesUsuarioPage(){
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

    return(
        <>
            <FilmeList filmes={filmes} />
        </>
    )
    

}