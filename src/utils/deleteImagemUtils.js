const knex = require("../config/knexConfig");
const s3 = require("../config/awsConfig");

// const deletarImagem = async (file, categoria_id, produtoId) => {
//   const categoriaProduto = await knex("categorias")
//     .select("descricao")
//     .where({ id: categoria_id })
//     .first();

//   await s3
//     .deleteObject({
//       Bucket: process.env.BACKBLAZE_BUCKET,
//       Key: `produtos/${categoriaProduto.descricao}/${produtoId}/${file.originalname}`,
//     })
//     .promise();
// };

const atualizarImagem = async (req, id) => {
  await s3
    .putObject({
      Bucket: process.env.BACKBLAZE_BUCKET,
      Key: `produtos/${categoriaProduto.descricao}/${produtoId}/${file.originalname}`,
      ContentType: file.mimetype,
      Body: file.buffer,
    })
    .promise();
};
