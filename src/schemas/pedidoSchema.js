const joi = require("joi");
const {
  errosGerais,
  errosPedido
} = require("../constants/erroMensagens");

const pedidoSchema = joi.object({
  cliente_id: joi.number().integer().positive().required().messages({
    "any.required": errosGerais.camposObrigatorios,
    "number.base": errosPedido.clienteInvalido,
    "number.positive": errosPedido.clienteInvalido,
  }),
  observacao: joi.string().trim().messages({
    "string.base": errosGerais.campoString,
    "string.empty": errosGerais.camposObrigatorios,
    "string.trim": errosGerais.stringComEspaço,
  }),
  pedido_produtos: joi
    .array()
    .min(1)
    .items(
      joi.object({
        produto_id: joi.number().integer().positive().required().messages({
          "any.required": errosGerais.camposObrigatorios,
          "number.base": errosPedido.produtoInvalido,
          "number.positive": errosPedido.produtoInvalido,
        }),
        quantidade_produto: joi.number().integer().positive().required().min(1).messages({
          "any.required": errosGerais.camposObrigatorios,
          "number.base": errosPedido.quantidadeInvalida,
          "number.positive": errosPedido.quantidadeMinima,
          "number.min": errosPedido.quantidadeInvalida,
        }),
      })
    )
    .required()
    .messages({
      "array.min": errosPedido.quantidadeMinima,
      "any.required": errosGerais.camposObrigatorios,
    }),
});

module.exports = pedidoSchema;
