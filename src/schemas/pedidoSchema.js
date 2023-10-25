const joi = require("joi");
const { errosGerais, errosProduto } = require("../constants/erroMensagens");

const pedidoSchema = joi.object({
  cliente_id: joi.required().messages({
    "any.required": errosGerais.camposObrigatorios,
    "string.trim": errosGerais.stringComEspaço,
    "string.empty": errosGerais.camposObrigatorios,
  }),
  pedido_produtos: joi
    .array()
    .min(1)
    .items(
      joi.object({
        produto_id: joi.number().required(),
        quantidade_produto: joi.number().required(),
      })
    )
    .required()
    .messages({
      "array.min": "O array deve ser pelo menos um pedido.",
      "any.required": errosGerais.camposObrigatorios,
    }),
});

module.exports = pedidoSchema;
