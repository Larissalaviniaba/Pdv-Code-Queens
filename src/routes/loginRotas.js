const express = require("express");
const rotas = express();
const efetuarLogin = require("../controller/loginController")

rotas.post("/login", efetuarLogin);

module.exports = rotas;