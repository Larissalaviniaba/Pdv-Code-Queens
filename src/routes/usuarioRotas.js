const express = require("express");
const rotas = express();
const {criarUsuario} = require("../controller/usuarioController");
const verificarUsuarioLogado = require("../middleware/autenticacaoMiddleware");

rotas.post("/usuario", criarUsuario);
rotas.get("/usuario", verificarUsuarioLogado);
rotas.put("/usuario");

module.exports = rotas;
 