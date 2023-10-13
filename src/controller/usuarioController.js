const bcrypt = require("bcrypt")
const knex = require("../conexaoBanco")
const sucessoMensagens = require("../constants/sucessoMensagens")
const {errosGerais, errosUsuario} = require("../constants/erroMensagens")

async function criarUsuario(req, res) {
    try {
        const {nome, email, senha} = req.body
        let buscaEmail = await knex('usuarios').where({email: email}).select('email').first()

        if(buscaEmail !== undefined) {
            return errosUsuario.usuarioJaExiste
        }

        const saltos = 10
        const senhaCriptografada = await bcrypt.hash(senha, saltos)

        let guardarNoBanco = await knex('usuarios').insert({nome: nome, email: email, senha: senhaCriptografada})

        return res.status(201).json({mensagem:sucessoMensagens.usuarioSucesso})

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({mensagem: errosGerais.erroServidor})
    }

}

module.exports = {
    criarUsuario

}