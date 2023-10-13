const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();
const porta = process.env.PORT || 3000;
const url = `http://localhost:${porta}`;

const usuarioRotas = require("./routes/usuarioRotas");
const loginRotas = require("./routes/loginRotas");
const categoriaRotas = require("./routes/categoriaRotas");

app.use(express.json(), cors());
app.use(usuarioRotas, loginRotas, categoriaRotas);

app.listen(porta, () => {
  console.log(`O servidor está rodando em ${url}`);
});
