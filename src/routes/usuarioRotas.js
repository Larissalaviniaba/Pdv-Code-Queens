const express = require("express");
const rotas = express();
const {criarUsuario} = require("../controller/usuarioController")

rotas.post("/usuario", criarUsuario);
rotas.get("/usuario");
rotas.put("/usuario");

module.exports = rotas;
