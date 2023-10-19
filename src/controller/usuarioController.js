const bcrypt = require("bcrypt");
const knex = require("../conexaoBanco");

const { sucessoUsuario } = require("../constants/sucessoMensagens");
const { errosGerais, errosUsuario } = require("../constants/erroMensagens");

async function criarUsuario(req, res) {
  const { nome, email, senha } = req.body;

  try {
    const buscaEmail = await knex("usuarios")
      .where({ email: email })
      .select("email")
      .first();

    if (buscaEmail) {
      return res.status(400).json({ mensagem: errosUsuario.usuarioJaExiste });
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    await knex("usuarios").insert({
      nome: nome,
      email: email,
      senha: senhaCriptografada,
    });

    return res.status(201).json({ mensagem: sucessoUsuario.usuarioSucesso });
  } catch (error) {
    return res.status(500).json({ mensagem: errosGerais.erroServidor });
  }
}

async function detalharPerfil(req, res) {
  try {
    return res.status(201).json(req.usuario);
  } catch (error) {
    return res.status(500).json({ mensagem: errosGerais.erroServidor });
  }
}

async function editarPerfil(req, res) {
  const { nome, email, senha } = req.body;

  try {
    const encontrarEmail = await knex("usuarios")
      .select("id")
      .where("email", email)
      .where("id", "<>", req.usuario.id);

    if (encontrarEmail.length >= 1) {
      return res.status(400).json({ mensagem: errosUsuario.usuarioJaExiste });
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    await knex("usuarios").where("id", req.usuario.id).update({
      nome: nome,
      email: email,
      senha: senhaCriptografada,
    });

    res.status(201).json({ mensagem: sucessoUsuario.atualizacaoSucesso });
  } catch (error) {
    return res.status(500).json({ mensagem: errosGerais.erroServidor });
  }
}

module.exports = {
  criarUsuario,
  detalharPerfil,
  editarPerfil,
};
