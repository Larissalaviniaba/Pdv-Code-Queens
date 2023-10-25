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

module.exports = { cadastrarProduto };
