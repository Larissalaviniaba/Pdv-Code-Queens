const express = require("express");
const rotas = express();
const {criarUsuario, perfilUsuario} = require("../controller/usuarioController");
const verificarUsuarioLogado = require("../middleware/autenticacaoMiddleware");

rotas.post("/usuario", criarUsuario);
rotas.get("/usuario", verificarUsuarioLogado, perfilUsuario);
rotas.put("/usuario");

module.exports = rotas;
