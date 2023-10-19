const express = require("express");
const rotas = express();
const verificarUsuarioLogado = require("../middleware/autenticacaoMiddleware");
const { listarProdutos } = require("../controller/produtos/listar");


rotas.post("/produto");
rotas.get("/produto", verificarUsuarioLogado, listarProdutos);
rotas.put("/produto/:id");
rotas.delete("/produto/:id");

module.exports = rotas;