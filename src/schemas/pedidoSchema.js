const joi = require("joi");
const { errosGerais, errosProduto } = require("../constants/erroMensagens");

const pedidoSchema = joi.object({
  cliente_id: joi.string().trim().required().messages({
    "any.required": errosGerais.camposObrigatorios,
    "string.trim": errosGerais.stringComEspaço,
    "string.empty": errosGerais.camposObrigatorios,
  }),
  pedido_produtos: joi
    .array()
    .min(1)
    .items(
      joi.object({
        produto_id: joi.number().required().messages({
          "any.required": errosGerais.camposObrigatorios,
          "number.positive": errosProduto.idInvalido, // mudar para : "Insira um ID válido para 'produto_id'."
        }),
        quantidade_produto: joi.number().required().messages({
          "any.required": errosGerais.camposObrigatorios,
          "number.integer": errosProduto.quantidadeInvalida, // mudar para : "Insira um número válido para 'quantidade_produto'.",
        }),
      })
    )
    .required()
    .messages({
      "array.min": "O array deve ser pelo menos um pedido.",
      "any.required": errosGerais.camposObrigatorios,
    }),
});

module.exports = pedidoSchema;
