const express = require("express");
const rotas = express();

rotas.post("/produto");
rotas.get("/produto/:id");
rotas.put("/produto/:id");
rotas.delete("/produto/:id");

module.exports = rotas;