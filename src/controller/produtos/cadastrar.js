const knex = require("../../conexaoBanco");

const {
  errosCategoria,
  errosProduto,
  errosGerais,
} = require("../../constants/erroMensagens");
const { sucessoProduto } = require("../../constants/sucessoMensagens");

const cadastrarProduto = async (req, res) => {
  const { descricao, categoria_id, quantidade_estoque, valor } = req.body;

  try {
    const buscarCategoria = await knex("categorias")
      .select("id")
      .where({ id: categoria_id })
      .first();

    if (!buscarCategoria) {
      return res.status(404).json({
        mensagem: errosCategoria.categoriaInvalida,
      });
    }

    const buscarProduto = await knex("produtos")
      .where({ descricao: descricao })
      .select("descricao", "quantidade_estoque")
      .first();

    if (buscarProduto) {
      return res.status(409).json({
        mensagem: errosProduto.produtoJaExiste,
      });
    }

    await knex("produtos").insert({
      categoria_id,
      quantidade_estoque,
      valor,
      descricao,
    });

    return res.status(201).json({
      mensagem: sucessoProduto.produtoCadastrado,
    });
  } catch (error) {
    return res.status(500).json({ mensagem: errosGerais.erroServidor });
  }
};

module.exports = {
  cadastrarProduto,
};
