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

rotas.use(verificarUsuarioLogado)
rotas.post("/cliente", validarRequisicao(clienteSchema), cadastrarCliente);
rotas.get("/cliente/:id", detalharCliente);
rotas.get("/cliente", listarClientes);
rotas.put("/cliente/:id", validarRequisicao(clienteSchema), atualizarCliente);

module.exports = rotas;
