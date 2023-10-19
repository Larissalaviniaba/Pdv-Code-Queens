const express = require("express");
const rotas = express();

const produtoSchema = require("../schemas/produtoSchema");
const validarRequisicao = require("../middleware/validarRequisicaoMiddleware");
const verificarUsuarioLogado = require("../middleware/autenticacaoMiddleware");
const { cadastrarProduto } = require('../controller/produtos/cadastrar')

rotas.post("/produto", validarRequisicao(produtoSchema), cadastrarProduto);
rotas.get("/produto/:id");
rotas.put("/produto/:id");
rotas.delete("/produto/:id");

module.exports = rotas;