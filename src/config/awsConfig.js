// instanciando a biblioteca da AWS:
const aws = require("aws-sdk");

// criando uma conexão com a chave do bucket:
const endpoint = new aws.Endpoint(process.env.ENDPOINT_S3);

// objeto com as credenciais do bucket:
const s3 = new aws.S3({
  endpoint,
  credentials: {
    accessKeyId: process.env.KEY_ID,
    secretAccessKey: process.env.APP_KEY,
  },
});
