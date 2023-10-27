const express = require("express");
const rotas = express();

const clienteSchema = require("../schemas/clienteSchema");
const {
  listarClientes,
  detalharCliente,
  cadastrarCliente,
  atualizarCliente,
} = require("../controller/clienteController");
const validarRequisicao = require("../middleware/validarRequisicaoMiddleware");
const verificarUsuarioLogado = require("../middleware/autenticacaoMiddleware");
const validarEnderecoCompleto = require("../middleware/enderecoCompletoMiddleware");

rotas.use(verificarUsuarioLogado)
rotas.post("/cliente", validarRequisicao(clienteSchema), validarEnderecoCompleto, cadastrarCliente);
rotas.get("/cliente/:id", detalharCliente);
rotas.get("/cliente", listarClientes);
rotas.put("/cliente/:id", validarRequisicao(clienteSchema), validarEnderecoCompleto, atualizarCliente);

module.exports = rotas;
