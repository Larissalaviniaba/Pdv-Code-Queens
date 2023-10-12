const express = require("express");
const rotas = express();

const loginSchema = require("../schemas/loginSchema");
const efetuarLogin = require("../controller/loginController");
const validarRequisicao = require("../middleware/validarRequisicaoMiddleware");

rotas.post("/login", validarRequisicao(loginSchema), efetuarLogin);

module.exports = rotas;
