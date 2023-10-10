const express = require("express");
const rotas = express();

rotas.get("/categoria");

module.exports = rotas;