const knex = require("../conexaoBanco");

const { errosGerais, errosCliente } = require("../constants/erroMensagens");
const { sucessoCliente } = require("../constants/sucessoMensagens");
const validarCPF = require("../utils/validarCPF");

const listarClientes = async (req, res) => {
  try {
    const { cpf } = req.query;

    if (cpf) {
      const localizarUsuario = await knex("clientes").where("cpf", "=", cpf);

      if (!localizarUsuario) {
        return res.status(404).json({ mensagem: errosCliente.cpfInexistente });
      }

      const usuarioCPF = await knex("clientes")
        .where("cpf", "=", cpf)
        .select("*");
      return res.status(200).json(usuarioCPF);
    } else {
      const clientes = await knex.select("*").from("clientes");
      return res.status(200).json(clientes);
    }
  } catch (error) {
    return res.status(500).json({ mensagem: errosGerais.erroServidor });
  }
};
const detalharCliente = async (req, res) => {
  try {
    const idRequisitado = Number(req.params.id);

    if (isNaN(idRequisitado)) {
      return res.status(404).json({ mensagem: errosCliente.idInvalido });
    }

    const clienteId = await knex("clientes")
      .select("*")
      .where("id", "=", idRequisitado);

    if (clienteId.length === 0) {
      return res.status(404).json({ mensagem: errosCliente.idInexistente });
    }

    return res.status(200).json(clienteId);
  } catch (error) {
    return res.status(500).json({ mensagem: errosGerais.erroServidor });
  }
}
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
  listarClientes,
  detalharCliente,
  cadastrarCliente,
  atualizarCliente,
};
