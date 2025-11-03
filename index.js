//trabalho de Desenvolvimento de software
import express from "express";
import cors from "cors";

const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());
let escolas = [];
app.get("/escolas", (req, res) => {
  res.status(200).json(escolas);
});
app.post("/escolas", (req, res) => {
  const { nome, endereco } = req.body;

  if (!nome || !endereco) {
    return res.status(400).json({ erro: "Nome e endereço são obrigatórios." });
  }

  const novaEscola = {
    id: escolas.length + 1,
    nome,
    endereco
  };

  escolas.push(novaEscola);
  res.status(201).json(novaEscola);
});

app.listen(port, () => {
  console.log(`Servidor em execução no endereço: http://localhost:${port}`);
});

