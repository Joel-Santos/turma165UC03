import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMe, logout } from "../../services/usuarioService";
import LoadingSpinner from "../ui/LoadingSpinner";
import StatusModal from "../ui/StatusModal";
import {
    FiFilm,
    FiLogIn,
    FiHome,
    FiUser,
    FiSettings,
    FiLogOut,
    FiSmile
} from "react-icons/fi";

export default function Header() {
    const [usuario, setUsuario] = useState(null);
    const [loadingUsuario, setLoadingUsuario] = useState(true);
    const [modal, setModal] = useState({ open: false, type: "info", title: "", message: "" });
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        async function carregarUsuario() {
            setLoadingUsuario(true);
            try {
                const response = await getMe();
                setUsuario(response.data.usuario);
            } catch (error) {
                setUsuario(null);
            } finally {
                setLoadingUsuario(false);
            }
        }
        carregarUsuario();
    }, [location.pathname]);

    async function handleLogout() {
        try {
            await logout();
            setModal({
                open: true,
                type: "success",
                title: "Sessão encerrada",
                message: "Você saiu com sucesso."
            });
        } catch (error) {
            setModal({
                open: true,
                type: "error",
                title: "Erro ao sair",
                message: error?.response?.data?.msg || "Não foi possível finalizar sua sessão agora."
            });
        }
        setUsuario(null);
        navigate("/");
    }

    function isActive(path) {
        return location.pathname === path;
    }

    return (
        <>
            <header className="header">
                <div className="layout-container header-content">
                    <Link to={usuario ? "/filmes" : "/"} className="brand-link">
                        <span className="brand-logo" aria-hidden="true"><FiFilm /></span>
                        <span>Filmes</span>
                    </Link>

                    <nav>
                        <ul className="menu">
                            {loadingUsuario && (
                                <li>
                                    <LoadingSpinner text="" size="sm" inline />
                                </li>
                            )}

                            {/* NÃO LOGADO */}
                            {!loadingUsuario && !usuario && (
                                <li>
                                    <Link className={`menu-link ${isActive("/") ? "active" : ""}`} to="/"><FiLogIn /> Login</Link>
                                </li>
                            )}

                            {/* USUÁRIO COMUM */}
                            {!loadingUsuario && usuario && (
                                <>
                                    <li>
                                        <Link className={`menu-link ${isActive("/filmes") ? "active" : ""}`} to="/filmes"><FiHome /> Início</Link>
                                    </li>
                                    <li>
                                        <Link className={`menu-link ${isActive("/perfil") ? "active" : ""}`} to="/perfil"><FiUser /> Perfil</Link>
                                    </li>
                                </>
                            )}

                            {/* ADMIN */}
                            {usuario?.role === "ADMIN" && (
                                <>
                                    <li>
                                        <Link className={`menu-link ${isActive("/admin") ? "active" : ""}`} to="/admin"><FiSettings /> Gerenciar</Link>
                                    </li>

                                </>
                            )}

                            {/* NOME DO USUÁRIO  */}
                            {usuario && (
                                <li className="user-chip">
                                    <FiSmile />
                                    <span>{usuario.nome}</span>
                                </li>
                            )}

                            {/* LOGOUT */}
                            {usuario && (
                                <li>
                                    <button className="menu-button" onClick={handleLogout}><FiLogOut /> Sair</button>
                                </li>
                            )}
                        </ul>
                    </nav>
                </div>
            </header>

            <StatusModal
                open={modal.open}
                type={modal.type}
                title={modal.title}
                message={modal.message}
                onClose={() => setModal({ open: false, type: "info", title: "", message: "" })}
            />
        </>
    )


}