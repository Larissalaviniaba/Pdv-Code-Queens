const joi = require("joi");

const { errosGerais, errosUsuario } = require("../constants/erroMensagens");

const loginSchema = joi.object({
  email: joi.string().email().required().messages({
    "string.email": errosUsuario.emailInvalido,
    "any.required": errosGerais.camposObrigatorios,
    "string.empty": errosGerais.camposObrigatorios,
  }),

  senha: joi.string().min(5).required().messages({
    "any.required": errosGerais.camposObrigatorios,
    "string.min": errosUsuario.tamanhoMinimoSenha,
    "string.empty": errosGerais.camposObrigatorios,
  }),
});

module.exports = loginSchema;
