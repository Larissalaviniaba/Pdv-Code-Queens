const express = require("express");
const rotas = express();

const produtoSchema = require("../schemas/produtoSchema");
const validarRequisicao = require("../middleware/validarRequisicaoMiddleware");
const verificarUsuarioLogado = require("../middleware/autenticacaoMiddleware");
const {
  listarProdutos,
  cadastrarProduto,
  atualizarProduto,
  deletarProduto,
  detalharProdutos,
} = require("../controller/produtoController");

rotas.use(verificarUsuarioLogado);
rotas.post("/produto", validarRequisicao(produtoSchema), cadastrarProduto);
rotas.get("/produto", listarProdutos);
rotas.get("/produto/:id", detalharProdutos);
rotas.put("/produto/:id", validarRequisicao(produtoSchema), atualizarProduto);
rotas.delete("/produto/:id", deletarProduto);

module.exports = rotas;
