const joi = require("joi");
const {
  errosGerais,
  errosCliente,
  errosUsuario,
} = require("../constants/erroMensagens");

const clienteSchema = joi.object({
  nome: joi.string().required().trim().messages({
    "any.required": errosGerais.camposObrigatorios,
    "string.empty": errosGerais.camposObrigatorios,
    "string.trim": errosGerais.stringComEspaço,
  }),
  email: joi.string().email().trim().required().messages({
    "string.email": errosUsuario.emailInvalido,
    "any.required": errosGerais.camposObrigatorios,
    "string.empty": errosGerais.camposObrigatorios,
  }),
  cpf: joi
    .string()
    .pattern(/^[0-9]+$/)
    .required()
    .messages({
      "any.required": errosGerais.camposObrigatorios,
      "string.empty": errosGerais.camposObrigatorios,
      "string.pattern.base": errosCliente.cpfInvalido,
    }),
  cep: joi
    .string()
    .pattern(/^[0-9]+$/)
    .messages({
      "string.pattern.base": errosCliente.cepInvalido,
  }),
  rua: joi.string().trim().messages({
    "string.trim": errosGerais.campoInvalido,
  }),
  numero: joi.string().trim().messages({
    "string.trim": errosGerais.stringComEspaço,
  }),
  bairro: joi.string().trim().messages({
    "string.trim": errosGerais.stringComEspaço,
  }),
  cidade: joi.string().trim().messages({
    "string.trim": errosGerais.stringComEspaço,
  }),
  estado: joi.string().trim().max(2).messages({
    "string.trim": errosGerais.stringComEspaço,
    "string.max": errosCliente.estadoInvalido,
  }),
});

module.exports = clienteSchema;
