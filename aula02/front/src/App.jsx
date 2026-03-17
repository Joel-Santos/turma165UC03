import React from "react";
import AdminFilmesPage from "./pages/admin/AdminFilmesPage";
import FilmesUsuarioPage from "./pages/user/FilmesUsuarioPage";

export default function App(){
  return(
    <>
      <AdminFilmesPage />
      <FilmesUsuarioPage />
    </>
  )
}