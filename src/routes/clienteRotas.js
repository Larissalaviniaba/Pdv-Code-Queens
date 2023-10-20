const express = require("express");
const rotas = express();

const clienteSchema = require("../schemas/clienteSchema");
const { cadastrarCliente } = require('../controller/cliente/cadastrar')
const { atualizarCliente } = require('../controller/cliente/atualizar')
const validarRequisicao = require("../middleware/validarRequisicaoMiddleware");
const verificarUsuarioLogado = require("../middleware/autenticacaoMiddleware");

rotas.post("/cliente", validarRequisicao(clienteSchema), cadastrarCliente);
rotas.get("/cliente/:id");
rotas.put("/cliente/:id", validarRequisicao(clienteSchema), atualizarCliente);
rotas.delete("/cliente/:id");

module.exports = rotas;