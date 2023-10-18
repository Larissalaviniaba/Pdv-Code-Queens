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
      .select("descricao", "quantidade_estoque", "valor")
      .first();

    if (buscarProduto) {
      if (buscarProduto.valor !== valor) {
        return res.status(409).json({
          mensagem:
            "O preço do produto difere do preço registrado no banco de dados.",
        });
      }

      await knex("produtos")
        .where({ descricao: descricao })
        .update({
          quantidade_estoque:
            buscarProduto.quantidade_estoque + quantidade_estoque,
        });

      return res.status(200).json({
        mensagem:
          "O produto já existia no banco de dados e o estoque foi atualizado.",
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
