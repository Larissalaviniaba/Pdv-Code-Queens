const express = require("express");
const rotas = express();
const { listarCategorias } = require("../controller/categoriaController");

rotas.get("/categoria", listarCategorias);

module.exports = rotas;
