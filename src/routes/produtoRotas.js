const express = require("express");
const multer = require("../config/multer");
const rotas = express();

const produtoSchema = require("../schemas/produtoSchema");
const validarRequisicao = require("../middleware/validarRequisicaoMiddleware");
const verificarUsuarioLogado = require("../middleware/autenticacaoMiddleware");

const {
  listarProdutos,
  detalharProdutos,
} = require("../controller/produtoController");

const {cadastrarProduto} = require("../controller/produto/cadastrar");
const {atualizarProduto} = require("../controller/produto/atualizar");
const {deletarProduto} = require("../controller/produto/deletar");

// rotas.use(verificarUsuarioLogado);
rotas.post("/produto", validarRequisicao(produtoSchema));
rotas.get("/produto", listarProdutos);
rotas.get("/produto/:id", detalharProdutos);
rotas.put("/produto/:id", validarRequisicao(produtoSchema));
rotas.delete("/produto/:id");

rotas.post("/upload", multer.single("arquivo"), async (req, res) => {
  console.log(req.file);
  return res.json({
    mensagem: "tudo certo",
  });
});

module.exports = rotas;
