const knex = require("../../config/knexConfig");
const calcularValorTotal = require("../../utils/valorTotalPedido");
const centavosParaReais = require("../../utils/centavosParaReais");
const compiladorHtml = require("../../emails/compiladorTemplate");
const enviarEmail = require("../../emails/enviarEmail");
const { errosGerais, errosCliente, errosProduto } = require('../../constants/erroMensagens')
const { sucessoPedido } = require('../../constants/sucessoMensagens')

const cadastrarPedido = async (req, res) => {
  const { cliente_id, observacao, pedido_produtos } = req.body;

  try {
    const cliente = await knex("clientes")
      .select("id", "nome", "email")
      .where({ id: cliente_id })
      .first();

    if (!cliente) {
      return res.status(404).json({
        mensagem: errosCliente.idInexistente,
      });
    }
    const idDeProdutosNoPedido = pedido_produtos.map(
      (pedido) => pedido.produto_id
    );
    const produtosCadastrados = await knex("produtos")
      .select("id", "quantidade_estoque", "valor")
      .whereIn("id", idDeProdutosNoPedido);

    const idsProdutosInexistentes = idDeProdutosNoPedido.filter((produtoId) => {
      return !produtosCadastrados.some(
        (produtoCadastrado) => produtoCadastrado.id === produtoId
      );
    });

    if (idsProdutosInexistentes.length > 0) {
      return res.status(404).json({
        mesnagem: errosProduto.produtoInvalido,
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
        mensagem: errosProduto.estoqueInsuficiente,
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

    const insertPedidoProduto = produtosCadastrados.map((produtoCadastrado) => {
      const pedidoEncontrado = pedido_produtos.find(
        (produto) => produtoCadastrado.id === produto.produto_id
      );
      return {
        pedido_id: pedidoCadastrado[0].id,
        produto_id: produtoCadastrado.id,
        quantidade_produto: pedidoEncontrado.quantidade_produto,
        valor_produto: produtoCadastrado.valor,
      };
    });

    await knex("pedido_produtos").insert(insertPedidoProduto);

    await Promise.all(
      pedido_produtos.map((p) => {
        const produtoEncontrado = produtosCadastrados.find(
          (produto) => produto.id === p.produto_id
        );
        return knex("produtos")
          .where({ id: p.produto_id })
          .update({
            quantidade_estoque:
              produtoEncontrado.quantidade_estoque - p.quantidade_produto,
          });
      })
    );

    const contexto = {
      clienteNome: cliente.nome,
      pedidoProdutos: insertPedidoProduto,
      valorTotal: centavosParaReais(valor_total),
    };
    const html = await compiladorHtml(
      "src/emails/templates/pedidoCadastrado.html",
      contexto
    );
    const email = {
      nomeDestinatario: cliente.nome,
      emailDestinatario: cliente.email,
      assunto: "Confirmação de Pedido",
      html,
    };

    enviarEmail(email);

    return res.status(201).json({
      mensagem: sucessoPedido.pedidoCadastrado,
    });
  } catch (error) {
    return res.status(404).json({
      mensagem: errosGerais.erroServidor,
    });
  }
};

module.exports = { cadastrarPedido };
