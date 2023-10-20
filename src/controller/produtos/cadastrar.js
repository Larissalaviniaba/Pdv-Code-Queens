const knex = require("../../conexaoBanco");

const {
  errosCategoria,
  errosProduto,
  errosGerais,
} = require("../../constants/erroMensagens");
const { sucessoProduto } = require("../../constants/sucessoMensagens");
const {
  seCampoExiste,
  seCampoNaoExiste,
} = require("../../utils/verificarCampo");

const cadastrarProduto = async (req, res) => {
  const { descricao, categoria_id, quantidade_estoque, valor } = req.body;

  try {
    const buscarCategoria = await knex("categorias")
      .select("id")
      .where({ id: categoria_id })
      .first();

    seCampoNaoExiste(res, buscarCategoria, 404, errosCategoria.categoriaInvalida);

    const buscarProduto = await knex("produtos")
      .where({ descricao: descricao })
      .select("descricao", "quantidade_estoque")
      .first();

    seCampoExiste(res, buscarProduto, 409, errosProduto.produtoJaExiste);

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
