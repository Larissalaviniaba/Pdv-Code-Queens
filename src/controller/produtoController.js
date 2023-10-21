const knex = require("../conexaoBanco");
const {
  errosGerais,
  errosCategoria,
  errosProduto,
} = require("../constants/erroMensagens");

const listarProdutos = async (req, res) => {
  try {
    const { categoria_id: categoriaString } = req.query;
    const categoria_id = Number(categoriaString);

    if (categoria_id) {
      const encontrarProduto = await knex("produtos")
        .where("categoria_id", "=", categoria_id)
        .first();

      if (!encontrarProduto) {
        return res.status(404).json({
          mensagem: errosCategoria.categoriaInvalida,
        });
      }

      const produtosID = await knex("produtos")
        .where("categoria_id", "=", categoria_id)
        .select("*")
        .orderBy("id", "asc");

      return res.status(200).json(produtosID);
    } else {
      const produtos = await knex
        .select("*")
        .from("produtos")
        .orderBy("id", "asc");

        console.log(produtos)

      return res.status(200).json(produtos);
    }
  } catch (error) {
    return res.status(500).json({
      mensagem: errosGerais.erroServidor,
    });
  }
};
const detalharProdutos = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        mensagem: errosProduto.idNaoInformado,
      });
    }

    const encontrarPorId = await knex("produtos").where("id", "=", id).first();

    if (!encontrarPorId) {
      return res.status(404).json({
        mensagem: errosProduto.produtoInvalido,
      });
    }

    const produtoID = await knex("produtos").where("id", "=", id).select("*");

    return res.status(200).json(produtoID);
  } catch (error) {
    return res.status(500).json({
      mensagem: errosGerais.erroServidor,
    });
  }
};
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
const atualizarProduto = async (req, res) => {
  const { id } = req.params;
  const { descricao, categoria_id, quantidade_estoque, valor } = req.body;

  try {
    const buscarProduto = await knex("produtos").where({ id: id }).first();

    if (!buscarProduto) {
      return res.status(200).json({
        mensagem: errosProduto.produtoInvalido,
      });
    }

    const buscarCategoria = await knex("categorias")
      .select("id")
      .where({ id: categoria_id })
      .first();

    if (!buscarCategoria) {
      return res
        .status(404)
        .json({ mensagem: errosCategoria.categoriaInvalida });
    }

    await knex("produtos").where({ id: id }).update({
      descricao,
      quantidade_estoque,
      valor,
      categoria_id,
    });

    return res.status(200).json({
      mensagem: sucessoProduto.produtoAtualizado,
    });
  } catch (error) {
    return res.status(500).json({ mensagem: errosGerais.erroServidor });
  }
};
const deletarProduto = async (req, res) => {
  try {
    const { id } = req.params;

    const buscaProduto = await knex("produtos").where("id", id).first();

    if (!buscaProduto) {
      return res.status(404).json({ mensagem: errosProduto.produtoInvalido });
    }

    await knex("produtos").where("id", id).del();
    return res.status(200).json({ mensagem: sucessoProduto.produtoDeletado });
  } catch (error) {
    return res.status(400).json({ mensagem: errosGerais.erroServidor });
  }
};

module.exports = {
  listarProdutos,
  detalharProdutos,
  cadastrarProduto,
  atualizarProduto,
  deletarProduto,
};
