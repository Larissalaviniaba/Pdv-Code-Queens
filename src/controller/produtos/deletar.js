const knex = require("../../conexaoBanco")
const {errosGerais} = require("../../constants/erroMensagens")
const {sucessoProduto} = require("../../constants/sucessoMensagens")
const {errosProduto} = require("../../constants/erroMensagens")

async function deletarProduto(req, res) {

    try {
        const {id} = req.params
        
        const buscaProduto = await knex("produtos").where("id", id).first()

        if(!buscaProduto) {
            return res.status(404).json({mensagem:errosProduto.produtoInvalido})
        }

        await knex("produtos").where("id", id).del()
        return res.status(200).json({mensagem: sucessoProduto.produtoDeletado})
         

    } catch (error) {
        return res.status(400).json({mensagem:errosGerais.erroServidor})
    }
}

module.exports = {
    deletarProduto
}