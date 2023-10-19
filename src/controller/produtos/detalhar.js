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

        const produtoID = await knex("produtos").where('id', '=', id).select('*')
            
        return res.status(200).json(produtoID)


    } catch (error) {
        return res.status(500).json({
            mensagem: errosGerais.erroServidor,
          })
        
    }
}

module.exports = {
    detalharProdutos
}