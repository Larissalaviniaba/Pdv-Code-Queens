const knex = require("../../config/knexConfig");
const deletarImagem = require("../../utils/deleteImagemUtils");
const { errosGerais, errosProduto } = require("../../constants/erroMensagens");
const { sucessoProduto } = require("../../constants/sucessoMensagens");

const deletarProduto = async (req, res) => {
  try {
    const { id } = req.params;
    const buscarProduto = await knex("produtos").where({ id: id }).first();

    if (!buscarProduto) {
      return res.status(200).json({
        mensagem: errosProduto.produtoInvalido,
      });
    };

    const pedidosComProduto = await knex("pedido_produtos").select("pedido_id").where({ produto_id: id });

    if (pedidosComProduto.length > 0) {
      return res.status(200).json({ mensagem: errosProduto.produtoVinculado });
    };

    await deletarImagem(id);

    await knex("produtos").where({ id: id }).del();

    return res.status(200).json({ mensagem: sucessoProduto.produtoDeletado });

  } catch (error) {
    return res.status(500).json({ mensagem: errosGerais.erroServidor });
  }
};

module.exports = deletarProduto;