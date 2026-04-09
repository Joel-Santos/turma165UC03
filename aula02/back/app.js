import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import filmeRoutes from "../src/routes/filmeRoutes.js";
import usuarioRoutes from "../src/routes/usuarioRoutes.js";
import db from "../src/config/db.js";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.API_URL_FRONT,
    credentials: true,
  })
);

app.use(cookieParser());

app.use("/filmes", filmeRoutes);
app.use("/usuarios", usuarioRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ msg: "Hello World!" });
});


// ⚠️ inicialização segura (SEM listen)
let initialized = false;

async function inicializarTabelas() {
  if (initialized) return;

  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS filmes(
        id serial primary key,
        titulo varchar(150) not null,
        genero varchar(100) not null,
        ano int not null,
        imagem_url text
      );
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS usuarios(
        id uuid primary key,
        nome varchar(100) not null,
        email varchar(150) unique not null,
        senha text not null,
        role varchar(20) not null default 'USER',
        criado_em timestamp default current_timestamp
      );
    `);

    console.log("✅ Tabelas verificadas");
    initialized = true;

  } catch (error) {
    console.error("Erro ao inicializar banco:", error);
    throw error;
  }
}

// 🚀 handler do Vercel
export default async function handler(req, res) {
  await inicializarTabelas();
  return app(req, res);
}