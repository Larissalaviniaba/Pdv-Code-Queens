require("dotenv").config();
const transportador = require("../config/nodemailerConfig");

const enviarEmail = async (email) => {
  try {
    transportador.sendMail({
      from: `${process.env.EMAIL_NAME} <${process.env.EMAIL_USER}>`,
      to: `${email.nomeDestinatario} <${email.emailDestinatario}>`,
      subject: `${email.assunto}`,
      html: email.html,
    });
  } catch (error) {
    return res.status(404).json({
      mensagem: "Erro ao enviar o e-mail.",
    });
  }
};

module.exports = enviarEmail;
