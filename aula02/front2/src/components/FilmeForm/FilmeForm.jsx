import { useEffect, useState } from "react";

function FilmeForm({ onSalvar, filmeEmEdicao, onCancelar }) {
  const [titulo, setTitulo] = useState("");
  const [genero, setGenero] = useState("");
  const [ano, setAno] = useState("");
  const [imagemUrl, setImagemUrl] = useState("");


  useEffect(() => {
    if (filmeEmEdicao) {
      setTitulo(filmeEmEdicao.titulo || "");
      setGenero(filmeEmEdicao.genero || "");
      setAno(filmeEmEdicao.ano || "");
      setImagemUrl(filmeEmEdicao.imagem_url || "");
    } else {
      setTitulo("");
      setGenero("");
      setAno("");
      setImagemUrl("");
    }
  }, [filmeEmEdicao]);

  function handleSubmit(e) {
    e.preventDefault();

    onSalvar({
      titulo,
      genero,
      ano,
      imagem_url: imagemUrl,
    });
      setTitulo("");
      setGenero("");
      setAno("");
      setImagemUrl("");
  }

  return (
    <section className="form-section">
      <h2>{filmeEmEdicao ? "Editar filme" : "Cadastrar filme"}</h2>

      <form onSubmit={handleSubmit} className="filme-form">
        <div className="campo">
          <label htmlFor="titulo">Título</label>
          <input
            id="titulo"
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </div>

        <div className="campo">
          <label htmlFor="genero">Gênero</label>
          <input
            id="genero"
            type="text"
            value={genero}
            onChange={(e) => setGenero(e.target.value)}
            required
          />
        </div>

        <div className="campo">
          <label htmlFor="ano">Ano</label>
          <input
            id="ano"
            type="number"
            value={ano}
            onChange={(e) => setAno(e.target.value)}
            required
          />
        </div>

        <div className="campo">
          <label htmlFor="imagemUrl">URL da imagem</label>
          <input
            id="imagemUrl"
            type="text"
            value={imagemUrl}
            onChange={(e) => setImagemUrl(e.target.value)}
            required
          />
        </div>

        <div className="acoes-form">
          <button type="submit">
            {filmeEmEdicao ? "Atualizar" : "Cadastrar"}
          </button>

          {filmeEmEdicao && (
            <button type="button" onClick={onCancelar}>
              Cancelar
            </button>
          )}
        </div>
      </form>
    </section>
  );
}

export default FilmeForm;