const express = require("express");
const rotas = express();

const pedidoSchema = require("../schemas/pedidoSchema");
const validarRequisicao = require("../middleware/validarRequisicaoMiddleware");
// const verificarUsuarioLogado = require("../middleware/autenticacaoMiddleware");
const { cadastrarPedido } = require("../controller/pedido/cadastrar");
const { listarPedidos } = require("../controller/pedido/listar");

// rotas.use(verificarUsuarioLogado);
// rotas.post("/pedido", cadastrarPedido);
rotas.get("/pedido", listarPedidos);

module.exports = rotas;
