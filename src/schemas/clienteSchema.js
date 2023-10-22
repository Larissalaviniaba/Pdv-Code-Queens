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
    "string.base": errosGerais.campoString
  }),
  email: joi.string().email().trim().required().messages({
    "string.email": errosUsuario.emailInvalido,
    "any.required": errosGerais.camposObrigatorios,
    "string.empty": errosGerais.camposObrigatorios,
  }),
  cpf: joi
    .string()
    .pattern(/^[0-9]+$/)
    .max(11)
    .min(11)
    .required()
    .messages({
      "any.required": errosGerais.camposObrigatorios,
      "string.empty": errosGerais.camposObrigatorios,
      "string.pattern.base": errosCliente.cpfInvalido,
      "string.max": errosCliente.cpfInvalido,
      "string.min": errosCliente.cpfInvalido,
      "string.base": errosGerais.campoString
    }),
  cep: joi
    .string()
    .pattern(/^[0-9]+$/)
    .max(8)
    .messages({
      "string.empty": errosCliente.enderecoInvalido,
      "string.pattern.base": errosCliente.cepInvalido,
      "string.max": errosCliente.cepInvalido,
      "string.base": errosGerais.campoString
  }),
  rua: joi.string().trim().messages({
    "string.empty": errosCliente.enderecoInvalido,
    "string.trim": errosGerais.campoInvalido,
    "string.base": errosGerais.campoString
  }),
  numero: joi.string().trim().messages({
    "string.empty": errosCliente.enderecoInvalido,
    "string.trim": errosGerais.stringComEspaço,
    "string.base": errosGerais.campoString
  }),
  bairro: joi.string().trim().messages({
    "string.empty": errosCliente.enderecoInvalido,
    "string.trim": errosGerais.stringComEspaço,
    "string.base": errosGerais.campoString
  }),
  cidade: joi.string().trim().messages({
    "string.empty": errosCliente.enderecoInvalido,
    "string.trim": errosGerais.stringComEspaço,
    "string.base": errosGerais.campoString
  }),
  estado: joi.string().trim().regex(/^[A-Za-z]+$/).max(2).messages({
    "string.empty": errosCliente.enderecoInvalido,
    "string.max": errosCliente.estadoInvalido,
    'string.pattern.base': errosCliente.estadoInvalido,
    "string.base": errosGerais.campoString
  }),
});

module.exports = clienteSchema;
