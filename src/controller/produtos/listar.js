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

            const produtosID = await knex("produtos").where('categoria_id', '=', categoria_id).select('*').orderBy('id', 'asc')
            
            return res.status(200).json(produtosID)
        }else{
            const produtos = await knex.select('*').from("produtos").orderBy('id', 'asc')
           
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