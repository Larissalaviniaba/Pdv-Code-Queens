const joi = require("joi");

const { errosGerais, errosUsuario } = require("../constants/erroMensagens");

const usuarioSchema = joi.object({
  nome: joi.string().required().messages({
    "any.required": errosGerais.camposObrigatorios,
    "string.empty": errosGerais.camposObrigatorios,
  }),

  email: joi.string().email().required().messages({
    "string.email": errosUsuario.emailInvalido,
    "any.required": errosGerais.camposObrigatorios,
    "string.empty": errosGerais.camposObrigatorios,
  }),

  senha: joi.string().min(5).required().messages({
    "any.required": erroMensagens.camposObrigatorios,
    "string.min": erroMensagens.tamanhoMinimoSenha,
    "string.empty": erroMensagens.camposObrigatorios,
  }),
});

module.exports = usuarioSchema;
