const knex = require("../../conexaoBanco");

const { errosGerais, errosCliente } = require("../../constants/erroMensagens");
const { sucessoCliente } = require("../../constants/sucessoMensagens");
const validarCPF = require("../../utils/validarCPF");

const atualizarCliente = async (req, res) => {
  const { id } = req.params;
  const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } =
    req.body;
  try {
    const emailCliente = await knex("clientes")
      .select("id")
      .where({ email: email })
      .where("id", "<>", id)
      .first();

    const cpfCliente = await knex("clientes")
      .select("id")
      .where({ cpf: cpf })
      .where("id", "<>", id)
      .first();

    if (emailCliente) {
      return res.status(409).json({ mensagem: errosCliente.emailJaExiste });
    }
    if (cpfCliente) {
      return res.status(409).json({ mensagem: errosCliente.cpfJaExiste });
    }
    if (!validarCPF(cpf)) {
      return res.status(404).json({ mensagem: errosCliente.cpfInvalido });
    }

    if (
      (cep || rua || numero || bairro || cidade || estado) &&
      (!cep || !rua || !numero || !bairro || !cidade || !estado)
    ) {
      return res.status(400).json({ mensagem: errosCliente.enderecoInvalido });
    }

    await knex("clientes").where({ id: id }).update({
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
      mensagem: sucessoCliente.clienteAtualizado,
    });
  } catch (error) {
    return errosGerais.erroServidor;
  }
};

module.exports = {
  atualizarCliente,
};
