const knex = require("../../conexaoBanco");

const { errosGerais, errosCliente } = require("../../constants/erroMensagens");
const { sucessoCliente } = require("../../constants/sucessoMensagens");
const validarCPF = require("../../utils/validarCPF");

const cadastrarCliente = async (req, res) => {
  const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } =
    req.body;
  try {
    const emailCliente = await knex("clientes")
      .select("email")
      .where({ email: email })
      .first();

    const cpfCliente = await knex("clientes")
      .select("cpf")
      .where({ cpf: cpf })
      .first();

    if (emailCliente) {
      return res.status(404).json({ mensagem: errosCliente.emailJaExiste });
    }

    if (cpfCliente) {
      return res.status(404).json({ mensagem: errosCliente.cpfJaExiste });
    }

    if (!validarCPF(cpf)) {
      return res.status(404).json({ mensagem: errosCliente.cpfInvalido });
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
