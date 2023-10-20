const knex = require("../../conexaoBanco");
const { errosGerais, errosProduto } = require("../../constants/erroMensagens");


const detalharProdutos = async (req, res) => {

    try {
        const { id } = req.params;

        if(!id){
            return res.status(400).json({
                mensagem: errosProduto.idNaoInformado
            })
        }

     
        const encontrarPorId = await knex("produtos").where('id', '=', id).first();

        if(!encontrarPorId){
            return res.status(404).json({
                mensagem: errosProduto.produtoInvalido
            })
        }

        const detalhar = await knex("produtos").where('produtos.id', '=', id)
        .join("categorias", "produtos.categoria_id", "=", "categorias.id")
        .select('produtos.id as produtos_id', 'produtos.descricao as produtos_descricao', 
        'produtos.quantidade_estoque as produtos_quantidade', 'produtos.valor as produtos_valor', 
        'categorias.id as categoria_id', 'categorias.descricao as categoria').first()

        const produto = {
            produto:{
            id: detalhar.produtos_id,
            descricao: detalhar.produtos_descricao,
            quantidade: detalhar.produtos_quantidade,
            valor: detalhar.produtos_valor,
            categoria: {
                id: detalhar.categoria_id,
                descricao: detalhar.categoria
            }
        }}

            
        return res.status(200).json(produto)


    } catch (error) {
        return res.status(500).json({
            mensagem: errosGerais.erroServidor,
          })
        
    }
}

module.exports = {
    detalharProdutos
}