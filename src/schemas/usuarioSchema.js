const joi = require("joi");

const {errosGerais} = require("../constants/erroMensagens");

const usuarioSchema = joi.object({
  nome: joi.string().required().messages({
    "any.required": errosGerais.camposObrigatorios,
    "string.empty": errosGerais.camposObrigatorios,
  }),

  email: joi.string().email().required().messages({
    "string.email": errosGerais.emailInvalido,
    "any.required": errosGerais.camposObrigatorios,
    "string.empty": errosGerais.camposObrigatorios,
  }),

  senha: joi.string().min(5).required().messages({
    "any.required": errosGerais.camposObrigatorios,
    "string.min": errosGerais.tamanhoMinimoSenha,
    "string.empty": errosGerais.camposObrigatorios,
  }),
});

module.exports = usuarioSchema;
