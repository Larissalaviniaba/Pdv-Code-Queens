const express = require("express");
const rotas = express();

const pedidoSchema = require("../schemas/pedidoSchema");
const validarRequisicao = require("../middleware/validarRequisicaoMiddleware");
const verificarUsuarioLogado = require("../middleware/autenticacaoMiddleware");
const { cadastrarPedido, listarPedidos } = require("../controller/pedidoController");

rotas.use(verificarUsuarioLogado);
rotas.post("/pedido", validarRequisicao(pedidoSchema), cadastrarPedido);
rotas.get("/pedido", listarPedidos);

module.exports = rotas;
