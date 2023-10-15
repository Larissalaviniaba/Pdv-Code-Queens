const joi = require("joi");

const { errosGerais, errosUsuario } = require("../constants/erroMensagens");

const usuarioSchema = joi.object({
  nome: joi.string().required().pattern(/^\S+$/).messages({
    "any.required": errosGerais.camposObrigatorios,
    "string.empty": errosGerais.camposObrigatorios,
    "string.pattern.base": errosGerais.campoInvalido,
  }),

  email: joi.string().email().pattern(/^\S+$/).required().messages({
    "string.email": errosUsuario.emailInvalido,
    "any.required": errosGerais.camposObrigatorios,
    "string.empty": errosGerais.camposObrigatorios,
    "string.pattern.base": errosGerais.campoInvalido,
  }),

  senha: joi.string().min(5).pattern(/^\S+$/).required().messages({
    "any.required": errosGerais.camposObrigatorios,
    "string.min": errosUsuario.tamanhoMinimoSenha,
    "string.empty": errosGerais.camposObrigatorios,
    "string.pattern.base": errosGerais.campoInvalido,
  }),
});

module.exports = usuarioSchema;
