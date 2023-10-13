const bcrypt = require("bcrypt");
const knex = require("../conexaoBanco");
const sucessoMensagens = require("../constants/sucessoMensagens");
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

    return res.status(201).json({ mensagem: sucessoMensagens.usuarioSucesso });
  } catch (error) {
    return res.status(500).json({ mensagem: errosGerais.erroServidor });
  }
}

module.exports = criarUsuario;
