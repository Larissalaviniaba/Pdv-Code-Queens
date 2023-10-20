const knex = require("../../conexaoBanco");
const { errosGerais, errosCategoria  } = require("../../constants/erroMensagens");

const listarProdutos = async (req, res) => {

    try {
        //http://localhost:3000/produto?categoria_id=123

        const { categoria_id: categoriaString } = req.query;
        const categoria_id = Number(categoriaString)

        if(categoria_id){ 
            const encontrarProduto = await knex("produtos").where('categoria_id', '=', categoria_id).first();

            if(!encontrarProduto){
                return res.status(404).json({
                    mensagem: errosCategoria.categoriaInvalida
                })
            }

            const produtoID = await knex("produtos").where('categoria_id', '=', categoria_id)
            .join("categorias", "produtos.categoria_id", "=", "categorias.id")
            .select('produtos.id as produtos_id', 'produtos.descricao as produtos_descricao', 
            'produtos.quantidade_estoque as produtos_quantidade', 'produtos.valor as produtos_valor', 
            'categorias.id as categoria_id', 'categorias.descricao as categoria').orderBy('produtos.id', 'asc')
            
            const produtosID = produtoID.map(item => ({
                produto:{
                id: item.produtos_id,
                descricao: item.produtos_descricao,
                quantidade: item.produtos_quantidade,
                valor: item.produtos_valor,
                categoria: {
                    id: item.categoria_id,
                    descricao: item.categoria
                    }
                }
            }))

            return res.status(200).json(produtosID)

        }else{
            
            const detalhar = await knex("produtos")
                .join('categorias', 'produtos.categoria_id', 'categorias.id')
                .select('produtos.id as produtos_id', 'produtos.descricao as produtos_descricao', 
                'produtos.quantidade_estoque as produtos_quantidade', 'produtos.valor as produtos_valor', 
                'categorias.id as categoria_id', 'categorias.descricao as categoria').orderBy('produtos.id', 'asc')

            const produtos = detalhar.map(item => ({
                produto:{
                id: item.produtos_id,
                descricao: item.produtos_descricao,
                quantidade: item.produtos_quantidade,
                valor: item.produtos_valor,
                categoria: {
                    id: item.categoria_id,
                    descricao: item.categoria
                    }
                }
            }))

            return res.status(200).json(produtos)
        }        
        
    } catch (error) {
        return res.status(500).json({
            mensagem: errosGerais.erroServidor,
          })
    } 

}

module.exports = {
    listarProdutos
}