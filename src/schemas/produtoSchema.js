const joi = require("joi");
const { errosGerais, errosProduto } = require("../constants/erroMensagens");

const produtoSchema = joi.object({
  categoria_id: joi.number().integer().positive().required().messages({
    "any.required": errosGerais.camposObrigatorios,
    "number.base": errosProduto.idInvalido,
    "number.positive": errosProduto.idInvalido,
  }),
  quantidade_estoque: joi.number().integer().min(0).required().messages({
    "any.required": errosGerais.camposObrigatorios,
    "number.base": errosProduto.quantidadeInvalida,
    "number.min": errosProduto.quantidadeInvalida,
  }),
  valor: joi.number().positive().required().messages({
    "any.required": errosGerais.camposObrigatorios,
    "number.positive": errosProduto.valorInvalido,
  }),
  descricao: joi.string().required().messages({
    "any.required": errosGerais.camposObrigatorios,
    "string.empty": errosGerais.camposObrigatorios,
  }),
});

module.exports = usuarioSchema;
