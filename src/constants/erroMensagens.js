const errosCategoria = {
  categoriaInvalida: "A categoria informada não existe.",
};

const errosCliente = {
  idInvalido: "Insira um ID válido para 'categoria_id'.",
  valorInvalido: "Insira um número válido para 'valor'.",
  quantidadeInvalida: "Insira um número válido para 'quantidade_estoque'.",
  cepInvalido: "O campo CEP deve conter apenas números válidos.",
  cpfInvalido: "O campo CPF deve conter apenas números válidos.",
  estadoInvalido: "O campo 'estado' deverá ter no máximo dois caracteres.",
};
const errosProduto = {
  produtoJaExiste: "O produto já existe no banco de dados.",
  produtoInvalido: "O produto com o ID informado não existe no banco de dados.",
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
  campoInvalido: "O campo informado não pode conter espaços em branco.",
  stringComEspaço:
    "Os campos não podem conter espaços no início e no final do texto.",
};

module.exports = {
  errosGerais,
  errosLogin,
  errosUsuario,
  errosProduto,
  errosCliente,
  errosCategoria,
};
