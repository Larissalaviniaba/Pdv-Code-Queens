const errosUsuario = {
  usuarioErro: "Usuário não pode ser criado!",
  usuarioNaoEncontrado: "Usuário não encontrado.",
  usuarioJaExiste: "Usuário já existe na nossa base de dados.",
  usuarioCadastroDadosInvalido: "É obrigatório informar nome, e-mail e senha.",
  usuarioEmailJaExiste: "O e-mail informado já está sendo utilizado por outro usuário.",
};

const errosLogin = {
  loginInvalido: "E-mail ou senha inválidos.",
};

const errosGerais = {
  naoAutorizado: "Usuario não autenticado.",
  erroServidor: "Erro interno do servidor.",
  emailInvalido: "O campo e-mail precisa ter um formato válido.",
  camposObrigatorios: "Todos os campos devem ser informados.",
  tamanhoMinimoSenha: "A senha precisar conter, no mínimo, cinco caracteres.",
};

module.exports = {
  errosGerais,
  errosLogin,
  errosUsuario,
};
