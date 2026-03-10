import express from "express";
import "dotenv/config";
import cors from "cors";
import db from "./src/config/db.js";
import alunoRoutes from "./src/routes/alunoRoutes.js";


const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(
    cors(
        {
            origin: process.env.API_URL_FRONT
        }
    )
);
app.use("/alunos", alunoRoutes);

app.get("/", (req, res)=>{
    res.status(200).json({msg: "Hello World!"});
});

app.get("/teste", async (req, res)=>{
    const resultado = await  db.query("DELETE from alunos WHERE ID = 21");
    res.json({msg: resultado});
})

app.listen(PORT, ()=>{
    console.log(`Aplicação rodando em http://localhost:${PORT}`);
});
