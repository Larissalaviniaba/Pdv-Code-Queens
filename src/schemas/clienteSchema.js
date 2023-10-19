const joi = require("joi");
const {
  errosGerais,
  errosCliente,
} = require("../constants/erroMensagens");

const clienteSchema = joi.object({
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
  cpf: joi.string().pattern(/^[0-9]+$/).required().messages({
    "any.required": errosGerais.camposObrigatorios,
    "string.empty": errosGerais.camposObrigatorios,
    "string.pattern.base": errosCliente.cpfInvalido,
  }),
  cep: joi.string().pattern(/^[0-9]+$/).required().messages({
    "any.required": errosGerais.camposObrigatorios,
    "string.empty": errosGerais.camposObrigatorios,
    "string.pattern.base":errosCliente.cepInvalido,
  }),
  rua: joi.string().required().trim().messages({
    "any.required": errosGerais.camposObrigatorios,
    "string.empty": errosGerais.camposObrigatorios,
    "string.trim": errosGerais.campoInvalido,
  }),
  numero: joi.string().required().trim().messages({
    "any.required": errosGerais.camposObrigatorios,
    "string.empty": errosGerais.camposObrigatorios,
    "string.trim": errosGerais.campoInvalido,
  }),
  bairro: joi.string().required().trim().messages({
    "any.required": errosGerais.camposObrigatorios,
    "string.empty": errosGerais.camposObrigatorios,
    "string.trim": errosGerais.campoInvalido,
  }),
  cidade: joi.string().required().trim().messages({
    "any.required": errosGerais.camposObrigatorios,
    "string.empty": errosGerais.camposObrigatorios,
    "string.trim": errosGerais.campoInvalido,
  }),
  estado: joi.string().required().trim().messages({
    "any.required": errosGerais.camposObrigatorios,
    "string.empty": errosGerais.camposObrigatorios,
    "string.trim": errosGerais.campoInvalido,
  }),
});

module.exports = clienteSchema;
