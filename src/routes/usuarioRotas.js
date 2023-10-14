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

rotas.use(verificarUsuarioLogado);
rotas.get("/usuario", detalharPerfil);
rotas.put("/usuario", validarRequisicao(usuarioSchema), editarPerfil);

module.exports = rotas;
