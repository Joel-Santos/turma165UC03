import { useState } from "react";
import { criarUsuario, login } from "../../services/usuarioService";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import StatusModal from "../../components/ui/StatusModal";
import "./LoginPage.css";

export default function LoginPage() {
    const [modo, setModo] = useState("login");
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [mensagem, setMensagem] = useState("");
    const [erro, setErro] = useState("");
    const [enviando, setEnviando] = useState(false);
    const [modal, setModal] = useState({ open: false, type: "info", title: "", message: "" });
    const navigate = useNavigate();

    async function handleLogin(e) {
        e.preventDefault();
        setErro("");
        setMensagem("");
        setEnviando(true);
        try {
            const response = await login({ email, senha });
            const usuario = response.data.usuario;
            if (usuario.role === "ADMIN") {
                navigate("/admin");
            } else {
                navigate("/filmes");
            }
        } catch (error) {
            const errorMsg = error?.response?.data?.msg || "Erro no login";
            setErro(errorMsg);
            setModal({
                open: true,
                type: "error",
                title: "Falha no login",
                message: errorMsg
            });
            console.error(error);
        } finally {
            setEnviando(false);
        }
    }

    async function handleCadastro(e) {
        e.preventDefault();
        setErro("");
        setMensagem("");

        if (!nome.trim() || !email.trim() || !senha.trim() || !confirmarSenha.trim()) {
            const mensagemErro = "Preencha nome, e-mail e senha para cadastrar.";
            setErro(mensagemErro);
            setModal({
                open: true,
                type: "error",
                title: "Campos obrigatórios",
                message: mensagemErro
            });
            return;
        }

        if (senha !== confirmarSenha) {
            const mensagemErro = "As senhas não coincidem.";
            setErro(mensagemErro);
            setModal({
                open: true,
                type: "error",
                title: "Validação de senha",
                message: mensagemErro
            });
            return;
        }

        setEnviando(true);
        try {
            await criarUsuario({ nome, email, senha });
            setMensagem("Cadastro realizado com sucesso! Faça seu login.");
            setModo("login");
            setNome("");
            setEmail("");
            setSenha("");
            setConfirmarSenha("");
            setModal({
                open: true,
                type: "success",
                title: "Cadastro concluído",
                message: "Conta criada com sucesso! Agora faça seu login."
            });
        } catch (error) {
            const errorMsg = error?.response?.data?.msg || "Erro ao cadastrar usuário.";
            setErro(errorMsg);
            setModal({
                open: true,
                type: "error",
                title: "Falha no cadastro",
                message: errorMsg
            });
            console.error(error);
        } finally {
            setEnviando(false);
        }
    }

    return (
        <>
            <main className="auth-page">
                <section className="auth-card">
                    <h1>{modo === "login" ? "Entrar" : "Criar conta"}</h1>
                    <p className="auth-subtitle">
                        {modo === "login"
                            ? "Acesse sua conta para navegar no catálogo de filmes."
                            : "Cadastre-se para começar a usar o sistema."}
                    </p>

                    <div className="auth-toggle" role="tablist" aria-label="Alternar entre login e cadastro">
                        <button
                            type="button"
                            className={modo === "login" ? "active" : ""}
                            onClick={() => {
                                setModo("login");
                                setErro("");
                                setMensagem("");
                                setConfirmarSenha("");
                            }}
                        >
                            Login
                        </button>
                        <button
                            type="button"
                            className={modo === "cadastro" ? "active" : ""}
                            onClick={() => {
                                setModo("cadastro");
                                setErro("");
                                setMensagem("");
                                setConfirmarSenha("");
                            }}
                        >
                            Cadastro
                        </button>
                    </div>

                    {erro && <p className="auth-feedback error">{erro}</p>}
                    {mensagem && <p className="auth-feedback success">{mensagem}</p>}

                    <form className="auth-form" onSubmit={modo === "login" ? handleLogin : handleCadastro}>
                        {modo === "cadastro" && (
                            <input
                                type="text"
                                placeholder="Informe seu nome"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                required
                            />
                        )}
                        <input
                            type="email"
                            placeholder="Informe seu e-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Informe sua senha"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            required
                        />
                        {modo === "cadastro" && (
                            <input
                                type="password"
                                placeholder="Confirme sua senha"
                                value={confirmarSenha}
                                onChange={(e) => setConfirmarSenha(e.target.value)}
                                required
                            />
                        )}
                        <button type="submit" disabled={enviando}>
                            {enviando
                                ? <><LoadingSpinner inline size="sm" text="" /> Aguarde...</>
                                : (modo === "login" ? "Entrar" : "Cadastrar")}
                        </button>
                    </form>

                    <p className="auth-tip">
                        {modo === "login"
                            ? "Ainda não tem conta? Clique em Cadastro."
                            : "Já tem conta? Clique em Login."}
                    </p>
                </section>
            </main>

            <StatusModal
                open={modal.open}
                type={modal.type}
                title={modal.title}
                message={modal.message}
                onClose={() => setModal({ open: false, type: "info", title: "", message: "" })}
            />
        </>
    );
}

