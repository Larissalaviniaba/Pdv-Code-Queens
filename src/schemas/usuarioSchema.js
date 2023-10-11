const joi = require("joi");

const erroMensagens = require("../constants/erroMensagens");

const usuarioSchema = joi.object({
  nome: joi.string().required().messages({
    "any.required": erroMensagens.camposObrigatorios,
    "string.empty": erroMensagens.camposObrigatorios,
  }),

  email: joi.string().email().required().messages({
    "string.email": erroMensagens.emailInvalido,
    "any.required": erroMensagens.camposObrigatorios,
    "string.empty": erroMensagens.camposObrigatorios,
  }),

  senha: joi.string().min(5).required().messages({
    "any.required": erroMensagens.camposObrigatorios,
    "string.min": erroMensagens.tamanhoMinimoSenha,
    "string.empty": erroMensagens.camposObrigatorios,
  }),
});

module.exports = usuarioSchema;
