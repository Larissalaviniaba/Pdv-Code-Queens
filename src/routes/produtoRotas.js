const express = require("express");
const multer = require("../config/multerConfig");
const rotas = express();

const produtoSchema = require("../schemas/produtoSchema");
const validarRequisicao = require("../middleware/validarRequisicaoMiddleware");
const verificarUsuarioLogado = require("../middleware/autenticacaoMiddleware");

const {
  listarProdutos,
  detalharProdutos,
} = require("../controller/produtoController");

const { cadastrarProduto } = require("../controller/produto/cadastrar");
const { atualizarProduto } = require("../controller/produto/atualizar");
const { deletarProduto } = require("../controller/produto/deletar");

// rotas.use(verificarUsuarioLogado);
rotas.post("/produto", multer.single("produto_imagem"), cadastrarProduto);
rotas.get("/produto", listarProdutos);
rotas.get("/produto/:id", detalharProdutos);
rotas.put("/produto/:id", validarRequisicao(produtoSchema));
rotas.delete("/produto/:id");

module.exports = rotas;
