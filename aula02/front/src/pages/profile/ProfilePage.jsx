import { useEffect, useState } from "react";
import { atualizarUsuario, getMe } from "../../services/usuarioService";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import StatusModal from "../../components/ui/StatusModal";
import "./ProfilePage.css"; 

export default function ProfilePage() {
    const [id, setId] = useState("");
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [role, setRole] = useState("");
    const [carregando, setCarregando] = useState(true);
    const [salvando, setSalvando] = useState(false);
    const [mensagem, setMensagem] = useState("");
    const [erro, setErro] = useState("");
    const [modal, setModal] = useState({ open: false, type: "info", title: "", message: "" });

    useEffect(() => {
        async function carregarDadosPerfil() {
            setErro("");
            try {
                const meResponse = await getMe();
                const usuario = meResponse.data.usuario;

                setId(usuario.id);
                setNome(usuario.nome);
                setEmail(usuario.email || "");
                setRole(usuario.role || "USER");
            } catch (error) {
                const errorMsg = error?.response?.data?.msg || "Não foi possível carregar os dados do perfil.";
                setErro(errorMsg);
                setModal({
                    open: true,
                    type: "error",
                    title: "Erro ao carregar perfil",
                    message: errorMsg
                });
                console.error(error);
            } finally {
                setCarregando(false);
            }
        }

        carregarDadosPerfil();
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        setErro("");
        setMensagem("");

        if (!nome.trim() || !email.trim() || !senha.trim() || !confirmarSenha.trim()) {
            const mensagemErro = "Preencha nome, e-mail e senha para atualizar seu perfil.";
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

        setSalvando(true);
        try {
            await atualizarUsuario(id, { nome, email, senha });
            setMensagem("Perfil atualizado com sucesso! Faça login novamente para atualizar sua sessão.");
            setSenha("");
            setConfirmarSenha("");
            setModal({
                open: true,
                type: "success",
                title: "Perfil atualizado",
                message: "Alterações salvas com sucesso."
            });
        } catch (error) {
            const errorMsg = error?.response?.data?.msg || "Erro ao atualizar perfil.";
            setErro(errorMsg);
            setModal({
                open: true,
                type: "error",
                title: "Erro ao salvar",
                message: errorMsg
            });
            console.error(error);
        } finally {
            setSalvando(false);
        }
    }

    if (carregando) {
        return (
            <main className="profile-page">
                <LoadingSpinner text="Carregando perfil..." />
            </main>
        );
    }

    return (
        <main className="profile-page">
            <section className="profile-card">
                <h1>Meu Perfil</h1>
                <p className="profile-subtitle">Visualize e atualize seus dados de acesso.</p>

                {erro && <p className="profile-feedback error">{erro}</p>}
                {mensagem && <p className="profile-feedback success">{mensagem}</p>}

                <form className="profile-form" onSubmit={handleSubmit}>
                    <label>
                        Nome
                        <input
                            type="text"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            required
                        />
                    </label>

                    <label>
                        E-mail
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </label>

                    <label>
                        Nova senha (obrigatória para confirmar)
                        <input
                            type="password"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            required
                        />
                    </label>

                    <label>
                        Confirmar nova senha
                        <input
                            type="password"
                            value={confirmarSenha}
                            onChange={(e) => setConfirmarSenha(e.target.value)}
                            required
                        />
                    </label>

                    <label>
                        Perfil
                        <input
                            type="text"
                            value={role}
                            disabled
                            readOnly
                        />
                    </label>

                    <button type="submit" disabled={salvando}>
                        {salvando ? <><LoadingSpinner inline size="sm" text="" /> Salvando...</> : "Salvar alterações"}
                    </button>
                </form>
            </section>

            <StatusModal
                open={modal.open}
                type={modal.type}
                title={modal.title}
                message={modal.message}
                onClose={() => setModal({ open: false, type: "info", title: "", message: "" })}
            />
        </main>
    );
}