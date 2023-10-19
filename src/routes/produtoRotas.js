const express = require("express");
const rotas = express();
// const verificarUsuarioLogado = require("../middleware/autenticacaoMiddleware");
const { listarProdutos } = require("../controller/produtos/listar");


const produtoSchema = require("../schemas/produtoSchema");
const validarRequisicao = require("../middleware/validarRequisicaoMiddleware");
const verificarUsuarioLogado = require("../middleware/autenticacaoMiddleware");
const { cadastrarProduto } = require("../controller/produtos/cadastrar");
const { atualizarProduto } = require("../controller/produtos/atualizar");

rotas.post("/produto", validarRequisicao(produtoSchema), cadastrarProduto);
rotas.get("/produto", verificarUsuarioLogado, listarProdutos);
rotas.put("/produto/:id", validarRequisicao(produtoSchema), atualizarProduto);
rotas.delete("/produto/:id");

module.exports = rotas;
