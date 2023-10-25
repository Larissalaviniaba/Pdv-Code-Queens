const knex = require("../../config/knexConfig");
const s3 = require("../../config/awsConfig");
const {
  errosGerais,
  errosCategoria,
  errosProduto,
} = require("../../constants/erroMensagens");
const { sucessoProduto } = require("../../constants/sucessoMensagens");

const cadastrarProduto = async (req, res) => {
  const { file } = req;
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

    const ultimoProdutoCadastrado = await knex("produtos")
      .max("id as maxId")
      .first();
    const produtoCadastradoId = ultimoProdutoCadastrado.maxId;

    if (file) {
      const categoriaProduto = await knex("categorias")
        .select("descricao")
        .where({ id: categoria_id })
        .first();

      await s3
        .upload({
          Bucket: process.env.BACKBLAZE_BUCKET,
          Key: `produtos/${categoriaProduto.descricao}/${file.originalname}`,
          Body: file.buffer,
          ContentType: file.mimetype,
        })
        .promise();

      const urlImagem = `https://${process.env.BACKBLAZE_BUCKET}.${process.env.ENDPOINT_S3}/produtos/${categoriaProduto.descricao}/${file.originalname}`;

      await knex("produtos")
        .update({ produto_imagem: urlImagem })
        .where({ id: produtoCadastradoId });

      return res.status(201).json({
        mensagem: sucessoProduto.produtoCadastrado,
      });
    }

    return res.status(201).json({
      mensagem: sucessoProduto.produtoCadastrado,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ mensagem: errosGerais.erroServidor });
  }
};

module.exports = { cadastrarProduto };
