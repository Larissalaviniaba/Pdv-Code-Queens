const { errosCliente } = require("../constants/erroMensagens");

const validarEnderecoCompleto = async (req, res, next) => {
  const { cep, rua, numero, bairro, cidade, estado } = req.body;
  try {
    if (
      (cep || rua || numero || bairro || cidade || estado) &&
      (!cep || !rua || !numero || !bairro || !cidade || !estado)
    ) {
      return res.status(400).json({ mensagem: errosCliente.enderecoInvalido });
    }
    next();
  } catch (error) {
    return res.status(400).json({ mensagem: error.message });
  }
};

module.exports = validarEnderecoCompleto;
