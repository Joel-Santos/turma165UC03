import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import filmeRoutes from "./src/routes/filmeRoutes.js";
import usuarioRoutes from "./src/routes/usuarioRoutes.js";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(
    cors(
        {
            origin: process.env.API_URL_FRONT,
            credentials: false
        }

    )
);
app.use(cookieParser());
app.use("/filmes", filmeRoutes);
app.use("/usuarios", usuarioRoutes);

app.get("/", (req, res)=>{
    res.status(200).json({msg: "Hello World!"});
});
app.listen(PORT, ()=>{
    console.log(`http://localhost:${PORT}`);
})