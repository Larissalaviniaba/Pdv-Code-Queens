const knex = require("../config/knexConfig");
const s3 = require("../config/awsConfig");

const deletarImagem = async (produtoId) => {

  const excluirImagem = await knex("produtos")
    .select("produto_imagem")
    .where({ id: produtoId })
    .first();

  if (excluirImagem && excluirImagem.produto_imagem) {
    const keyImagemAntiga = new URL(excluirImagem.produto_imagem).pathname.substring(1);
    await s3
      .deleteObject({
        Bucket: process.env.BACKBLAZE_BUCKET,
        Key: keyImagemAntiga,
      })
      .promise();

    console.log('Imagem antiga excluída do S3:', excluirImagem.produto_imagem);
  }
};

module.exports = deletarImagem;

