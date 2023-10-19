const express = require("express");
const rotas = express();

const clienteSchema = require("../schemas/clienteSchema");
const validarRequisicao = require("../middleware/validarRequisicaoMiddleware");
const verificarUsuarioLogado = require("../middleware/autenticacaoMiddleware");

rotas.post("/cliente");
rotas.get("/cliente/:id");
rotas.put("/cliente/:id");
rotas.delete("/cliente/:id");

module.exports = rotas;