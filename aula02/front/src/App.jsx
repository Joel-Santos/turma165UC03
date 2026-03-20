import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminFilmesPage from "./pages/admin/AdminFilmesPage";
import FilmesUsuarioPage from "./pages/user/FilmesUsuarioPage";
import FilmeDetalhePage from "./pages/filmeDetalhePage/FilmeDetalhePage";
import NotFoundPage from "./pages/notFoundPage/NotFoundPage";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";

export default function App() {
  return (
    <>

      <BrowserRouter>
        <div className="app-shell">
          <Header />
          <main className="app-content">
            <Routes>
              <Route path="/" element={<FilmesUsuarioPage />} />
              <Route path="/filmes/:id" element={<FilmeDetalhePage />} />
              <Route path="/admin" element={<AdminFilmesPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>

    </>
  )
}