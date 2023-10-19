const knex = require("../../conexaoBanco");
const cadastrarProduto = async (req, res) => {
  const { descricao, categoria_id, quantidade_estoque, valor } = req.body;

  try {
    const buscarCategoria = await knex("categorias")
      .select("id")
      .where({ id: categoria_id })
      .first();

    if (!buscarCategoria) {
      return res
        .status(404)
        .json({ mensagem: "A categoria informada não existe." });
    }

    const buscarProduto = await knex("produtos")
      .where({ descricao: descricao })
      .select("descricao", "quantidade_estoque")
      .first();

    if (buscarProduto) {
      return res.status(200).json({
        mensagem: "O produto já existe no banco de dados.",
      });
    }

    await knex("produtos").insert({
      categoria_id,
      quantidade_estoque,
      valor,
      descricao,
    });

    return res.status(201).json({
      mensagem: "O produto foi cadastrado com sucesso.",
    });
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

module.exports = {
  cadastrarProduto,
};
