const knex = require("../../config/knexConfig");

const {
  errosGerais,
  errosCategoria,
  errosProduto,
} = require("../../constants/erroMensagens");

const uploadImagemUtils = require("../../utils/uploadImagemUtils");

const cadastrarProduto = async (req, res) => {
  const { file } = req;
  //const { descricao, categoria_id, quantidade_estoque, valor } = req.body;

  const descricao = "Heaset - P3";
  const categoria_id = 1;
  const quantidade_estoque = 1;
  const valor = 27000;

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
      .select("descricao")
      .first();

    if (buscarProduto) {
      return res.status(409).json({
        mensagem: "O nome do produto informado já existe no banco de dados.",
      });
    }

    await knex("produtos").insert({
      categoria_id,
      quantidade_estoque,
      valor,
      descricao,
    });

    if (file) {
      const ultimoProdutoCadastrado = await knex("produtos")
        .max("id as maxId")
        .first();
      const produtoCadastradoId = ultimoProdutoCadastrado.maxId;

      const urlImagem = await uploadImagemUtils(
        file,
        categoria_id,
        produtoCadastradoId
      );

      return res.status(201).json({
        descricao: descricao,
        quantidade_estoque: quantidade_estoque,
        valor: valor,
        categoria_id: categoria_id,
        produto_imagem: urlImagem,
      });
    }

    return res.status(201).json({
      descricao: descricao,
      quantidade_estoque: quantidade_estoque,
      valor: valor,
      categoria_id: categoria_id,
    });
  } catch (error) {
    return res.status(500).json({ mensagem: errosGerais.erroServidor });
  }
};

const atualizarProduto = async (req, res) => {
  const { file } = req;
  const { id } = req.params;
  //const { descricao, categoria_id, quantidade_estoque, valor } = req.body;

  const descricao = "Saia";
  const categoria_id = 9;
  const quantidade_estoque = 1;
  const valor = 45001;

  try {
    const buscarProduto = await knex("produtos").where({ id: id }).first();

    if (!buscarProduto) {
      return res.status(200).json({
        mensagem: errosProduto.produtoInvalido,
      });
    }

    const buscarProdutoNome = await knex("produtos")
      .whereNot({ id: id })
      .where({ descricao: descricao })
      .select("descricao")
      .first();

    if (buscarProdutoNome) {
      return res.status(409).json({
        mensagem: "O nome do produto informado já existe no banco de dados.",
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

    if (file) {
      const imagemCadastrada = await knex("produtos")
        .select("produto_imagem")
        .where({ id: id })
        .first();

      if (!imagemCadastrada) {
        const urlImagem = await uploadImagemUtils(file, categoria_id, id);

        return res.status(200).json({
          descricao: descricao,
          quantidade_estoque: quantidade_estoque,
          valor: valor,
          categoria_id: categoria_id,
          produto_imagem: urlImagem,
        });
      } else {
        return res.status(400).json({
          mensagem: "Já existe uma imagem cadastrada para o produto informado.",
        });
      }
    }

    return res.status(200).json({
      descricao: descricao,
      quantidade_estoque: quantidade_estoque,
      valor: valor,
      categoria_id: categoria_id,
    });
  } catch (error) {
    return res.status(500).json({ mensagem: errosGerais.erroServidor });
  }
};

module.exports = {
  cadastrarProduto,
  atualizarProduto,
};
