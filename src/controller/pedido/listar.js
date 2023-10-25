const knex = require("../../conexaoBanco");
const { errosGerais, errosPedidos, errosCliente } = require("../../constants/erroMensagens");


const listarPedidos = async (req, res) => {
    try {
        const { cliente_id: clienteString } = req.query;
        const cliente_id = Number(clienteString);

        let query = knex("pedidos")
            .join("pedido_produtos", "pedidos.id", "pedido_produtos.pedido_id")
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

        if(cliente_id){

            const encontrarCliente = await knex("clientes")
            .where('id', cliente_id)
            .first();

            if (!encontrarCliente) {
                return res.status(404).json({
                    mensagem: errosCliente.idInexistente
                });
            }

            const pedidosCliente = await knex("pedidos")
            .where("cliente_id", cliente_id)
            .first();

            if (!pedidosCliente) {
                return res.status(404).json({
                    mensagem: errosPedidos.pedidoInexistente
                });
            }

            query = query.where("pedidos.cliente_id", cliente_id);
        }

        const resultado = await query;

        const resultadoOrganizado = [];

        for(let i = 0; i < resultado.length; i++){
            const item = resultado[i];
            let pedidoExiste = resultadoOrganizado.find(pedido => 
                pedido.pedido.id === item.pedidos_id);

            if(!pedidoExiste){
                const novoPedido = {
                    pedido: {
                        id: item.pedidos_id,
                        valor_total: item.valor_total,
                        observacao: item.observacao,
                        cliente_id: item.cliente_id
                    },
                    pedido_produtos: []
                };

                resultadoOrganizado.push(novoPedido);
                pedidoExiste = novoPedido;
            }
            pedidoExiste.pedido_produtos.push({
                id: item.id,
                quantidade_produto: item.quantidade_produto,
                valor_produto: item.valor_produto,
                pedido_id: item.pedido_id,
                produto_id: item.produto_id
            });
        }

        return res.status(200).json(resultadoOrganizado);
    } catch (error) {
        console.log(error.mensage)
        return res.status(500).json({ 
            mensagem: errosGerais.erroServidor 
        });

    }
}





module.exports = {
    listarPedidos
}

