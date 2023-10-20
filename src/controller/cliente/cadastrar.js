const knex = require("../../conexaoBanco");

const { errosGerais, errosCliente } = require("../../constants/erroMensagens");
const { sucessoCliente } = require("../../constants/sucessoMensagens");
const validarCPF = require("../../utils/validarCPF");
const { seCampoExiste, seCampoNaoExiste } = require("../../utils/verificarCampo");

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

    seCampoExiste(res, emailCliente, 409, errosCliente.emailJaExiste);
    seCampoExiste(res, cpfCliente, 409, errosCliente.cpfJaExiste);
    seCampoNaoExiste(res, validarCPF(cpf), 404, errosCliente.cpfInvalido);

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

module.exports = {
  cadastrarCliente,
};
