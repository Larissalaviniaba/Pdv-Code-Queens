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

  // const descricao = "Pantalona Preta Com fenda";
  // const categoria_id = 9;
  // const quantidade_estoque = 1;
  // const valor = 159999;

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

    if (file) {
      const ultimoProdutoCadastrado = await knex("produtos")
        .max("id as maxId")
        .first()
        .returning("*");
      const produtoCadastradoId = ultimoProdutoCadastrado.maxId;

      const urlImagem = await uploadImagemUtils(
        file,
        categoria_id,
        produtoCadastradoId
      );

      const produtoCadastradoComImagem = await knex("produtos")
        .insert({
          descricao,
          categoria_id,
          quantidade_estoque,
          valor,
          produto_imagem: urlImagem,
        })
        .returning("*");

      return res.status(201).json(produtoCadastradoComImagem[0]);
    }

    const produtoCadastrado = await knex("produtos")
      .insert({
        categoria_id,
        quantidade_estoque,
        valor,
        descricao,
      })
      .returning("*");

    const { produto_imagem: _, ...produtoCadastradoSemImagem } =
      produtoCadastrado[0];

    return res.status(201).json(produtoCadastradoSemImagem);
  } catch (error) {
    return res.status(500).json({ mensagem: errosGerais.erroServidor });
  }
};

module.exports = { cadastrarProduto };
