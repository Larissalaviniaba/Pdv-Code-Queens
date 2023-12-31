const knex = require("../config/knexConfig");
const jwt = require("jsonwebtoken");
const { errosGerais } = require("../constants/erroMensagens");
const senhaJwt = require("../config/senhaJwtConfig");

const verificarUsuarioLogado = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(400).json({
      mensagem: errosGerais.naoAutorizado,
    });
  }

  const token = authorization;

  try {
    const { id } = jwt.verify(token, senhaJwt);

    const usuario = await knex("usuarios").where("id", id).first();

    if (!usuario) {
      return res.status(404).json({
        mensagem: errosGerais.naoAutorizado,
      });
    }

    const { senha, ...usuarioLogado } = usuario;

    req.usuario = usuarioLogado;

    next();
  } catch (error) {
    return res.status(500).json({
      mensagem: errosGerais.naoAutorizado,
    });
  }
};

module.exports = verificarUsuarioLogado;
