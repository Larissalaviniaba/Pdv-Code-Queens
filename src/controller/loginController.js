const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const senhaJwt = require("../config/senhaJwtConfig");
const knex = require("../config/knexConfig");

const { errosGerais, errosLogin } = require("../constants/erroMensagens");

const efetuarLogin = async (req, res) => {
  try {
    const { email, senha } = req.body;

    const usuario = await knex("usuarios").where("email", email).first();

    if (!usuario) {
      return res.status(404).json({
        mensagem: errosLogin.loginInvalido,
      });
    }

    const validarSenha = await bcrypt.compare(senha, usuario.senha);

    if (!validarSenha) {
      return res.status(404).json({ mensagem: errosLogin.loginInvalido });
    }

    const token = jwt.sign({ id: usuario.id }, senhaJwt, {
      expiresIn: "8h",
    });

    const { senha: _, ...loginUsuario } = usuario;

    return res.status(200).json({
      ...loginUsuario,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      mensagem: errosGerais.erroServidor,
    });
  }
};

module.exports = efetuarLogin;
