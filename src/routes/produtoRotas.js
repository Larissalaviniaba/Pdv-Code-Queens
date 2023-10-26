const express = require("express");
const multer = require("../config/multerConfig");
const rotas = express();

const produtoSchema = require("../schemas/produtoSchema");
const validarRequisicao = require("../middleware/validarRequisicaoMiddleware");
const verificarUsuarioLogado = require("../middleware/autenticacaoMiddleware");

const {
  cadastrarProduto,
  atualizarProduto,
  deletarProduto,
  detalharProdutos,
  listarProdutos,
} = require("../controller/produtoController");

rotas.use(verificarUsuarioLogado);
rotas.post(
  "/produto",
  multer.single("produto_imagem"),
  validarRequisicao(produtoSchema),
  cadastrarProduto
);
rotas.get("/produto", listarProdutos);
rotas.get("/produto/:id", detalharProdutos);
rotas.put(
  "/produto/:id",
  multer.single("produto_imagem"),
  validarRequisicao(produtoSchema),
  atualizarProduto
);
rotas.delete("/produto/:id", deletarProduto);

module.exports = rotas;
