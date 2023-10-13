const express = require("express");
const rotas = express();

const usuarioSchema = require("../schemas/usuarioSchema");
const criarUsuario = require("../controller/usuarioController");
const validarRequisicao = require("../middleware/validarRequisicaoMiddleware");

rotas.post("/usuario", validarRequisicao(usuarioSchema), criarUsuario);

module.exports = rotas;
