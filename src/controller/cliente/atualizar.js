const knex = require("../../conexaoBanco");

const { errosGerais, errosCliente } = require("../../constants/erroMensagens");
const { sucessoCliente } = require("../../constants/sucessoMensagens");
const validarCPF = require("../../utils/validarCPF");
const {
  seCampoExiste,
  seCampoNaoExiste,
} = require("../../utils/verificarCampo");

const atualizarCliente = async (req, res) => {
  const { id } = req.params;
  const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } =
    req.body;
  try {
    const emailCliente = await knex("clientes")
      .select("id")
      .where({ email: email })
      .where("id", "<>", id);

    const cpfCliente = await knex("clientes")
      .select("id")
      .where({ cpf: cpf })
      .where("id", "<>", id);

    seCampoExiste(res, emailCliente, 409, errosCliente.emailJaExiste);
    seCampoExiste(res, cpfCliente, 409, errosCliente.cpfJaExiste);
    seCampoNaoExiste(res, validarCPF(cpf), 404, errosCliente.cpfInvalido);

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
