const express = require("express");
const cors = require("cors");
const path = require("path");
const usuarioRoutes = require("./routes/usuarioRoutes");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use("/usuarios", usuarioRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ erro: "JSON invalido" });
  }
  res.status(500).json({ erro: "Erro interno no servidor" });
});

module.exports = app;
