const express = require("express");
const rotas = express();


const produtoSchema = require("../schemas/produtoSchema");
const validarRequisicao = require("../middleware/validarRequisicaoMiddleware");
const verificarUsuarioLogado = require("../middleware/autenticacaoMiddleware");
const { cadastrarProduto } = require("../controller/produtos/cadastrar");
const { atualizarProduto } = require("../controller/produtos/atualizar");
<<<<<<<<< Temporary merge branch 1
const { detalharProdutos } = require("../controller/produtos/detalhar");
const { verificarID } = require("../middleware/autenticacaoID");
=========
// const { listarProdutos } = require("../controller/produtos/listar");
const{deletarProduto} = require("../controller/produtos/deletar")
>>>>>>>>> Temporary merge branch 2

rotas.post("/produto", validarRequisicao(produtoSchema), cadastrarProduto);
rotas.get("/produto", verificarUsuarioLogado, listarProdutos);
rotas.get("/produto/:id", verificarUsuarioLogado, verificarID, detalharProdutos);
rotas.put("/produto/:id", validarRequisicao(produtoSchema), atualizarProduto);
rotas.delete("/produto/:id", verificarUsuarioLogado, deletarProduto);

module.exports = rotas;
