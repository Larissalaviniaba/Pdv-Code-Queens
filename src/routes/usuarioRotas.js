const express = require("express");
const rotas = express();

const usuarioSchema = require("../schemas/usuarioSchema");
const {
  criarUsuario,
  detalharPerfil,
  editarPerfil,
} = require("../controller/usuarioController");
const validarRequisicao = require("../middleware/validarRequisicaoMiddleware");
const verificarUsuarioLogado = require("../middleware/autenticacaoMiddleware");

rotas.post("/usuario", validarRequisicao(usuarioSchema), criarUsuario);
rotas.get("/usuario", verificarUsuarioLogado, detalharPerfil);
rotas.put("/usuario", verificarUsuarioLogado, validarRequisicao(usuarioSchema), editarPerfil);

module.exports = rotas;
