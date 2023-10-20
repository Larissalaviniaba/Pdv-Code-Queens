const express = require("express");
const rotas = express();

const clienteSchema = require("../schemas/clienteSchema");
const { cadastrarCliente } = require('../controller/cliente/cadastrar');
const listarClientes = require('../controller/cliente/listar');
const detalharCliente = require('../controller/cliente/detalhar');
const validarRequisicao = require("../middleware/validarRequisicaoMiddleware");
const verificarUsuarioLogado = require("../middleware/autenticacaoMiddleware");

rotas.post("/cliente", validarRequisicao(clienteSchema), cadastrarCliente);
rotas.get("/cliente/:id", detalharCliente);
rotas.get("/cliente", listarClientes);
rotas.put("/cliente/:id");
rotas.delete("/cliente/:id");

module.exports = rotas;