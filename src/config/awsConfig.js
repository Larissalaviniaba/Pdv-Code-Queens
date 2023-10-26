const aws = require("aws-sdk");

const endpoint = new aws.Endpoint(process.env.BACKBLAZE_BUCKET);

const s3 = new aws.S3({
  endpoint,
  credentials: {
    accessKeyId: process.env.KEY_ID,
    secretAccessKey: process.env.APP_KEY,
  },
});

const excluirImagem = async (path) => {
  await s3
    .deleteObject({
      Bucket: process.env.BACKBLAZE_BUCKET_NAME,
      Key: path,
    })
    .promise();
};

module.exports = { excluirImagem };
