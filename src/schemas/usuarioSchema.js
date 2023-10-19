const joi = require("joi");
const { errosGerais, errosUsuario } = require("../constants/erroMensagens");

const usuarioSchema = joi.object({
  nome: joi.string().required().trim().messages({
    "any.required": errosGerais.camposObrigatorios,
    "string.empty": errosGerais.camposObrigatorios,
    "string.trim": errosGerais.stringComEspaço,
  }),

  email: joi.string().email().trim().required().messages({
    "string.email": errosUsuario.emailInvalido,
    "any.required": errosGerais.camposObrigatorios,
    "string.empty": errosGerais.camposObrigatorios,
    "string.trim": errosGerais.campoInvalido,
  }),

  senha: joi
    .string()
    .custom((value, helpers) => {
      if (/\s/.test(value)) {
        return helpers.error("string.regex.base");
      }
      return value;
    }, errosGerais.campoInvalido)
    .min(5)
    .required()
    .messages({
      "any.required": errosGerais.camposObrigatorios,
      "string.min": errosUsuario.tamanhoMinimoSenha,
      "string.empty": errosGerais.camposObrigatorios,
      "string.regex.base": errosGerais.campoInvalido,
    }),
});

module.exports = usuarioSchema;
