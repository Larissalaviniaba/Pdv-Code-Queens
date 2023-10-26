const knex = require("../config/knexConfig");
const calcularValorTotal = require("../utils/valorTotalPedido");
const compiladorHtml = require("../emails/compiladorTemplate");
const enviarEmail = require("../emails/enviarEmail");
const {
  errosGerais,
  errosCliente,
  errosProduto,
} = require("../constants/erroMensagens");
const { sucessoPedido } = require("../constants/sucessoMensagens");

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
      valorTotal: valor_total,
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

const listarPedidos = async (req, res) => {
  try {
    const { cliente_id: clienteString } = req.query;
    const cliente_id = Number(clienteString);

    if (cliente_id) {
      const encontrarCliente = await knex("pedidos")
        .where("cliente_id", "=", cliente_id)
        .first();

      if (!encontrarCliente) {
        return res.status(404).json({
          mensagem:
            "ID do cliente não encontrado -- errosCategoria.idInexistente",
        });
      }
    }

    let query = knex("pedidos")
      .join("pedido_produtos", "pedidos.id", "=", "pedido_produtos.pedido_id")
      .select(
        "pedidos.id as pedidos_id",
        "pedidos.cliente_id as cliente_id",
        "pedidos.observacao as observacao",
        "pedidos.valor_total as valor_total",
        "pedido_produtos.id as id",
        "pedido_produtos.pedido_id as pedido_id",
        "pedido_produtos.produto_id as produto_id",
        "pedido_produtos.quantidade_produto as quantidade_produto",
        "pedido_produtos.valor_produto as valor_produto"
      );

    if (cliente_id) {
      query = query.where("cliente_id", "=", cliente_id);
    }

    const resultado = await query;

    if (resultado.length === 0) {
      return res.status(404).json({
        mensagem: "Não há pedidos para o cliente ID fornecido",
      });
    }

    const resultadoOrganizado = [];

    for (let i = 0; i < resultado.length; i++) {
      const item = resultado[i];
      let pedidoExiste = resultadoOrganizado.find(
        (pedido) => pedido.pedido.id === item.pedidos_id
      );

      if (!pedidoExiste) {
        const novoPedido = {
          pedido: {
            id: item.pedidos_id,
            cliente_id: item.cliente_id,
            observacao: item.observacao,
            valor_total: item.valor_total,
          },
          pedido_produtos: [],
        };
        resultadoOrganizado.push(novoPedido);
        pedidoExiste = novoPedido;
      }
      pedidoExiste.pedido_produtos.push({
        id: item.id,
        quantidade_produto: item.quantidade_produto,
        pedido_id: item.pedido_id,
        produto_id: item.produto_id,
        valor_produto: item.valor_produto,
      });
    }
    return res.status(200).json(resultadoOrganizado);
  } catch (error) {
    return res.status(500).json({
      mensagem: errosGerais.erroServidor,
    });
  }
};

module.exports = { cadastrarPedido, listarPedidos };
