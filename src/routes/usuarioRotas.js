const express = require("express");
const rotas = express();
const { criarUsuario } = require("../controller/usuarioController");
const verificarUsuarioLogado = require("../middleware/autenticacaoMiddleware");
const validarRequisicao = require("../middleware/validarRequisicaoMiddleware");
const usuarioSchema = require("../schemas/usuarioSchema");

rotas.post("/usuario", validarRequisicao(usuarioSchema), criarUsuario);

module.exports = rotas;
