require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();

const porta = process.env.PORT || 3000;
const url = `http://localhost:${porta}`;

const usuarioRotas = require("./routes/usuarioRotas");
const loginRotas = require("./routes/loginRotas");
const categoriaRotas = require("./routes/categoriaRotas");
const produtoRotas = require("./routes/produtoRotas");
const clienteRotas = require("./routes/clienteRotas");

app.use(express.json(), cors());
app.use(usuarioRotas, loginRotas, categoriaRotas, produtoRotas, clienteRotas);

app.listen(porta, () => {
  console.log(`O servidor está rodando em ${url}`);
});
