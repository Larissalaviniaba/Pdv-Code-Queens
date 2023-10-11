const express = require("express");
const rotas = express();
const efatuarLogin = require("../controller/loginController")

rotas.post("/login", efatuarLogin);

module.exports = rotas;