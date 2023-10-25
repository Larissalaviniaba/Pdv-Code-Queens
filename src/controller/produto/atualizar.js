const knex = require("../../config/knexConfig");
const {
  errosGerais,
  errosCategoria,
  errosProduto,
} = require("../../constants/erroMensagens");

const uploadImagemUtils = require("../../utils/uploadImagemUtils");
const atualizarImagem = require("../../utils/updateImagemUtils");

const atualizarProduto = async (req, res) => {
  const { file } = req;
  const { id } = req.params;
  const { descricao, categoria_id, quantidade_estoque, valor } = req.body;

  try {
    const buscarProduto = await knex("produtos").where({ id: id }).first();

    if (!buscarProduto) {
      return res.status(200).json({ mensagem: errosProduto.produtoInvalido });
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

    const produtoAtualizado = await knex("produtos")
      .where({ id: id })
      .update({
        descricao,
        quantidade_estoque,
        valor,
        categoria_id,
      })
      .returning("*");

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

    const { id: _, ...produtoAtualizadoSemId } = produtoAtualizado[0];

    return res.status(200).json(produtoAtualizadoSemId);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ mensagem: errosGerais.erroServidor });
  }
};

module.exports = { atualizarProduto };
