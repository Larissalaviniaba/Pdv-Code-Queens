const knex = require("../../conexaoBanco");

const { errosGerais, errosCliente } = require("../../constants/erroMensagens");
const { sucessoCliente } = require("../../constants/sucessoMensagens");

const cadastrarCliente = async (req, res) => {
  const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } =
    req.body;
  try {
    const buscarCliente = await knex("clientes")
      .select("email", "cpf")
      .where({ email: email })
      .orWhere({ cpf: cpf })
      .first();

    if (buscarCliente.email && buscarCliente.email === email) {
      return res.status(404).json({ mensagem: errosCliente.emailJaExiste });
    }

    if (buscarCliente.cpf) {
      return res.status(404).json({ mensagem: errosCliente.cpfJaExiste });
    }

    await knex("clientes").insert({
      nome,
      email,
      cpf,
      cep,
      rua,
      numero,
      bairro,
      cidade,
      estado,
    });

    return res.status(201).json({
      mensagem: sucessoCliente.clienteCadastrado,
    });
  } catch (error) {
    return errosGerais.erroServidor;
  }
};

module.exports = {
  cadastrarCliente,
};
