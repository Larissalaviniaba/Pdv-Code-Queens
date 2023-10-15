const joi = require("joi");
const { errosGerais, errosUsuario } = require("../constants/erroMensagens");

const usuarioSchema = joi.object({
  nome: joi.string().required().trim().messages({
    "any.required": errosGerais.camposObrigatorios,
    "string.empty": errosGerais.camposObrigatorios,
    "string.trim": errosGerais.campoInvalido,
  }),

  email: joi.string().email().trim().required().messages({
    "string.email": errosUsuario.emailInvalido,
    "any.required": errosGerais.camposObrigatorios,
    "string.empty": errosGerais.camposObrigatorios,
    "string.trim": errosGerais.campoInvalido,
  }),

  senha: joi.string().min(5).trim().required().messages({
    "any.required": errosGerais.camposObrigatorios,
    "string.min": errosUsuario.tamanhoMinimoSenha,
    "string.empty": errosGerais.camposObrigatorios,
    "string.trim": errosGerais.campoInvalido,
  }),
});

module.exports = usuarioSchema;
