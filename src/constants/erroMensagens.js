const errosProduto = {
  idInvalido: "Insira um ID válido para 'categoria_id'.",
  valorInvalido: "Insira um número válido para 'valor'.",
  quantidadeInvalida: "Insira um número válido para 'quantidade_estoque'.",

  
};
const errosUsuario = {
  usuarioErro: "Usuário não pode ser criado!",
  usuarioJaExiste: "Usuário já existe na nossa base de dados.",
  usuarioNaoEncontrado: "Usuário não encontrado.",
  tamanhoMinimoSenha: "A senha precisar conter, no mínimo, cinco caracteres.",
  emailInvalido: "O campo e-mail precisa ter um formato válido.",
};

const errosLogin = {
  loginInvalido: "E-mail ou senha inválidos.",
};

const errosGerais = {
  naoAutorizado: "Usuario não autenticado.",
  erroServidor: "Erro interno do servidor.",
  camposObrigatorios: "Todos os campos devem ser informados.",
  campoInvalido: "O campo informado não pode conter apenas espaços em branco."
};

module.exports = {
  errosGerais,
  errosLogin,
  errosUsuario,
  errosProduto
};
