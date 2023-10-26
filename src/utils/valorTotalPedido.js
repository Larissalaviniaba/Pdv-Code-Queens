const calcularValorTotal = (pedidosDoCliente, produtosCadastrados) => {
  const valoresDosPedidos = produtosCadastrados.map(
    (produtoCadastrado, i) =>
      produtoCadastrado.valor * pedidosDoCliente[i].quantidade_produto
  );
  const valorTotal = valoresDosPedidos.reduce((accumulator, valorAtual) => accumulator + valorAtual);
  return valorTotal;
};

module.exports = calcularValorTotal;
