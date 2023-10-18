const express = require("express");
const rotas = express();

rotas.post("/cliente");
rotas.get("/cliente/:id");
rotas.put("/cliente/:id");
rotas.delete("/cliente/:id");

module.exports = rotas;