const errosCategoria = {
  categoriaInvalida: "A categoria informada não existe.",
};

const errosCliente = {
  emailJaExiste: "O e-mail já existe na nossa base de dados.",
  cpfJaExiste: "O cpf já existe na nossa base de dados.",
  cepInvalido: "CEP inválido.",
  cpfInvalido: "CPF inválido.",
  estadoInvalido: "O estado informado não existe.",
  cpfInexistente: "O cpf informado não existe no banco de dados.",
  idInexistente: "O cliente informado não existe no banco de dados.",
  idInvalido: "O id informado não é um número válido.",
  enderecoInvalido: "Informe o enddereço completo.",
};
const errosProduto = {
  produtoJaExiste: "O produto já existe no banco de dados.",
  produtoInvalido: "O produto com o ID informado não existe no banco de dados.",
  idNaoInformado: "O id do produto deve ser informado.",
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
    campoString: "Os campos inormados precisam ser em formato de texto."
};


module.exports = {
  errosGerais,
  errosLogin,
  errosUsuario,
  errosProduto,
  errosCliente,
  errosCategoria,
};
