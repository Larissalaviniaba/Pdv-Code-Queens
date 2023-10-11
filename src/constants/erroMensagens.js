const errosUsuario = {
  usuarioErro: "Usuário não pode ser criado!",
  usuarioNaoEncontrado: "Usuário não encontrado.",
  usuarioJaExiste: "Usuário já existe na nossa base de dados.",
  usuarioCadastroDadosInvalido: "É obrigatório informar nome, e-mail e senha.",
};

const errosLogin = {
  loginInvalido: "E-mail ou senha inválidos.",
  emailInvalido: "O campo e-mail precisa ter um formato válido.",
  tamanhoMinimoSenha: "A senha precisar conter, no mínimo, cinco caracteres.",
};

const errosGerais = {
  naoAutorizado: "Usuario não autenticado.",
  erroServidor: "Erro interno do servidor.",
  camposObrigatorios: "Todos os campos devem ser informados.",
};

module.exports = {
  usuarioErro: "Usuário não pode ser criado!",
  usuarioNaoEncontrado: "Usuário não encontrado.",
  usuarioJaExiste: "Usuário já existe na nossa base de dados.",
  usuarioCadastroDadosInvalido: "É obrigatório informar nome, e-mail e senha.",
  errosGerais,
  errosLogin,
  errosUsuario,
};
