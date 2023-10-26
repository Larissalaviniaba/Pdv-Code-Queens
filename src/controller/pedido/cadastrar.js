const knex = require("../../conexaoBanco");
const calcularValorTotal = require("../../utils/valorTotalPedido");

const cadastrarPedido = async (req, res) => {
  const { cliente_id, observacao, pedido_produtos } = req.body;

  try {
    const cliente = await knex("clientes")
      .select("id")
      .where({ id: cliente_id })
      .first();

    if (!cliente) {
      return res.status(404).json({
        mensagem: "O cliente não existe na nossa base de dados.",
      });
    }
    const idDeProdutosNoPedido = pedido_produtos.map(
      (pedido) => pedido.produto_id
    );
    const produtosCadastrados = await knex("produtos")
      .select("id", "quantidade_estoque", "valor")
      .whereIn("id", idDeProdutosNoPedido);

    const idsProdutosInexistentes = produtosCadastrados.filter(
      (produtoCadastrado) =>
        !idDeProdutosNoPedido.includes(produtoCadastrado.id)
    );

    if (idsProdutosInexistentes.length > 0) {
      return res.status(404).json({
        mesnagem: "Prouto não encontrado.",
        idsProdutosInexistentes,
      });
    }

    const estoqueInsuficiente = pedido_produtos.filter((pedido) => {
      const pedidoEncontrado = produtosCadastrados.find(
        (produtoCadastrado) => produtoCadastrado.id === pedido.produto_id
      );
      return pedido.quantidade_produto > pedidoEncontrado.quantidade_estoque;
    });

    if (estoqueInsuficiente.length > 0) {
      return res.status(404).json({
        mensagem: "O produto não.",
        estoqueInsuficiente,
      });
    }

    const valor_total = calcularValorTotal(
      pedido_produtos,
      produtosCadastrados
    );
    const pedidoCadastrado = await knex("pedidos").returning("id").insert({
      cliente_id,
      observacao,
      valor_total,
    });

    const insertPedidoProduto = produtosCadastrados.map(
      (produtoCadastrado, i) =>
        produtoCadastrado.id === pedido_produtos[i].produto_id
          ? {
              pedido_id: pedidoCadastrado[0].id,
              produto_id: produtoCadastrado.id,
              quantidade_produto: pedido_produtos[i].quantidade_produto,
              valor_produto: produtoCadastrado.valor,
            }
          : null
    );

    await knex("pedido_produtos").insert(insertPedidoProduto);

    await Promise.all(
      pedido_produtos.map((p) => {
        const produtoEncontrado = produtosCadastrados.find((produto)=> produto.id === p.produto_id);
        return knex("produtos").where({ id: p.produto_id }).update({
          quantidade_estoque: produtoEncontrado.quantidade_estoque - p.quantidade_produto,
        });
      })
    );

    return res.status(201).json({
      mensagem: "Pedido cadastrado com sucesso;",
    });
  } catch (error) {
    console.log(error);
    return "errosGerais.erroServidor";
  }
};

module.exports = { cadastrarPedido };
