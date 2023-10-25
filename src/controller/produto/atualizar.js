const knex = require("../../config/knexConfig");
const s3 = require("../../config/awsConfig");
const {
  errosGerais,
  errosCategoria,
  errosProduto,
} = require("../../constants/erroMensagens");

const uploadImagemUtils = require("../../utils/uploadImagemUtils");
const deletarImagem = require("../../utils/deleteImagemUtils");
const atualizarImagem = require("../../utils/updateImagemUtils");

const atualizarProduto = async (req, res) => {
  const { file } = req;
  const { id } = req.params;
  //const { descricao, categoria_id, quantidade_estoque, valor } = req.body;

  const descricao = "Vestido - Estampa de Cereja";
  const categoria_id = 9;
  const quantidade_estoque = 1;
  const valor = 149999;

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

        const produtoAtualizado = await knex("produtos")
          .update({ produto_imagem: urlImagem })
          .where({ id: produtoId })
          .returning("*");

        const { id: _, ...produtoAtualizadoSemId } = produtoAtualizado[0];

        return res.status(200).json(produtoAtualizadoSemId);
      } else {
        const urlNovaImagem = await atualizarImagem(file, categoria_id, id);

        const produtoAtualizado = await knex("produtos")
          .update({ produto_imagem: urlNovaImagem })
          .where({ id })
          .returning("*");

        const { id: _, ...produtoAtualizadoSemId } = produtoAtualizado[0];

        return res.status(200).json(produtoAtualizadoSemId);
      }
    }

    return res.status(200).json({
      descricao: descricao,
      quantidade_estoque: quantidade_estoque,
      valor: valor,
      categoria_id: categoria_id,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ mensagem: errosGerais.erroServidor });
  }
};

module.exports = { atualizarProduto };
