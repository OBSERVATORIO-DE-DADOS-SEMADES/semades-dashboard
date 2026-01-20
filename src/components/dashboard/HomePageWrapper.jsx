import React from "react";
import { useNavigate } from "react-router-dom";
import HomePage from "./HomePage";
import "../../styles/Root.css";

export default function HomePageWrapper() {
  const navigate = useNavigate();

  const loggedUser = (() => {
    if (typeof window === "undefined") return "";
    const raw = localStorage.getItem("authUser");
    if (!raw) return "";
    try {
      const parsed = JSON.parse(raw);
      return parsed?.name || parsed?.email || "";
    } catch {
      return "";
    }
  })();

  // logout — limpa o login e volta pra tela inicial
  const handleLogout = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
    navigate("/");
  };

  // abre/fecha o menu (classe no body)
  const toggleMenu = () => {
    document.body.classList.toggle("menu-open");
  };

  const closeMenu = () => {
    document.body.classList.remove("menu-open");
  };

  const handleNavigate = (path) => {
    navigate(path);
    closeMenu();
  };

  return (
    <div className="dashboard-container">
      {loggedUser ? (
        <div className="login-status">Logado como {loggedUser}</div>
      ) : null}

      {/* NAVBAR SUPERIOR */}
      <nav className="navbar no-print">
        <div className="navbar-left">
          <img
            src="/logo/prefcg1.png"
            alt="Prefeitura"
            className="navbar-logo"
          />
        </div>

        <div className="navbar-burger" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>

      {/* MENU LATERAL */}
      <div className="side-menu no-print">
        <button onClick={() => handleNavigate("/home")}>
          Página Inicial
        </button>

        <button onClick={() => handleNavigate("/superintendencias")}>
          Superintendências
        </button>

        <button onClick={() => handleNavigate("/dashboard")}>
          Indicadores Observatório
        </button>

        <button onClick={() => handleNavigate("/dados-centro")}>
          Dados Centro
        </button>

        <button
          onClick={() => {
            handleLogout();
            closeMenu();
          }}
          className="logout-btn"
        >
          Sair
        </button>
      </div>

      {/* OVERLAY (fundo escurecido) */}
      <div className="menu-overlay no-print" onClick={closeMenu} />

      {/* Conteúdo da HomePage */}
      <HomePage />
    </div>
  );
}
