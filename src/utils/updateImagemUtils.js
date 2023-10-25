const knex = require("../config/knexConfig");
const s3 = require("../config/awsConfig");
const deletarImagem = require("./deleteImagemUtils");

const atualizarImagem = async (file, categoria_id, produtoId) => {
  const categoriaProduto = await knex("categorias")
    .select("descricao")
    .where({ id: categoria_id })
    .first();

  await deletarImagem(produtoId);

  await s3
    .putObject({
      Bucket: process.env.BACKBLAZE_BUCKET,
      Key: `produtos/${categoriaProduto.descricao}/${produtoId}/${file.originalname}`,
      Body: file.buffer,
      ContentType: file.mimetype,
    })
    .promise();

  const urlNovaImagem = `https://${process.env.BACKBLAZE_BUCKET}.${process.env.ENDPOINT_S3}/produtos/${categoriaProduto.descricao}/${produtoId}/${file.originalname}`;

  return urlNovaImagem;
};

module.exports = atualizarImagem;
