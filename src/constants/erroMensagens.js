const errosCategoria = {
  categoriaInvalida: "A categoria informada não existe.",
};

const errosPedido = {
  clienteInvalido: "Insira um ID válido para 'cliente_id'.",
  produtoInvalido: "Insira um ID válido para 'produto_id'.",
  quantidadeInvalida: "Insira um número válido para 'quantidade_produto'.",
  quantidadeMinima: "É necessário pelo menos 1 produto para realizar o pedido.",
  pedidoInexistente: "Não há pedidos para o 'cliente_id' informado.",
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
  enderecoInvalido: "Informe o endereço completo.",
};
const errosProduto = {
  produtoJaExiste: "O produto já existe no banco de dados.",
  produtoInvalido: "O produto com o ID informado não existe no banco de dados.",
  idNaoInformado: "O id do produto deve ser informado.",
  idInvalido: "Insira um ID válido para 'categoria_id'.",
  valorInvalido: "Insira um número válido para 'valor'.",
  valorEmCentavos: "O valor do produto precisa ser convertido para centavos",
  quantidadeInvalida: "Insira um número válido para 'quantidade_estoque'.",
  produtoVinculado:
    "Este produto está vinculado a um pedido e não poderá ser excluído",
  estoqueInsuficiente: "O produto não possui estoque suficiente.",
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
  campoString: "O campos informados precisam ser em formato de texto.",
};

module.exports = {
  errosGerais,
  errosLogin,
  errosUsuario,
  errosProduto,
  errosCliente,
  errosCategoria,
  errosPedido,
};
